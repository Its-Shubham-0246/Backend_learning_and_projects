import fs from 'fs';

const FilePath = './Test.txt';
const content = 'Hello welcome to file module demo';
// fs.writeFile(FilePath, content,(err) => {
//  if(err) throw err
//  console.log("The file has been saved.")
// });
const result = fs.readFile(FilePath,"",(err) => {
 if(err) throw err
 console.log("read successfully")
})
console.log(result)
// fs.appendFileSync(FilePath,' world')
// fs.appendFile(FilePath,'world',(err) =>{
//  if(err) throw err
//  console.log("appended successfully")
// })
