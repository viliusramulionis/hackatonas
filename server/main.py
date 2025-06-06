# save this as app.py
from flask import Flask
import sqlite3

con = sqlite3.connect("database.db", check_same_thread=False)
cur = con.cursor()

cur.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))")

app = Flask(__name__)

# CRUD
# CREATE - POST
# READ - GET
# UPDATE - PUT
# DELETE - DELETE

# VISI VARTOTOJAI
@app.route("/api/users", methods=['GET'])
def get_users():
    cur.execute("SELECT * FROM users")
    
    return cur.fetchall()

# NAUJO VARTOTOJO KURIMAS
@app.route("/api/users", methods=['POST'])
def new_user():
    cur.execute("INSERT INTO users (name, email, password) VALUES('Jonas', 'jonas@gmail.com', '123456');")
    con.commit()
    return "Hello, World!"
