from database import Database

class Languages(Database) :
    # Kontruktorius
    def __init__(self) :
        # Inicijuojama Database klasė kurioje patalpinti pagalbiniai metodai ir konstruktorius su prisijungimu prie duomenų bazės
        super().__init__()

        # Sukuriama naudojama lentelė user
        self.cur.execute("CREATE TABLE IF NOT EXISTS languages (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
        self.cur.execute("INSERT INTO languages (title) VALUES('Python')")
        self.cur.execute("INSERT INTO languages (title) VALUES('Javascript')")
        self.cur.execute("INSERT INTO languages (title) VALUES('C++')")
        self.cur.execute("INSERT INTO languages (title) VALUES('Java')")
        self.cur.execute("INSERT INTO languages (title) VALUES('Go')")
        self.cur.execute("INSERT INTO languages (title) VALUES('Ruby')")
        self.cur.execute("INSERT INTO languages (title) VALUES('SQL')")
        self.cur.execute("INSERT INTO languages (title) VALUES('Other')")
        self.con.commit()


 # Visų eilučių sugrąžinimas
    def get_rows(self) :
        self.cur.execute("SELECT * FROM languages;")
        return self.fetchall_as_dict()

     


