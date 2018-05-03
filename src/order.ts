export interface IDateAfterBefore {
  after: string
  before: string
}

export interface IDatetimeAfterBefore {
  after: string
  before: string
}

export default interface Order {
  glob: string
  name: {
    regex: string
    contain: Array<string>
  }
  size: {
    min: number
    max: number
  }
  date: {
    access: IDateAfterBefore
    modify: IDateAfterBefore
    change: IDateAfterBefore
    birth: IDateAfterBefore
  }
  datetime: {
    access: IDatetimeAfterBefore
  }
}
