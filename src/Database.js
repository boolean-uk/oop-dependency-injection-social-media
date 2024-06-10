class Database {
  #data;

  constructor(data) {
    this.#data = data;
    this.idCounter = 11
  }

  getData() {
    return [...this.#data];
  }

  addData(key1, value1, key2, value2) {
    const newData = {}
    newData[key1] = value1
    newData[key2] = value2
    newData.id = this.idCounter
    this.#data.push(newData)
    this.idCounter ++ 
  }

  findById(id) {
    const foundData = this.#data.find((object) => object.id === id);
    if (!foundData) {
      throw new Error("No data found with this ID");
    }
    return foundData;
  }

  updateById(id, key, value) {
    const entryToUpdate = this.findById(id);
    entryToUpdate[key] = value;

    return {...entryToUpdate};
  }

  removeById(id) {
    const entryToRemove = this.findById(id);
    const index = this.#data.indexOf(entryToRemove);
    this.#data.splice(index, 1);

    return {...entryToRemove};
  }
}




export default Database;
