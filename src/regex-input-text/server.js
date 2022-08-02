import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('src/regex-input-text/index.html').pipe(res)
})

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is running at port 3000...");
});
