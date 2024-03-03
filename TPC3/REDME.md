# TPC3: Filmes

## Autor:
- a94877
- Diogo Cardoso Ferreira

## Resumo

Para a realização deste trabalho, inicialmente foi necessário fazer uma transformação no
*data set* fornecido ( com o *script filmesParser.py*), para que fosse possivel aceder aos dados 
de uma forma rápida e organizada de maneira a ficar com a forma desejada.

Posteriomente foi desenvolvido um servidor a correr na porta 7777 (*server.js*) que faz requisições HTTP
a um outro servidor *json* (que corre na porta 3000) para obter os dados sobre os filmes, atores e generos.

Foi ainda desenvolvida uma página html (*index.html*) que corresponde à página principal que permite aceder às diversas
listas disponiveis.

No ficheiro *server.js* foram também desenvolvidas as funções que correspondem a geração das
páginas html necessárias do seerviço.

