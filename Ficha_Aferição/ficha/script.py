import json
import requests

# Função para ler dados de um arquivo JSON
def ler_dados(nome_arquivo):
    with open(nome_arquivo, 'r') as arquivo:
        dados = json.load(arquivo)
    return dados

# Função para enviar dados para a API
def enviar_dados_para_api(dados, url):
    try:
        response = requests.post(url, json=dados)
        if response.status_code == 201:
            print('Dados enviados com sucesso para a API!')
        else:
            print('Erro ao enviar dados para a API:', response.text)
    except Exception as e:
        print('Erro ao enviar dados para a API:', str(e))

# Caminho para os arquivos de dados
arquivos_dados = ['datasets/dataset-extra1.json', 'datasets/dataset-extra2.json', 'datasets/dataset-extra3.json']

# URL da sua API de dados
url_api = 'http://localhost:3000/pessoas'

# Iterar sobre os arquivos de dados e enviá-los para a API
for arquivo in arquivos_dados:
    dados = ler_dados(arquivo)
    enviar_dados_para_api(dados, url_api)
