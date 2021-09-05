import * as fs from "fs";
import * as yaml from "js-yaml";
import * as cyfs from "cyfs";
import { Order } from "./order";

export default async (
  args: { [name: string]: any },
  flags: object
): Promise<string> => {
  const buf = fs.readFileSync(args.file, "utf-8");
  const order: Order = yaml.load(buf) as Order;
  const list = await cyfs(order, flags);
  return list.join("\n");
};
