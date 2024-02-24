var http = require("http");
var url = require('url')
var axios= require('axios')

http.createServer((req, res)=>{
    console.log(req.method+ " "+ req.url)

    res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8'}) // text/html para ler html plain da o que la esta escrito

    var q = url.parse(req.url,true)

    res.write(`
    <title>Mapa Virtual</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <body>
    `)

    const mapCidades = new Map();
    axios.get("http://localhost:3000/cidades?_sort=nome")
            .then((resp)=>{
                var data = resp.data

                for (i in data){
                    mapCidades.set(data[i].id , data[i].nome)
                }
            })
            .catch((erro)=>{
                console.log("Erro "+ erro)
                res.write(`<p> ${erro} </p>`)
            })


    if(q.pathname === "/cidades"){
        res.write(`
        <header class="w3-container w3-teal">
            <h1>Mapa Virtual</h1>
        </header>
        `)

        axios.get("http://localhost:3000/cidades?_sort=nome")
            .then((resp)=>{//dento do then é um copia do que esta de fora
                var data = resp.data

                res.write("<ul>")

                for (i in data){
                    res.write("<li><a href='/cidades/"+ data[i].id + "'>" +data[i].nome +"</a></li>")
                }
                res.write("</ul>")
                res.end()
            })
            .catch((erro)=>{
                console.log("Erro "+ erro)
                res.write(`<p> ${erro} </p>`)
            })

    }else if(req.url.match(/\/cidades\/c\d+/)){
        let id = req.url.substring(9)
        axios.get("http://localhost:3000/cidades/"+id).then((resp) =>{
            var data = resp.data
            axios.get("http://localhost:3000/ligacoes?origem="+id).then((resp) =>{
                var dataLigacoes = resp.data

                res.write('<header class="w3-container w3-teal"> <h1>'+ data.nome +'</h1></header>')
                res.write('<div class="w3-container"> <p><b>População:</b> ' + data["população"] + ' habitantes</p>')
                res.write('<p><b>Distrito:</b> '+ data.distrito +"</p>")
                res.write('<p><b>Descrição:</b> ' + data["descrição"] + '</p>')
                res.write('</div>')
                res.write("<br>")

                res.write(`
                <div class="w3-container">
                <h2>Ligações com ${data.nome}</h2>

                <table class="w3-table-all w3-card-4">
                    <tr>
                        <th>Destino</th>
                        <th>Distância (hm)</th>
                    </tr>
                `)


                for (i in dataLigacoes){
                    res.write("<tr>")

                    res.write(` <td><a href="http://localhost:2002/cidades/${dataLigacoes[i].destino}"> ${mapCidades.get(dataLigacoes[i].destino)} </a></td>
                                <td>${dataLigacoes[i]["distância"]}</td>
                    `)

                    res.write("</tr>")
                }
                

                res.write(`
                    </table>
                </div>
                `)


                //botao
                res.write(`
                <br>
                <div class="w3-center">
                <div class="w3-container w3-cell-middle">
                    <a class="w3-button w3-white w3-border w3-border-teal w3-round-large" href="/cidades">Voltar</a>
                </div>
                </div>
                <br>
                `)

                res.end()

            })
            .catch((erro) => {
                console.log("Erro " + erro)
                res.write(`<p> ${erro} </p>`)
            })
            .catch((erro) => {
                console.log("Erro " + erro)
                res.write(`<p> ${erro} </p>`)
            })
    })}

    else {
        res.write(`<meta http-equiv="refresh" content="0; URL='http://localhost:2002/cidades'"/>`)
        res.end();
    }


}).listen(2002)

console.log("porta 2002")