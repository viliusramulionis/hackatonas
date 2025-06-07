from database import Database

class User(Database) :
    # Kontruktorius
    def __init__(self) :
        # Inicijuojama Database klasė kurioje patalpinti pagalbiniai metodai ir konstruktorius su prisijungimu prie duomenų bazės
        super().__init__()

        # Sukuriama naudojama lentelė user
        self.cur.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255));")
        
        # Nurodymas neleisti registruoti vartotojų tokiu pačiu el. pašto adresu
        self.cur.execute("CREATE UNIQUE INDEX IF NOT EXISTS user_email ON users(email);")

    # Visų eilučių sugrąžinimas
    def get_rows(self) :
        self.cur.execute("SELECT * FROM users;")
        return self.fetchall_as_dict()

    # Vienos eilutės sugrąžinimas
    def get_row(self, id) :
        self.cur.execute(f"SELECT * FROM users WHERE id = {id};")
        return self.fetchone_as_dict()

    # Vienos eilutės pridėjimas
    def insert_row(self, data) :
        self.cur.execute(f"INSERT INTO users (name, email, password) VALUES('{data["name"]}', '{data["email"]}', {data["password"]});")
        self.con.commit()
        return self

    # Eilutės atnaujinimas nurodant įrašo id ir modifikuotą informaciją
    def update_row(self, id, data) :
        self.cur.execute(f"UPDATE users SET name = '{data["name"]}', email = '{data["email"]}', password = {data["password"]} WHERE id = {id};")
        return self

    # Eilutės ištrynimas nurodant įrašo id
    def delete_row(self, id):
        self.cur.execute(f"DELETE FROM users WHERE id = {id};")
        return self