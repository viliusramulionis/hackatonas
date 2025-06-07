from database import Database

class Languages(Database) :
    # Kontruktorius
    def __init__(self) :
        # Inicijuojama Database klasė kurioje patalpinti pagalbiniai metodai ir konstruktorius su prisijungimu prie duomenų bazės
        super().__init__()

        # Sukuriama naudojama lentelė user
        self.cur.execute("CREATE TABLE IF NOT EXISTS languages (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
       
 # Visų eilučių sugrąžinimas
    def get_rows(self) :
        self.cur.execute("SELECT * FROM languages;")
        return self.fetchall_as_dict()

 # Eilutės atnaujinimas nurodant įrašo id ir modifikuotą informaciją
    def update_row(self, id, data) :
        self.cur.execute(f"UPDATE languages SET title = '{data['title']}', updated_at = CURRENT_TIMESTAMP WHERE id = {id}")
        return self

# Eilutės ištrynimas nurodant įrašo id
    def delete_row(self, id):
        self.cur.execute(f"DELETE FROM languages WHERE id = {id}")
        return self