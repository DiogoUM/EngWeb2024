import xml.etree.ElementTree as et
import os
import pdb 

def extrair_texto(elemento):
    texto = elemento.text or ''
    for filho in elemento:
        texto += ' '
        texto += extrair_texto(filho)
    texto += elemento.tail or ''
    return texto.strip()

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
  <br>
  <p><b>Coloque o rato sobre "RUAS" e pesquise/selecione uma rua para obter informação mais detalhada sobre a mesma.</b></p>
  <br>
  <div class="w3-dropdown-hover w3-block">
    <button class="w3-button w3-block w3-teal w3-round-large" width="1024">RUAS</button>
    <div class="w3-dropdown-content w3-bar-block w3-card w3-light-grey" id="myDIV">
      <input class="w3-input w3-padding" type="text" placeholder="Pesquisa..." id="myInput" onkeyup="myFunction()">
'''

html = ""
for ruaID, ruaObj in dic.items():
    rua = ruaObj.getroot()
    meta = rua.find('meta')
    nome = meta.find('nome').text
    #imgs = {}
    paragrafos = ""
    casas = {}

    #adiciona a referêmcia à página princimal
    ruahtml = f'      <a class="w3-bar-item w3-button" href="./{nome}.html">{ruaID}. {nome}</a>'
    html += ruahtml

    #daqui para baixo constroi cada uma das páginas de forma individual

    #aceder ao corpo do XML da rua
    corpo = rua.find('corpo')


    '''
    lcasas = corpo.find('lista-casas')

    for casa in lcasas.findall('casa'):
        nr = int(casa.find('número').text)
        enf = casa.find('enfiteuta').text
        fo = casa.find('foro').text
        descricao = casa.find('desc').text
        casa[nr] = (enf,fo,descricao)
    '''
    
    html1 = f'''
    <!DOCTYPE html>
    <html>
    <title>{nome}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    '''
    html2 = r'''
    <style>
    .mySlides {display:none}
    </style>
    '''

    for paragrafo in corpo.findall('.//para'):
        para_text = extrair_texto(paragrafo)
        paragrafos += para_text

    html3 = f'''
    <body>

    <div class="w3-container">
      <h2>{nome}</h2>
      <p>{paragrafos}</p>
    </div>

    <div class="w3-content" style="max-width:800px">
    '''

    #guardar as informações das imagens no dicionario 'imgs'
    html4 = ""
    html6 = ""
    count = 1
    for imagem in corpo.findall('figura'):
        id = imagem.attrib
        i = imagem.find('imagem')
        dicPath = i.attrib
        cam = dicPath['path']
        desc = imagem.find('legenda').text
        newPath = cam[2:]
        #TODO alterar path: absoluto -> relativo
        html4 += f'''
        <figure class="mySlides">
          <img src="D:/EW/EngWeb2024/TPC1/MapaRuas-materialBase{newPath}" alt="{desc}" style="width:100%"/>
          <figcaption>{desc}</figcaption>
        </figure>
        '''
        html6 += f'<button class="w3-button demo" onclick="currentDiv(1)">{count}</button>'
        count += 1


    html5 = r'''
    </div>

    <div class="w3-center">
      <div class="w3-section">
        <button class="w3-button w3-light-grey" onclick="plusDivs(-1)">❮ Prev</button>
        <button class="w3-button w3-light-grey" onclick="plusDivs(1)">Next ❯</button>
      </div>
      '''
    
    html7 = r'''
    </div>

    <script>
    var slideIndex = 1;
    showDivs(slideIndex);

    function plusDivs(n) {
      showDivs(slideIndex += n);
    }

    function currentDiv(n) {
      showDivs(slideIndex = n);
    }

    function showDivs(n) {
      var i;
      var x = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("demo");
      if (n > x.length) {slideIndex = 1}    
      if (n < 1) {slideIndex = x.length}
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-red", "");
      }
      x[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " w3-red";
    }
    </script>

    </body>
    </html>
    '''

    htmlRuaPag = html1+html2+html3+html4+html5+html6+html7

    f = open('./TPC1/html/'+ nome +'.html','w', encoding='utf-8')
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

