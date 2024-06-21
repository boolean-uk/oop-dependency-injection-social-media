import { Database } from "./database.js";

class PostDatabase {
  constructor() {
    this.postDb = new Database()
  }

  get getPostDb() {
    return this.postDb.myDatabase
  }

  postRules(text){
    const trimmedText = text.trim()
    const wordsArray = trimmedText.split(/\s+/).filter(word => word.length > 0);
    const length =  wordsArray.length
    return length
  }

  add(title, content) {
    const checkedTitle = this.postRules(title)
    const checkedContent = this.postRules(content)
    if(checkedTitle > 4 || checkedContent > 9) {
      this.postDb.add({title, content})
    } else {
      console.log('length of Post should be like this: Title(atleaste 5) and content(atleaste 10)')
    }
  }

  remove(id) {
    this.postDb.remove(id)
  }

  update(id, newTitle, newContent) {
    return this.postDb.update(id, {newTitle, newContent})
  }
}

export { PostDatabase }
