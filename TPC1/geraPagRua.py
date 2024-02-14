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

for idRua, objRua in dic.items():
    
