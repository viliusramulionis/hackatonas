from flask import Blueprint, jsonify, request
from models.interests import Interests

interest = Blueprint('interest', __name__)
interest_model = Interests()

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
@interest.route("/", methods=['GET'])
def get_all():
    try :
        # Grąžinamas atgal tuple, pirma reikšmė JSON duomenys
        # Antra statuso kodas (Svarbu! nes pagal jį frontende bus orientuojamasi ar pavyko atlikti veiksmą)
        # Kiekviename route tikriname ar pavyko atlikti veiksmus ir grąžiname atitinkamas žinutes
        # Esant porekiui galime susigrąžinti klaidos kodą except bloke ir pagal jį siųsti atitinkamas žinutes
        return jsonify(interest_model.get_rows()), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko gauti duomenų, bandykite dar kartą."), 500

# VIENAS VARTOTOJAS (PRIIMAMAS PARAMETRAS ID)
@interest.route("/<int:id>", methods=['GET'])
def get_one(id):
    try :
        return jsonify(interest_model.get_row(id)), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko gauti duomenų, bandykite dar kartą."), 500

# NAUJO VARTOTOJO KURIMAS
@interest.route("/", methods=['POST'])
def create():
    try :
        
        interest_model.insert_row(request.form)
        return jsonify("Jė jė!!! Naujas vartotojas sėkmingai sukurtas."), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko užregistruoti vartotojo, įvyko klaida."), 500

# VARTOTOJO REDAGAVIMAS
@interest.route("/<int:id>", methods=['PUT'])
def update(id):
    try :
        interest_model.update_row(id, request.form)
        return jsonify("Jė jė!!! Vartotojo duomenys sėkmingai atnaujinti."), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko užregistruoti vartotojo, įvyko klaida."), 500

# VARTOTOJO IŠTRYNIMAS
@interest.route("/<int:id>", methods=['DELETE'])
def delete(id):
    try :
        interest_model.delete_row(id)
        return jsonify("Vartotojas sėkmingai ištrintas!."), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko ištrinti vartotojo, įvyko klaida."), 500