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
    access: {
      after: string
      before: string
    }
    modify: {
      after: string
      before: string
    }
    change: {
      after: string
      before: string
    }
    birth: {
      after: string
      before: string
    }
  }
  datetime: {
    access: {
      after: string
      before: string
    }
  }
}
