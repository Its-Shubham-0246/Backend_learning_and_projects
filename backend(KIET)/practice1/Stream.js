// import fs from 'fs'
// // const readStream = fs.createReadStream('./sample.txt')
// // const writeStream = fs.createWriteStream('./Output.txt')
// // 
// // readStream.on('data',(chunk)=>{
// //  console.log(chunk)
// //  writeStream.write(chunk)
// // })
// // 
// // readStream.on('end',() => {
// //  console.log("End of File")
// //  writeStream.close()
// // })
// 
// // readStream.pipe(writeStream)///Creating pipe between readStream and writeStream
// 
// // writeStream.on()
// 
// //create read stream
// const readStream = fs.createReadStream("./test.txt")
// const gzip = zlib.createGzip()
// 
// //create and write on stream
// const writeStream = fs.createWriteStream("./data.txt.gz")
// 
// //Do create and use pipe
// readStream.pipe(gzip).pipe(writeStream)



