import { Database } from "./database.js"
import { PostDatabase } from "./post-database.js"
import { UserDatabase } from "./user-database.js"
const myPost = new PostDatabase
myPost.add('Im learning aboud Object oriented cool1', 'Object oriented is all about that and this and those and they are so good!')
myPost.add('Im learning aboud Object oriented cool2', 'Object oriented is all about that and this and those and they are so good!')
myPost.add('Im learning aboud Object oriented cool3', 'Object oriented is all about that and this and those and they are so good!')
myPost.add('Im learning aboud Object oriented cool4', 'Object oriented is all about that and this and those and they are so good!')
myPost.add('Im learning aboud Object oriented cool5', 'Object oriented is all about that and this and those and they are so good!')

// console.log(myPost.getPostDb)

myPost.update(3,'Im learning aboud Object oriented cool6', 'Object oriented is all about that and this and those and they are so good!6')

console.log(myPost.getPostDb)





const mydata = new UserDatabase()


mydata.add('farshad')
mydata.add('will20')
mydata.add('farshad')
mydata.add('nathan')
mydata.removeById(1)
mydata.add('Peric')
mydata.add('farshad')
mydata.updateById(4, 'Angus1')
mydata.add('shahi')
mydata.updateById(5, 'shaian')
console.log(mydata.userDataBase)