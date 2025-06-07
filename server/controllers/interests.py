from flask import Blueprint, jsonify, request
from models.interests import Interets

interests = Blueprint('interests', __name__)
interests_model = Interets()

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
@interests.route("/", methods=['GET'])
def get_all():
    try :
        # Grąžinamas atgal tuple, pirma reikšmė JSON duomenys
        # Antra statuso kodas (Svarbu! nes pagal jį frontende bus orientuojamasi ar pavyko atlikti veiksmą)
        # Kiekviename route tikriname ar pavyko atlikti veiksmus ir grąžiname atitinkamas žinutes
        # Esant porekiui galime susigrąžinti klaidos kodą except bloke ir pagal jį siųsti atitinkamas žinutes
        return jsonify(interests_model.get_rows()), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko gauti duomenų, bandykite dar kartą."), 500
