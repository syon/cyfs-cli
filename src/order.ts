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
        mode: string
        after: string
        before: string
      }
      datetime: {
        mode: string
        after: string
        before: string
      }
    }
  }
  action: {
    do: string
    args: object
  }
}
