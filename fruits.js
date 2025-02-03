const http = require("http");
const url = require('url');
const fs = require("fs");
const PORT = "8080";


http.createServer((req, res) => {
    res.writeHead(200, "Connection successful", {"Content-type": "text/html"});//200 status
   
    let completAddress = url.parse(req.url, true);//method of the modul
    let queries = completAddress.query;
    console.log("varieties: " + queries.varieties);
    console.log("Name: " + queries.name);
    //Try that link http://localhost:8080/redapples?name=fruit&varieties=fuji

    if(completAddress.path === "/"){
        //link to home page : http://localhost:8080
        res.write("<div>")
        res.write("<h1>Fruits</h1>");
        res.write("<p>Fruits are an excellent source of essential vitamins and minerals, and they are high in fiber. One of my favorite fruits is apples, and among them we have: </p>");
        res.write("<a href='/greenapples'>Granny Smith</a></br>");
        res.write("<a href='/redapples'>Red apples</a></br>");
        res.write("<a href='/goldenapples'>Golden apple</a></br>");
        res.write("<a href='/gala'>Gala</a></br>");
        res.write("</div>")
       

    }else if(completAddress.path.includes("/greenapples")){
        //link : http://localhost:8080/greenapples
        res.write("<div>");
        res.write("<h1>Granny Smith or Green apples</h1>");
        if(completAddress.name =! "/greenapples") {
            res.write("<h2>Granny Smith has green color</h2>")
        }
            res.write("<p>Pucker up, tart apple lovers. Beyond the iconic light-green skin of this apple awaits a lemon-like acidity with just enough sweetness. Discovered by none other than Granny Smith on her farm in Australia.</p>")
            res.write("<a href='/'>Home Page</a>");
            res.write("</div>");

   
      

    }else if(completAddress.path.includes("/redapples")) {
        res.write("<div>");
        res.write("<h1>Red apples</h1>");
        res.write(`<p>It is the quintessential red apple. A well-known favorite that is popular for its tried-and-true flavor: mildly sweet and crunchy. Think of an apple and this is the one that pops to mind.</p>`)
        res.write("<a href='/redapples?name=fuji'>Fuji</a></br>")
        res.write("<a href='/redapples?name=CrippsPinkcv'>Cripps Pink cv.</a></br>")
        res.write("<a href='/'>Home Page</a>")
        res.write("</div>")

        if(queries.name === "fuji"){
            fs.readFile('./data/fuji.text', (err, data) => {
                if(err) {
                    res.write("Server error");
                }else {
                    res.write(data)
                }
                res.end();
            })
        }
        
        if(queries.name === "CrippsPinkcv"){
            fs.readFile('./data/CrippsPinkcv.html', (err, data) => {
                if(err) {
                    res.write(`<div>Server error: ${err}</div>`);
                }else {
                    res.write(data)
                }
                res.end();
            })
        }
      
    }
    else if(completAddress.path.includes("/goldenapples")) {
        res.write("<div>");
        res.write("<h1>Golden apple</h1>");
        res.write(`<p>Quinces. Fresuently, the term "golden apple" is used to refer to the quince, a fruit originating in the Middle East.</p>`)
        res.write("<a href='/'>Home Page</a>")
        res.write("</div>")
       
    }else if(completAddress.path.includes("/gala")) {
        res.write("<div>");
        res.write("<h1>Gala</h1>");
        res.write(`<p>Wildly popular? Yes. Easy to love? Absolutely. Bite into mildly sweet flavors with a hint of vanilla. For a mellow, easy-eating apple you are in the right spot</p>`);
        res.write("<a href='/'>Home Page</a>")
        res.write("</div>");
       
    }else{
        res.write("<h1>404 page Not Found</h1>")
       
    }
    

}).listen(PORT, () => console.log(`Listen to port ${PORT}`))//This is the port number to access it./ it takes a call-back function