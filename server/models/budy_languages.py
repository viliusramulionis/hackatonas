from database import Database

class Budy_languages(Database) :
    # Kontruktorius
    def __init__(self) :
        # Inicijuojama Database klasė kurioje patalpinti pagalbiniai metodai ir konstruktorius su prisijungimu prie duomenų bazės
        super().__init__()

        # Sukuriama naudojama lentelė user
        self.cur.execute("CREATE TABLE IF NOT EXISTS budy_languages (id INTEGER PRIMARY KEY AUTOINCREMENT, language_id INTEGER, budy_id INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")

    # Vienos eilutės pridėjimas
    def insert_row(self, data) :
        self.cur.execute(
            f"INSERT INTO budy_languages (language_id, budy_id) VALUES('{data['language_id']}', '{data['budy_id']}')")
        self.con.commit()
        return self
