const buffer = Buffer.from("Hello Students")
console.log(buffer)
console.log(buffer.toString())
console.log(buffer.length)
console.log(buffer[1])
console.log(String.fromCharCode(buffer[1]))

//Buffer creation by alloc
const buffer2 = Buffer.alloc(10)
console.log(buffer2)
console.log(buffer2.toString())