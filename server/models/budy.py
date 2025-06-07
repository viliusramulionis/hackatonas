from database import Database

from models.languages import Languages

Languages()
class Budy(Database) :
    # Kontruktorius
    def __init__(self) :
        # Inicijuojama Database klasė kurioje patalpinti pagalbiniai metodai ir konstruktorius su prisijungimu prie duomenų bazės
        super().__init__()

        # Sukuriama naudojama lentelė user
        self.cur.execute("CREATE TABLE IF NOT EXISTS budy (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), description VARCHAR(255), github_url VARCHAR(255), linkedin_url VARCHAR(255), location VARCHAR(255), format BOOLEAN, photo BYTE, user_id INT, slack_userid INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);")
      
    # Visų eilučių sugrąžinimas
    def get_rows(self) :
        self.cur.execute("SELECT * FROM budy;")
        return self.fetchall_as_dict()

    # Visų eilučių sugrąžinimas
    def get_rows(self) :
        self.cur.execute("SELECT * FROM budy;")
        return self.fetchall_as_dict()

    # Vienos eilutės sugrąžinimas
    def get_row(self, id) :
        self.cur.execute(f"SELECT * FROM budy WHERE id = {id};")
        return self.fetchone_as_dict()

    # Vienos eilutės pridėjimas
    def insert_row(self, data) :
        self.cur.execute(f"INSERT INTO budy (name, description, github_url, linkedin_url, location, format, photo, user_id, slack_userid, updated_at) VALUES('{data["name"]}', '{data["description"]}', '{data["github_url"]}', '{data["linkedin_url"]}', '{data["location"]}', '{data["format"]}', '{data["photo"]}', '{data["user_id"]}', '{data["slack_userid"]}', CURRENT_TIMESTAMP);")
        self.con.commit()
        return self

    # Eilutės atnaujinimas nurodant įrašo id ir modifikuotą informaciją
    def update_row(self, id, data) :
        self.cur.execute(f"UPDATE budy SET name = '{data["name"]}', description = '{data["description"]}', github_url = '{data["github_url"]}', linkedin_url = '{data["linkedin_url"]}', location = '{data["location"]}', format = '{data["format"]}', photo = '{data["photo"]}', user_id = '{data["user_id"]}', slack_userid = '{data["slack_userid"]}', updated_at = CURRENT_TIMESTAMP WHERE id = {id};")
        self.con.commit()
        return self

    # Eilutės ištrynimas nurodant įrašo id
    def delete_row(self, id):
        self.cur.execute(f"DELETE FROM budy WHERE id = {id};")
        return self