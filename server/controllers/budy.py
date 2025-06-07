from flask import Blueprint, jsonify, request
from models.budy import Budy

budy = Blueprint('buddies', __name__)
budy_model = Budy()

# Prie kiekvieno route'o nurodome kelią ir http metodą.
# Pagal pasirinktą veiksmo tipą priskiriame atitinkamą metodą pagal REST principą:

# CRUD
# CREATE - POST
# READ - GET
# UPDATE - PUT 
# DELETE - DELETE

# Vykdant redagavimo veiksmus galima ir modifikacija:
# PUT metodas naudojamas kai atnaujinamos kelių stulpelių reikšmės
# PATCH - kuomet atnaujinama tik vieno stulpelio reikšmė

# VISI VARTOTOJAI
@budy.route("/", methods=['GET'])
def get_all():
    try :
        # Grąžinamas atgal tuple, pirma reikšmė JSON duomenys
        # Antra statuso kodas (Svarbu! nes pagal jį frontende bus orientuojamasi ar pavyko atlikti veiksmą)
        # Kiekviename route tikriname ar pavyko atlikti veiksmus ir grąžiname atitinkamas žinutes
        # Esant porekiui galime susigrąžinti klaidos kodą except bloke ir pagal jį siųsti atitinkamas žinutes
        return jsonify(budy_model.get_rows()), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko gauti duomenų, bandykite dar kartą."), 500

# VIENAS VARTOTOJAS (PRIIMAMAS PARAMETRAS ID)
@budy.route("/<int:id>", methods=['GET'])
def get_one(id):
    try :
        return jsonify(budy_model.get_row(id)), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko gauti duomenų, bandykite dar kartą."), 500

# NAUJO VARTOTOJO KURIMAS
@budy.route("/", methods=['POST'])
def create():
    try :
        budy_model.insert_row(request.form)
        return jsonify("Jė jė!!! Naujas vartotojas sėkmingai sukurtas."), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko užregistruoti vartotojo, įvyko klaida."), 500

# VARTOTOJO REDAGAVIMAS
@budy.route("/<int:id>", methods=['PUT'])
def update(id):
    try :
        budy_model.update_row(id, request.form)
        return jsonify("Jė jė!!! Vartotojo duomenys sėkmingai atnaujinti."), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko užregistruoti vartotojo, įvyko klaida."), 500

# VARTOTOJO IŠTRYNIMAS
@budy.route("/<int:id>", methods=['DELETE'])
def delete(id):
    try :
        budy_model.delete_row(id)
        return jsonify("Vartotojas sėkmingai ištrintas!."), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko ištrinti vartotojo, įvyko klaida."), 500