# save this as app.py
from flask import Flask
from controllers.users import user
from flask_cors import CORS

from models.budy import Budy
from models.budy_interests import Budy_interets
from models.interests import Interets

Budy()
Budy_interets()
Interets()

app = Flask(__name__)

# Nurodymas iš kur leidžiame priimti užklausas
# Pagal nutylėjimą apribojimų nėra
CORS(app)

# Kontrolerio priregistravimas prie bendros aplikacijos
app.register_blueprint(user, url_prefix='/api/users')