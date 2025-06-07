from database import Database

class Budy_interests(Database) :
    # Kontruktorius
    def __init__(self) :
        # Inicijuojama Database klasė kurioje patalpinti pagalbiniai metodai ir konstruktorius su prisijungimu prie duomenų bazės
        super().__init__()

        # Sukuriama naudojama lentelė user
        self.cur.execute("CREATE TABLE IF NOT EXISTS budy_interests (id INTEGER PRIMARY KEY AUTOINCREMENT, title INTEGER, priority INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")


    # Vienos eilutės pridėjimas
    def insert_row(self, data) :
        self.cur.execute(
            f"INSERT INTO budy_interests (interest_id, budy_id) VALUES('{data['interest_id']}', '{data['budy_id']}')")
        self.con.commit()
        return self
    