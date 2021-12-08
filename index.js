const fs = require("fs")
const url = require("url")
const http = require("http")
const replaceTemplate = require('./modules/replaceTemplate')
const  slugify  = require("slugify")


const mainHtml  = fs.readFileSync("/home/sachin/Documents/CGCS phase2/NodeJS/Nodejs-Fetch-data-from-URL/index.html", "utf-8")
const singleCar = fs.readFileSync("/home/sachin/Documents/CGCS phase2/NodeJS/Nodejs-Fetch-data-from-URL/cars.html","utf-8")
const data = fs.readFileSync("/home/sachin/Documents/CGCS phase2/NodeJS/Nodejs-Fetch-data-from-URL/data.json","utf-8")
const carData = JSON.parse(data)

const server = http.createServer((req,res)=>{
    const {query, pathname} = url.parse (req.url, true)

    console.log(slugify('Hello World', {lower : true}))

    if(pathname === '/login'){
        res.end("test")
    }

    else if (pathname === '/cars'){
        res.writeHead(200, {"content-type" : "text/html"})
        const carsCard = carData.map(i => replaceTemplate(singleCar, i)).join('')
        const output = mainHtml.replace(/{%CARS_DATA%}/g , carsCard).replace(/{%TOTAL_COUNT%}/g, carData.length)
        res.end(output)
    }

    else if(pathname === '/dashboard'){
         res.writeHead(200, {"content-type" : "text/html"})
         const car = carData[query.id]
         const output = replaceTemplate(mainHtml, car)
         res.end(output)
    }

    else if (pathname === '/api'){
        res.writeHead(200, {"content-type" : "application/json"} )
        res.end(data)
    }

    else{
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-header' : 'my header'
        })
        res.end( "<h1>Page not found</h1>")
    }
    
})

server.listen(8000, '127.0.0.1', () => {
    console.log("listening on port 8000")
})
