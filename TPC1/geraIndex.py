import xml.etree.ElementTree as et
import os
import pdb 

path = "./TPC1/MapaRuas-materialBase/texto/"
ficheiros = os.listdir(path)

dic = {}

for ficheiro in ficheiros:
    filename = path + ficheiro
    arquivo = et.parse(filename)
    rua = arquivo.getroot()
    meta = rua.find('meta')
    nr = meta.find('número').text
    dic[nr] = arquivo

#gera a página inicial
preHTML = '''
<!DOCTYPE html>
<html>
<title>Ruas de Braga</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<body>

<div class="w3-container">
  <div class="w3-container w3-teal"> <h2>Ruas de Braga</h2> </div>
  <p>Coloque o rato sobre "RUAS" e pesquise/selecione uma rua para obter informação mais detalhada sobre a mesma.</p>
  <div class="w3-dropdown-hover">
    <button class="w3-button w3-teal w3-round-large">RUAS</button>
    <div class="w3-dropdown-content w3-bar-block w3-card w3-light-grey" id="myDIV">
      <input class="w3-input w3-padding" type="text" placeholder="Pesquisa..." id="myInput" onkeyup="myFunction()">
'''

html = ""
for ruaID, ruaObj in dic.items():
    rua = ruaObj.getroot()
    meta = rua.find('meta')
    nome = meta.find('nome').text
    ruahtml = f'      <a class="w3-bar-item w3-button" href="./TPC1/html/{nome}.html">{ruaID}. {nome}</a>'
    html += ruahtml

    #cria as páginas de cada rua
    f = open('./TPC1/html/'+ nome +'.html','w')

    corpo = rua.find('corpo')

    htmlRuaPag = f'''
    
    '''
    f.write(htmlRuaPag)
    f.close()


posHTML = '''
    </div>
  </div>
</div>

<script>
// Função para encontrar a Rua
function myFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDIV");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
</script>

</body>
</html>
'''

pagHTML = preHTML + html + posHTML

f = open('./TPC1/html/index.html','w')
f.write(pagHTML)
f.close()

