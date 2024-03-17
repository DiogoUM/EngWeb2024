

exports.mainPage=function (d){
    return pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Main page</title>
        </head>
        <body>
        <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>TPC4</h1>
                </header>
                <a class="w3-btn w3-round w3-grey" href="/compositores">Lista de Compositores</a>
               
               <a class="w3-btn w3-round w3-grey" href="/periodos">Lista de periodos</a>
        </div>
        </body>
    </html>`
}


exports.compositoresListPage = function(slist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Periodo Management</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Lista de Compositores
                    <a class="w3-btn w3-round w3-grey" href="/compositores/registo">+</a>
                    </h1>
                    
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Nome</th><th>Epoca</th><th>Actions</th>
                        </tr>
    `
    for(let i= 0; i < slist.length ; i++){
        pagHTML += `
                <tr>
                    <td>
                        [<a href="/compositores/${slist[i].id}">${slist[i]["nome"]}</a>]
                    <td>
                        [<a href="/periodos/${slist[i].periodo}">${slist[i]["periodo"]}</a>]
                    </td>
                    <td>
                        [<a href="/compositores/edit/${slist[i].id}">Edit</a>]
                        [<a href="/compositores/delete/${slist[i].id}">Delete</a>]
                    </td>
                </tr>
                `
    }
    pagHTML += `
            </table>
            </div>
                 <footer class="w3-container w3-purple">
                    <h5>${d} - [<a href="/">Voltar</a>]</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.compositoresFormPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Periodo Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Formulario Compositor</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Form</legend>
                        <label>id</label>
                        <input class="w3-input w3-round" pattern="C\\d+" type="text" name="id" required/>
                        <label>nome</label>
                        <input class="w3-input w3-round" type="text" name="nome" required/>
                        <label>bio</label>
                        <input class="w3-input w3-round" type="text" name="bio" required/>
                        <label>dataNasc</label>
                        <input class="w3-input w3-round" type="date" name="dataNasc" required/>
                        <label>dataObito</label>
                        <input class="w3-input w3-round" type="date" name="dataObito" required/>
                        <label>periodo</label>
                        <input class="w3-input w3-round" type="text" name="periodo" required/>
                    </fieldset>
                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
}


exports.compositoresEditPage = function(a, d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Periodo Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Periodo Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${a.id}"/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${a.nome}"/>
                        <label>Biografia</label>
                        <input class="w3-input w3-round" type="text" name="bio" value="${a.bio}"/>
                        <label>Data de Nascimento</label>
                        <input class="w3-input w3-round" type="date" name="dataNasc"  value="${a.dataNasc}"/>
                        <label>Data de obito</label>
                        <input class="w3-input w3-round" type="date" name="dataObito" value="${a.dataObito}"/>
                        <label>Periodo</label>
                        <input class="w3-input w3-round" type="text" name="periodo" value="${a.periodo}"/>
                    </fieldset>
                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>${d} - [<a href="/compositores">Return</a>]</h5>
                </footer>
            </div>
            </body>
            </html>
    `
}

exports.compositoresPage = function( compositor, d ){
    var pagHTML = `
    <html>
    <head>
        <title>Compositor: ${compositor.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Compositor ${compositor["id"]}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>nome: </b> ${compositor.nome}</li>
                    <li><b>dataNascimento: </b> ${compositor.dataNasc}</li>
                    <li><b>dataObito</b>${compositor.dataObito}</li>
                    <li><b>Periodo: </b> <a href="/periodos/${compositor.periodo}">${compositor.periodo}</a></li>
                    <li><b>Biografia: </b>${compositor.bio}</li>
                </ul>
            </div>
            <div class="w3-container w3-margin-8">
                <ul class="w3-ul">
            `

    pagHTML +=     `</ul></div>
            <footer class="w3-container w3-teal">
                <address>${d} - [<a href="/compositores">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}

exports.PeriodoPage = function(nomePeriodo,periodosCompositores,d){
    var pagHTML = `
    <html>
    <head>
        <title>Periodo: ${nomePeriodo}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Periodo ${nomePeriodo}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
`
    for(let i =0 ;i < periodosCompositores.length ;i++ ){
        pagHTML += `<li><b>Compositor: </b> <a href="/compositores/${periodosCompositores[i].id}">${periodosCompositores[i].nome}</a></li>`
    }

    pagHTML += `           
                </ul>
            </div>
            <div class="w3-container w3-margin-8">
                <ul class="w3-ul">
            </ul></div>
            <footer class="w3-container w3-teal">
                <address>${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}

exports.PeriodoListPage = function(slist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Periodo Management</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Lista de periodos
                    <a class="w3-btn w3-round w3-grey" href="/periodos/registo">+</a>
                    </h1>
                    
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Nome</th><th>Actions</th>    
                        </tr>
                        
    `
    for(let i= 0; i < slist.length ; i++){
        pagHTML += `
                <tr>
                    <td>
                        [<a href="/periodos/${slist[i].periodo}">${slist[i].periodo}</a>]
                    </td>
                    <td>
                        [<a href="/periodos/delete/${slist[i].id}">Delete</a>]
                    </td>
                </tr>
                `
    }
    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>[<a href="/">Voltar</a>]</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.periodoFormPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Periodo Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Formulario Periodo</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Form</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="periodo" required/>
                    </fieldset>
                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>
                
                <footer class="w3-container w3-purple">
                    <h5>${d} - [<a href="/">Voltar</a>]</h5>
                </footer>
            
            </div>
    `
}

exports.errorPage = function(errorMessage, d){
    return `
    <p>${d}: Error: ${errorMessage}</p>
    `
}