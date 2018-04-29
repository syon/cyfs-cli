import * as fs from "fs"
import * as path from "path"
import * as yaml from "js-yaml"
import * as glob from "glob"
import * as moment from "moment"

export = (file: string): Array<String> => {
  const buf = fs.readFileSync(file, "utf-8")
  const order = yaml.safeLoad(buf)
  if (!order) return []
  let list = glob.sync(order.glob)
  if (order.name.regex) {
    list = list.filter(f => {
      const filename = path.basename(f)
      const regex = new RegExp(order.name.regex)
      return filename.match(regex)
    })
  }
  if (order.name.contain) {
    list = list.filter(f => {
      const filename = path.basename(f)
      return order.name.contain.some(word => {
        return ~filename.indexOf(word)
      })
    })
  }
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
  if (order.date.access.after) {
    list = list.filter(f => {
      const stat = fs.statSync(f)
      const after = order.date.access.after
      return moment(stat.atime).isSameOrAfter(after, "day")
    })
  }
  if (order.date.access.before) {
    list = list.filter(f => {
      const stat = fs.statSync(f)
      const before = order.date.access.before
      return moment(stat.atime).isSameOrBefore(before, "day")
    })
  }
  return list
}
