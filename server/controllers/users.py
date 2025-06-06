# Blueprint klasė yra reikalinga norint užregistruoti route'us prie bendros Flask aplikacijos
# jsonify skirtas nurodyti turinio tipą
# request reikalingas paimti užklausos informaciją (aka tai kas yra persiunčiama pvz prisijungimo info)
from flask import Blueprint, jsonify, request, make_response
from models.user import User
import jwt
import datetime

user = Blueprint('users', __name__)
user_model = User()

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
@user.route("/", methods=['GET'])
def get_all():
    try :
        # Grąžinamas atgal tuple, pirma reikšmė JSON duomenys
        # Antra statuso kodas (Svarbu! nes pagal jį frontende bus orientuojamasi ar pavyko atlikti veiksmą)
        # Kiekviename route tikriname ar pavyko atlikti veiksmus ir grąžiname atitinkamas žinutes
        # Esant porekiui galime susigrąžinti klaidos kodą except bloke ir pagal jį siųsti atitinkamas žinutes
        return jsonify(user_model.get_rows()), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko gauti duomenų, bandykite dar kartą."), 500

# VIENAS VARTOTOJAS (PRIIMAMAS PARAMETRAS ID)
@user.route("/<int:id>", methods=['GET'])
def get_one(id):
    try :
        return jsonify(user_model.get_row(id)), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko gauti duomenų, bandykite dar kartą."), 500

# NAUJO VARTOTOJO KURIMAS
@user.route("/", methods=['POST'])
def create():
    try :
        
        user_model.insert_row(request.form)
        return jsonify("Jė jė!!! Naujas vartotojas sėkmingai sukurtas."), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko užregistruoti vartotojo, įvyko klaida."), 500

# VARTOTOJO REDAGAVIMAS
@user.route("/<int:id>", methods=['PUT'])
def update(id):
    try :
        user_model.update_row(id, request.form)
        return jsonify("Jė jė!!! Vartotojo duomenys sėkmingai atnaujinti."), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko užregistruoti vartotojo, įvyko klaida."), 500

# VARTOTOJO IŠTRYNIMAS
@user.route("/<int:id>", methods=['DELETE'])
def delete(id):
    try :
        user_model.delete_row(id)
        return jsonify("Vartotojas sėkmingai ištrintas!."), 200
    except :
        return jsonify("Atsiprašome, tačiau nepavyko ištrinti vartotojo, įvyko klaida."), 500

@user.route("/login", methods=['POST'])
def login():
    secret_key = 'very very secret key'
    auth = request.form

    

    if auth :
        try :
            if user_model.get_user_for_login(auth["email"], auth["password"]) :
                token = jwt.encode({
                    'user': 1,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                }, secret_key, algorithm="HS256")
                
                return jsonify({'token': token})
            else :
                return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm ="Login Required"'})
        except :
            return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm ="Login Required"'})

    return make_response('Could not Verify', 401, {'WWW-Authenticate': 'Basic realm ="Login Required"'})
