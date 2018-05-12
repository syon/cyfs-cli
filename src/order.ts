export interface IDateAfterBefore {
  after: string
  before: string
}

export interface IDatetimeAfterBefore {
  after: string
  before: string
}

export interface Order {
  select: {
    pattern: string
    include: {
      name: {
        regex: {
          pattern: string
          flags: string
        }
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
  }
  action: {
    do: string
    args: object
  }
}
