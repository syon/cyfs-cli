import * as fs from "fs"
import * as path from "path"
import * as yaml from "js-yaml"
import * as glob from "glob"
import * as moment from "moment"
import { Order, IDateAfterBefore } from "./order"

export default (file: string): Array<String> => {
  const buf = fs.readFileSync(file, "utf-8")
  const order:Order = <Order> yaml.safeLoad(buf)
  if (!order) return []
  let list = glob.sync(order.glob)
  if (order.name) {
    if (order.name.regex) {
      if (order.name.regex.pattern) {
        list = list.filter(f => {
          const filename = path.basename(f)
          const ptn = order.name.regex.pattern
          const flg = order.name.regex.flags || ''
          const regex = new RegExp(ptn, flg)
          return filename.match(regex)
        })
      }
    }
    if (order.name.contain) {
      list = list.filter(f => {
        const filename = path.basename(f)
        return order.name.contain.some(word => {
          return !!~filename.indexOf(word)
        })
      })
    }
  }
  if (order.size) {
    if (order.size.min) {
      list = list.filter(f => {
        const stat = fs.statSync(f)
        return stat.size >= order.size.min
      })
    }
    if (order.size.max) {
      list = list.filter(f => {
        const stat = fs.statSync(f)
        return stat.size <= order.size.max
      })
    }
  }
  if (order.date) {
    list = filterByStatDate(list, order.date.access, 'atime')
    list = filterByStatDate(list, order.date.modify, 'mtime')
    list = filterByStatDate(list, order.date.change, 'ctime')
    list = filterByStatDate(list, order.date.birth, 'birthtime')
  }
  return list
}

function getStat(filepath: string, statProp: string) {
  const stat:fs.Stats = fs.statSync(filepath)
  switch (statProp) {
    case 'atime':
      return stat.atime
    case 'mtime':
      return stat.mtime
    case 'ctime':
      return stat.ctime
    case 'birthtime':
      return stat.birthtime
    default:
      return ''
  }
}

function filterByStatDate(list: Array<string>, dateAfterBefore: IDateAfterBefore, statProp: string) {
  if (!dateAfterBefore) return list
  if (dateAfterBefore.after) {
    const after = dateAfterBefore.after
    list = list.filter(f => {
      const time = getStat(f, statProp)
      return moment(time).isSameOrAfter(after, "day")
    })
  }
  if (dateAfterBefore.before) {
    const before = dateAfterBefore.before
    list = list.filter(f => {
      const time = getStat(f, statProp)
      return moment(time).isSameOrBefore(before, "day")
    })
  }
  return list
}
