from database import Database

class Budy_interets(Database):

    def __init__(self):

        super().__init__()
        self.cur.execute("CREATE TABLE IF NOT EXIST budy_interests (id INTEGER PRIMARY KEY AUTOINCREMENT, interest_id INTEGER, budy_id INTEGER, created_at DATETIME, updated DATETIME);")
    