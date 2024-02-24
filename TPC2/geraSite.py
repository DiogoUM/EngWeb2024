import json
import os
import pdb

def chaveOrd(emd):
    return emd['nome']

with open("mapa-virtual.json", 'r', encoding='utf-8') as ds:
    data = json.load(ds)

data.sort(key=chaveOrd)

# gera a página inicial
preHTML = '''
<!DOCTYPE html>
<html>
<title>Mapa Virtual</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<body>

<header class="w3-container w3-teal">
  <h1>Mapa Virtual</h1>
</header>

<div class="w3-container">
 '''


html = ""
for cidade in data:
    id = cidade['id']
    nome = cidade['nome']
    populacao = cidade['população']
    descricao = cidade['descrição']
    distrito = cidade['distrito']

    htmlRuaPag = f'<a class="" href="http://localhost:7777/{cidade["id"]}"'
    html += htmlRuaPag




    f = open('../TPC2/html/' + nome + '.html', 'w', encoding='utf-8')
    f.write(htmlRuaPag)
    f.close()
posHTML = '''
</div>

</body>
</html> 
'''

pagHTML = preHTML + html + posHTML

f = open('../TPC2/html/index.html', 'w')
f.write(pagHTML)
f.close()


