class Database {
  #data

  constructor() {
    this.#data = []
    this.id = 0
  }

  get data() {
    return [...this.#data]
  }

  validateUser(username) {
    if (typeof username !== 'string' || username.length < 6) {
      throw new Error('Username must be a string with at least 6 characters')
    }

    if (this.data.some((user) => user.includes(username))) {
      throw new Error('Username must be unique')
    }
  }

  validatePost(title, content) {
    if (typeof title !== 'string' || title.split(' ').length < 5) {
      throw new Error('Title must be a string with at least 5 words')
    }

    if (typeof content !== 'string' || content.split(' ').length < 10) {
      throw new Error('Content must be a string with at least 10 words')
    }
  }

  add(...props) {
    if (props.length === 1) {
      this.validateUser(props[0])
    } else if (props.length === 2) {
      this.validatePost(props[0], props[1])
    } else {
      throw new Error('Invalid number of arguments')
    }

    this.id += 1
    this.#data.push([this.id, ...props])
    return this.data
  }

  remove(prop) {
    const item = this.#data.findIndex((data) => {
      return data.includes(prop)
    })

    if (item === -1) throw new Error('Data not found')

    this.#data.splice(item, 1)
    return this.data
  }

  find(id) {
    const item = this.#data.find((data) => {
      return data[0] === id
    })

    if (!item) throw new Error('Data not found')

    return [...item]
  }

  update(id, oldProp, newProp) {
    const item = this.find(id)
    const propIndex = item.indexOf(oldProp)

    if (propIndex === -1) throw new Error('Property not found in data')

    if (propIndex === 1 && item.length === 2) {
      this.validateUser(newProp)
    } else if (propIndex === 1 && item.length === 3) {
      this.validatePost(newProp, item[2])
    } else if (propIndex === 2) {
      this.validatePost(item[1], newProp)
    } else {
      throw new Error('Invalid property update')
    }

    item[propIndex] = newProp
    return [...item]
  }
}

class UserDatabase {
  #data

  constructor(database) {
    this.#data = database
  }

  get data() {
    return this.#data
  }
}

class PostDatabase {
  #data

  constructor(database) {
    this.#data = database
  }

  get data() {
    return this.#data
  }
}

export { UserDatabase, PostDatabase }
export default Database
