# save this as app.py
from flask import Flask
from controllers.users import user
from flask_cors import CORS
from controllers.budy import budy

app = Flask(__name__)

# Nurodymas iš kur leidžiame priimti užklausas
# Pagal nutylėjimą apribojimų nėra
CORS(app)

# Kontrolerio priregistravimas prie bendros aplikacijos
app.register_blueprint(user, url_prefix='/api/users')

#budy priregistravimas
app.register_blueprint(budy, url_prefix='/api/budies')