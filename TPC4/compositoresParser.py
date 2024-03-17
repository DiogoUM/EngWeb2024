import json


def compositoresParser():
    file = open("compositores.json", "r", encoding="utf-8").read()
    dados = json.loads(file)

    db = []
    for key in dados.values():
        for ola in key:
            if len(ola) == 6:
                db.append(ola)
    return db


def periodoParser(db):
    periodos = set()
    for compositor in db:
        if "periodo" in compositor:
            if len(compositor) == 6:
                periodos.add(compositor["periodo"])

    print(periodos)
    return periodos


def periodo2Parser(db):
    lista = []

    for compositor in db:
        lista.append({"periodo": f'{compositor}'})

    return lista


db = compositoresParser()
periodoDb = periodoParser(db)
periodoDb = periodo2Parser(periodoDb)
novaDB = {
    "compositores": db,
    "periodos": periodoDb
}

f = open("./novoCompositores.json", "w", encoding="utf-8")
json.dump(novaDB, f, indent=4)
f.close()