var http = require('http')
var fs = require('fs')
var url = require('url')
var axios = require('axios')


function genFilmes(filmes){
    let pagHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/w3.css">
    <title>Filmes</title>
</head>
<body>

<header class="w3-container w3-teal w3-cell-row">
    <div class="w3-container w3-cell">
        <h1>Lista de Filmes</h1>
    </div>
    <div class="w3-container w3-cell w3-cell-middle">
        <a href="/" class="w3-button w3-border w3-right w3-round-xlarge"><b>Voltar</b></a>
    </div>
</header>

<br>
<div class="w3-container">
    <!-- Barra de Pesquisa -->
    <input class="w3-input w3-border" type="text" placeholder="Pesquisar" id="searchInput">

    <!-- Lista de Itens -->
    <ul class="w3-ul w3-card-4" id="itemList">
`
    filmes.forEach(filme =>{
        let id = filme.id
        let titulo = filme.title
        pagHTML += `<li><a href="/filmes/${id}">${titulo}</a></li>`
    })

pagHTML += `
    </ul>
</div>

<script>
    // Função para filtrar os itens da lista
    function filterItems() {
        var input, filter, ul, li, txtValue;
        input = document.getElementById('searchInput');
        filter = input.value.toUpperCase();
        ul = document.getElementById("itemList");
        li = ul.getElementsByTagName('li');

        for (var i = 0; i < li.length; i++) {
            txtValue = li[i].textContent || li[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    // Adiciona um listener de eventos para chamar a função de filtro quando o texto na barra de pesquisa é alterado
    document.getElementById('searchInput').addEventListener('input', filterItems);
</script>

</body>
</html>
`
    return pagHTML
}

function genFilme(filme){
    let titulo = filme.title
    let ano = filme.year
    let pagHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${titulo}</title>
    <link rel="stylesheet" href="/w3.css">
</head>
<body>
    <header class="w3-container w3-teal w3-cell-row">
        <div class="w3-container w3-cell">
            <h1>${titulo}</h1>
        </div>
        <div class="w3-container w3-cell w3-cell-middle">
            <a href="/filmes" class="w3-button w3-border w3-right w3-round-xlarge"><b>Voltar</b></a>
        </div>
    </header>

    <div class="w3-container">
        <br>
        <b>Ano:</b> ${ano}
        <br>
        <br>

        <div class="w3-container w3-teal"><h2>Elenco</h2></div>
        <ul class="w3-ul w3-card-4">
`
    if ((filme.cast).length === 0) {
        pagHTML += `<li>Não foram encontradas insâncias</li>`
    }
    else {
        filme.cast.forEach(caster => {
            pagHTML += `<li><a href="/atores/${caster}">${caster}</a></li>`
        })
    }


    pagHTML += `
        </ul>
        <br>
        <div class="w3-container w3-teal"><h2>Géneros</h2></div>
        <ul class="w3-ul w3-card-4">
`

    if ((filme.genres).length === 0) {
        pagHTML += `<li>Não foram encontradas insâncias</li>`
    }
    else {
        filme.genres.forEach(gen => {
            pagHTML += `<li><a href="/filmes/${gen}">${gen}</a></li>`
        })
    }

    pagHTML +=`
        </ul>
    </div>

</body>
</html>
    `
    return pagHTML
}
function genAtores(atores){
        let pagHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Atores</title>
    <link rel="stylesheet" href="/w3.css">
</head>
<body>

<header class="w3-container w3-teal w3-cell-row">
    <div class="w3-container w3-cell">
        <h1>Lista de Atores</h1>
    </div>
    <div class="w3-container w3-cell w3-cell-middle">
        <a href="/" class="w3-button w3-border w3-right w3-round-xlarge"><b>Voltar</b></a>
    </div>
</header>

<br>
<div class="w3-container">
    <!-- Barra de Pesquisa -->
    <input class="w3-input w3-border" type="text" placeholder="Pesquisar" id="searchInput">

    <!-- Lista de Itens -->
    <ul class="w3-ul w3-card-4" id="itemList">
`
    atores.forEach(ator =>{
        var nome = ator.nome
        pagHTML += `<li><a href="/atores/${nome}">${nome}</a></li>`
    })

pagHTML += `
    </ul>
</div>

<script>
    // Função para filtrar os itens da lista
    function filterItems() {
        var input, filter, ul, li, txtValue;
        input = document.getElementById('searchInput');
        filter = input.value.toUpperCase();
        ul = document.getElementById("itemList");
        li = ul.getElementsByTagName('li');

        for (var i = 0; i < li.length; i++) {
            txtValue = li[i].textContent || li[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    // Adiciona um listener de eventos para chamar a função de filtro quando o texto na barra de pesquisa é alterado
    document.getElementById('searchInput').addEventListener('input', filterItems);
</script>

</body>
</html>
`
    return pagHTML
}

function genAtor(ator){
    let n = ator["nome"]
    let pagHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${n}</title>
    <link rel="stylesheet" href="/w3.css">
</head>
<body>
    <header class="w3-container w3-teal w3-cell-row">
        <div class="w3-container w3-cell">
            <h1>${n}</h1>
        </div>
        <div class="w3-container w3-cell w3-cell-middle">
            <a href="/atores" class="w3-button w3-border w3-right w3-round-xlarge"><b>Voltar</b></a>
        </div>
    </header>
    <br>
    <div class="w3-container">

        <div class="w3-container w3-teal"><h2>Participações</h2></div>
        <ul class="w3-ul w3-card-4">
`

    ator.filmes.forEach(filme => {
        idFilme = filme.idFilme
        nomeFilme = filme.nomeFilme
        pagHTML += `<li><a href="/filmes/${idFilme}">${nomeFilme}</a></li>`
    })


    pagHTML +=`
        </ul>
    </div>

</body>
</html>
    `
    return pagHTML
}

function genGeneros(generos){
    let pagHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Generos</title>
    <link rel="stylesheet" href="/w3.css">
</head>
<body>

<header class="w3-container w3-teal w3-cell-row">
    <div class="w3-container w3-cell">
        <h1>Lista de Generos</h1>
    </div>
    <div class="w3-container w3-cell w3-cell-middle">
        <a href="/" class="w3-button w3-border w3-right w3-round-xlarge"><b>Voltar</b></a>
    </div>
</header>

<br>
<div class="w3-container">
    <!-- Barra de Pesquisa -->
    <input class="w3-input w3-border" type="text" placeholder="Pesquisar" id="searchInput">

    <!-- Lista de Itens -->
    <ul class="w3-ul w3-card-4" id="itemList">
`
    generos.forEach(gen =>{
        var genNome = gen.genero
        pagHTML += `<li><a href="/genero/${genNome}">${genNome}</a></li>`
    })

pagHTML += `
    </ul>
</div>

<script>
    // Função para filtrar os itens da lista
    function filterItems() {
        var input, filter, ul, li, txtValue;
        input = document.getElementById('searchInput');
        filter = input.value.toUpperCase();
        ul = document.getElementById("itemList");
        li = ul.getElementsByTagName('li');

        for (var i = 0; i < li.length; i++) {
            txtValue = li[i].textContent || li[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    // Adiciona um listener de eventos para chamar a função de filtro quando o texto na barra de pesquisa é alterado
    document.getElementById('searchInput').addEventListener('input', filterItems);
</script>

</body>
</html>
`
    return pagHTML
}

function genGenero(genero){
    let n = genero.genero
    let pagHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${n}</title>
    <link rel="stylesheet" href="/w3.css">
</head>
<body>
    <header class="w3-container w3-teal w3-cell-row">
        <div class="w3-container w3-cell">
            <h1>${n}</h1>
        </div>
        <div class="w3-container w3-cell w3-cell-middle">
            <a href="/genero" class="w3-button w3-border w3-right w3-round-xlarge"><b>Voltar</b></a>
        </div>
    </header>
    <br>
    <div class="w3-container">

        <div class="w3-container w3-teal"><h2>Filmes que contêm este género</h2></div>
        <ul class="w3-ul w3-card-4">
`

    genero.filmes.forEach(filme => {
        idFilme = filme.idFilme
        nomeFilme = filme.nomeFilme
        pagHTML += `<li><a href="/filmes/${idFilme}">${nomeFilme}</a></li>`
    })


    pagHTML +=`
        </ul>
    </div>

</body>
</html>
    `
    return pagHTML
}

http.createServer(function (req, res) {
    var regexFilme = /^\/filmes\/[a-z0-9]+$/
    var regexAtor = /^\/atores\/.+?$/
    var regexGenero = /^\/genero\/.+?$/
    var q = url.parse( req.url, true)
    if(q.pathname === '/'){
        fs.readFile('index.html', function (erro, dados){
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(dados)
            res.end()
        })
    }
    else if(q.pathname === '/filmes'){
        axios.get('http://localhost:3000/filmes?_sort=title').then(function (resp) {
            var dados = resp.data
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(genFilmes(dados))
            res.end()
        })
        .catch(function (erro) {
            res.writeHead(500, { 'Content-Type': 'text/html' })
            res.write("<pre>"+ erro + "</pre>")
            res.end()
        })
    }
    else if (regexFilme.test(q.pathname)) {
        axios.get('http://localhost:3000'+ q.pathname).then(function (resp) {
            dados = resp.data
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(genFilme(dados))
            res.end()
        })
            .catch(function (erro) {
                res.writeHead(500, { 'Content-Type': 'text/html' })
                res.write("<pre>" + erro + "</pre>")
                res.end()
            })
    }
    else if(q.pathname === '/atores'){
        axios.get('http://localhost:3000/atores?_sort=nome').then(function (resp) {
            var dados = resp.data
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(genAtores(dados))
            res.end()
        })
        .catch(function (erro) {
            res.writeHead(500, { 'Content-Type': 'text/html' })
            res.write("<pre>"+ erro + "</pre>")
            res.end()
        })
    }
    else if (regexAtor.test(q.pathname)) {
        var nome = q.pathname.substring(8)
        console.log("teste:" + nome)
        axios.get('http://localhost:3000/atores?nome='+ nome).then(function (resp) {
            dados = resp.data
            console.log(dados[0])
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(genAtor(dados[0]))
            res.end()
        })
            .catch(function (erro) {
                res.writeHead(500, { 'Content-Type': 'text/html' })
                res.write("<pre>" + erro + "</pre>")
                res.end()
            })
    }
    else if(q.pathname === '/genero'){
        axios.get('http://localhost:3000/genero?_sort=genero').then(function (resp) {
            var dados = resp.data
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(genGeneros(dados))
            res.end()
        })
        .catch(function (erro) {
            res.writeHead(500, { 'Content-Type': 'text/html' })
            res.write("<pre>"+ erro + "</pre>")
            res.end()
        })
    }
    else if (regexGenero.test(q.pathname)) {
        var gen = q.pathname.substring(8)
        axios.get('http://localhost:3000/genero?genero='+ gen).then(function (resp) {
            dados = resp.data
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(genGenero(dados[0]))
            res.end()
        })
            .catch(function (erro) {
                res.writeHead(500, { 'Content-Type': 'text/html' })
                res.write("<pre>" + erro + "</pre>")
                res.end()
            })
    }
    else if(q.pathname === '/w3.css'){
        fs.readFile('w3.css', function(erro, dados) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            res.write(dados)
            res.end()
        })
    }
    else{
        res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
        res.write('<p>Erro: pedido não suportado.</p>')
        res.write('<pre>' + q.pathname + '</pre>')
        res.end()
    }
    console.log(q.pathname)
}).listen(7777)