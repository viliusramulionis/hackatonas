from database import Database

class Budy(Database) :
    # Kontruktorius
    def __init__(self) :
        # Inicijuojama Database klasė kurioje patalpinti pagalbiniai metodai ir konstruktorius su prisijungimu prie duomenų bazės
        super().__init__()

        # Sukuriama naudojama lentelė user
        self.cur.execute("CREATE TABLE IF NOT EXISTS budy (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), description VARCHAR(255), github_url VARCHAR(255), linkedin_url VARCHAR(255), location VARCHAR(255), format BOOLEAN, photo BYTE, user_id INT, slack_userid INT, create_at DATETIME, updated_at DATETIME);")
      
    # Visų eilučių sugrąžinimas
    def get_rows(self) :
        self.cur.execute("SELECT * FROM budy;")
        return self.fetchall_as_dict()
