import json
import re


def filmesParser(filepath):
    db = []

    for line in open(filepath, "r", encoding="utf-8"):
        linha = json.loads(line)
        linha['id'] = linha['_id']["$oid"]
        linha.pop('_id')
        db.append(linha)

    return db


def atoresParserMovie(myDb):
    atores = dict()

    for linha in myDb:
        for ator in linha['cast']:
            if len(ator) > 2 and not re.match('[&%$€"]', ator):
                if ator in atores.keys():
                    atores[ator].append({linha["id"], linha["title"]})

                else:
                    atores[ator] = [{linha["id"], linha["title"]}]

    return atores


def atoresParser(atoresDic):
    atores = []

    for ator in atoresDic.keys():
        filmesAtor = []

        for (g1, g2) in atoresDic[ator]:
            if re.match(r"^5d[\d\w]*", g2):
                tmp = g1
                g1 = g2
                g2 = tmp

            filmesAtor.append({
                "idFilme": f"{g1}",
                "nomeFilme": f"{g2}"
            })

        atores.append({
            "nome": f"{ator}",
            "filmes": filmesAtor
        })

    return atores


def generoParserMovie(myDb):
    genero = dict()

    for linha in myDb:
        if "genres" in linha:
            for generoFilme in linha['genres']:
                if generoFilme in genero.keys():
                    genero[generoFilme].append({linha["id"], linha["title"]})
                else:
                    genero[generoFilme] = [{linha["id"], linha["title"]}]

    return genero


def generoParser(generoDic):
    generoL = []

    for generoKey in generoDic.keys():

        filmesGenero= []

        for (g1, g2) in generoDic[generoKey]:
            if re.match(r"^5d[\d\w]*", g2):
                tmp = g1
                g1 = g2
                g2 = tmp

            filmesGenero.append({
                "idFilme": f"{g1}",
                "nomeFilme": f"{g2}"
            })

        generoL.append({
            "genero": f"{generoKey}",
            "filmes": filmesGenero
        })

    return generoL


myDb = filmesParser("./filmes.json")
atores = atoresParserMovie(myDb)
atores = atoresParser(atores)
genero = generoParserMovie(myDb)
genero = generoParser(genero)

novaDB = {
    "filmes": myDb,
    "atores": atores,
    "genero": genero
}

f = open("./novoFilmes.json", "w", encoding="utf-8")
json.dump(novaDB, f, indent=4)
f.close()
