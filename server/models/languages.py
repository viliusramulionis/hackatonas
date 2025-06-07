from database import Database

class Languages(Database) :
    # Kontruktorius
    def __init__(self) :
        # Inicijuojama Database klasė kurioje patalpinti pagalbiniai metodai ir konstruktorius su prisijungimu prie duomenų bazės
        super().__init__()

        # Sukuriama naudojama lentelė user
        self.cur.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);")
       
 # Visų eilučių sugrąžinimas
    def get_rows(self) :
        self.cur.execute("SELECT * FROM users;")
        return self.fetchall_as_dict()