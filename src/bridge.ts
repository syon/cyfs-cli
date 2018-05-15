import * as fs from "fs"
import * as yaml from "js-yaml"
import * as cyfs from "cyfs"
import { Order } from "./order"

export default (args: { file: string }, flags: object): String => {
  // TODO: auto detect encofing
  const buf = fs.readFileSync(args.file, "utf-8")
  const order: Order = <Order>yaml.safeLoad(buf)
  const list = cyfs(order, flags)
  return list.join("\n")
}
