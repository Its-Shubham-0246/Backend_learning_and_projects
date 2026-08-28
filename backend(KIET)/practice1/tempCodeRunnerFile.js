import fs from 'fs';

const FilePath = './Test1.txt';
const content = 'Hello welcome to file module demo';
// fs.writeFile(FilePath, content,(err) => {
//  if(err) throw err
//  console.log("The file has been saved.")
// });
console.log(fs.readFileSync(FilePath,"utf-8"))

