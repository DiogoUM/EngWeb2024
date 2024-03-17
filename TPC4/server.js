var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')
var static = require('./static.js')
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
            console.log(body)
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var tpc4Server = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if (static.staticResource(req)) {
        return static.serveStaticResource(req, res)
    }
    else{
        switch(req.method) {
            case "GET":
                if(req.url === "/"){
                    res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
                    res.write(templates.mainPage(d))
                    res.end()
                }
                else if(req.url==="/compositores"){
                    axios.get("http://localhost:3000/compositores?_sort=nome")
                        .then(resp =>{
                            res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
                            var compositores = resp.data
                            res.write(templates.compositoresListPage(compositores,d))
                            res.end()
                        }).catch(erro =>{
                            res.writeHead(503, {"Content-Type": "text/html; charset=UTF-8"})
                            res.write("<p> Nao foi possivel obter a lista dos compositores "+ erro +"</p>")
                            res.end()
                    })
                }else if(/\/compositores\?periodo=\w+$/.test(req.url)) {
                    var campos = req.url.split('=');
                    var inicio = campos[1];
                    res.writeHead(503, {"Content-Type": "text/html; charset=UTF-8"})
                    res.write(`<meta http-equiv="refresh" content="0; URL='http://localhost:7777/periodos/${inicio}'"/>`)
                    res.end()
                }else if (/\/compositores\/(C)\d+$/i.test(req.url)) {
                    let id = req.url.split("/")[2]
                    axios.get("http://localhost:3000/compositores/"+id)
                        .then(resp =>{
                            res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
                            var compositor = resp.data
                            res.write(templates.compositoresPage(compositor,d))
                            res.end()
                        }).catch(erro =>{
                        res.writeHead(504, {"Content-Type": "text/html; charset=UTF-8"})
                        res.write("<p> Nao foi possivel obter a informação do compositor "+ erro +"</p>")
                        res.end()
                    })
                }
                else if(req.url==="/compositores/registo"){
                    res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
                    res.write(templates.compositoresFormPage(d))
                    res.end()
                }
                else if(/\/compositores\/delete\/(C)\d+$/i.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.delete("http://localhost:3000/compositores/"+id)
                        .then(resp => {
                            res.writeHead(201, {"Content-Type": "text/html; charset=UTF-8"})
                            res.write("registo apagado "+id)
                            res.write(`<meta http-equiv="refresh" content="5; URL='http://localhost:7777/periodos'"/>`)
                            res.end()
                        }).catch(erro =>{
                        res.writeHead(510, {"Content-Type": "text/html; charset=UTF-8"})
                        res.write("<p> Nao foi possivel apagar o compositor "+ erro +"</p>")
                        res.end()
                    })
                }
                else if(/\/periodos\/delete\/\w+$/i.test(req.url)){
                    id = req.url.split("/")[3]
                    console.log(id)
                    axios.delete("http://localhost:3000/periodos/"+id)
                        .then(resp => {
                            res.writeHead(201, {"Content-Type": "text/html; charset=UTF-8"})
                            res.write("registo apagado "+id)
                            res.write(`<meta http-equiv="refresh" content="5; URL='http://localhost:7777/periodos'"/>`)
                            res.end()
                        }).catch(erro =>{
                            res.writeHead(510, {"Content-Type": "text/html; charset=UTF-8"})
                            res.write("<p> Nao foi possivel apagar o compositor "+ erro +"</p>")
                            res.end()
                    })
                }
                else if(/\/compositores\/edit\/(C)\d+$/i.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.get("http://localhost:3000/compositores/"+id)
                        .then(resp =>{
                            res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
                            var compositor = resp.data
                            res.write(templates.compositoresEditPage(compositor,d))
                            res.end()
                        }).catch(erro =>{
                        res.writeHead(505, {"Content-Type": "text/html; charset=UTF-8"})
                        res.write("<p> Erro "+ erro +"</p>")
                        res.end()
                    })
                }
                else if(req.url==="/periodos"){
                    axios.get("http://localhost:3000/periodos?_sort=periodo")
                        .then(resp =>{
                            res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
                            var periodos = resp.data
                            res.write(templates.PeriodoListPage(periodos,d))
                            res.end()
                        }).catch(erro =>{
                        res.writeHead(503, {"Content-Type": "text/html; charset=UTF-8"})
                        res.write("<p> Nao foi possivel obter a lista dos periodos "+ erro +"</p>")
                        res.end()
                    })
                }else if(req.url==="/periodos/registo"){
                    res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
                    res.write(templates.periodoFormPage(d))
                    res.end()
                }

                else if(/\/periodos\/\w+/i.test(req.url)){
                    ids = req.url.split("/")[2]
                    console.log(ids)
                    console.log(ids.length)
                    axios.get("http://localhost:3000/periodos?periodo="+ids)
                        .then(resp =>{
                            periodosAtual = resp.data
                            axios.get("http://localhost:3000/compositores?periodo="+ids).then(resp2=>{
                                let periodosCompositores = resp2.data
                                res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
                                res.write(templates.PeriodoPage(ids,periodosCompositores,d))
                                res.end()
                            }).catch(erro =>{
                                console.log("nao encontrei")
                                let periodosCompositores = [];
                                res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
                                res.write(templates.errorPage(erro))
                                res.write(templates.PeriodoPage(ids,periodosCompositores,d))
                                res.end()
                            })
                        }).catch(erro =>{
                            res.writeHead(503, {"Content-Type": "text/html; charset=UTF-8"})
                            res.write("<p> Nao foi possivel obter a informaçao do periodo "+ erro +"</p>")
                            res.end()
                    })
                }
                else {
                    res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
                    res.write("<h1>...</h1>")
                    res.end()
                }
                break
            case "POST":
                if(req.url ==="/compositores/registo"){
                    collectRequestBodyData(req,result =>{
                        if(result){
                            axios.post("http://localhost:3000/compositores/",result).then( resp=>{
                                res.writeHead(201, {"Content-Type": "text/html; charset=UTF-8"})
                                res.write("<p> registo inserido:"+JSON.stringify(resp.data)+ "</p>")
                                res.write(`<meta http-equiv="refresh" content="5; URL='http://localhost:7777/compositores'"/>`)
                                res.end()
                            }).catch( erro =>{
                                res.writeHead(504, {"Content-Type": "text/html; charset=UTF-8"})
                                res.write(templates.errorPage(erro,d))
                                res.end()
                            })
                        }
                        else {
                            res.writeHead(506, {"Content-Type": "text/html; charset=UTF-8"})
                            res.write("<p> Nao foi possivel obter os dados do body "+req.url +"</p>")
                            res.end()
                        }
                    })}
                else if(/\/compositores\/edit\/(C)\d+$/i.test(req.url)){
                    collectRequestBodyData(req,result=>{
                        if(result){
                            console.log(result)
                            axios.put("http://localhost:3000/compositores/"+result.id,result).then( resp=>{
                                    res.writeHead(201, {"Content-Type": "text/html; charset=UTF-8"})
                                    res.write("<p> registo alterado:"+JSON.stringify(resp.data)+ "</p>")
                                    res.write(`<meta http-equiv="refresh" content="5; URL='http://localhost:7777/compositores'"/>`)
                                    res.end()
                                }
                            ).catch( erro=>{
                                    res.writeHead(507, {"Content-Type": "text/html; charset=UTF-8"})
                                    res.write(templates.errorPage(erro,d))
                                    res.end()
                                }
                            )
                        }else {
                            res.writeHead(506, {"Content-Type": "text/html; charset=UTF-8"})
                            res.write("<p> Nao foi possivel obter os dados do body "+req.url +"</p>")
                            res.end()
                        }
                    })
                }
                else if(req.url ==="/periodos/registo"){
                    collectRequestBodyData(req,result=>{
                    if(result){
                        axios.post("http://localhost:3000/periodos/",result).then( resp=>{
                            res.writeHead(201, {"Content-Type": "text/html; charset=UTF-8"})
                            res.write("<p> registo inserido:"+JSON.stringify(resp.data)+ "</p>")
                            res.write(`<meta http-equiv="refresh" content="5; URL='http://localhost:7777/periodos'"/>`)
                            res.end()
                        }).catch( erro =>{
                            res.writeHead(504, {"Content-Type": "text/html; charset=UTF-8"})
                            res.write(templates.errorPage(erro,d))
                            res.end()
                        })
                    }
                    else {
                        res.writeHead(506, {"Content-Type": "text/html; charset=UTF-8"})
                        res.write("<p> Nao foi possivel obter os dados do body "+req.url +"</p>")
                        res.end()
                    }
                })
                }
                else{
                    res.writeHead(501, {"Content-Type": "text/html; charset=UTF-8"})
                    res.write("<p> Post request nao suportado "+req.url +"</p>")
                    res.end()
                }
                break
        }
    }
}).listen(7777)