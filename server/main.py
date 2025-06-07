# save this as app.py
from flask import Flask, request, jsonify, make_response
import jwt
import datetime
from controllers.users import user
from flask_cors import CORS
from controllers.budy import budy
from controllers.interests import interests
from controllers.languages import languages

app = Flask(__name__)

# Nurodymas iš kur leidžiame priimti užklausas
# Pagal nutylėjimą apribojimų nėra
CORS(app)

# Kontrolerio priregistravimas prie bendros aplikacijos
app.register_blueprint(user, url_prefix='/api/users')

#budy priregistravimas
app.register_blueprint(budy, url_prefix='/api/budies')

#interests priregistravimas
app.register_blueprint(interests, url_prefix='/api/interests')

#languages priregistravimas
app.register_blueprint(languages, url_prefix='/api/languages')
