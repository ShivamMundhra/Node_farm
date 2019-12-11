const fs = require("fs");
const http = require("http");
const url = require("url");

// BLOCKING,SYNCHRONUS WAY
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// console.log(typeof textIn);

// const textOut = `This is what we know about avocado: ${textIn} \n create on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

//NON blocking way

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
//         console.log("your file has been written");
//       });
//     });
//   });
// });

// console.log("will read the file");

////////////////////////////////////
//SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);
const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is Overview");
  } else if (pathName === "/product") {
    res.end("This is product");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json"
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-header": "hello world"
    });
    res.end("</h1>Page NOT FOUND</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listeing to req on port 8000");
});
