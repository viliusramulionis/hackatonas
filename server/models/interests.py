from database import Database

class Interets(Database):

    def __init__(self):

        super().__init__()
        self.cur.execute("CREATE TABLE IF NOT EXISTS interests (id INTEGER PRIMARY KEY AUTOINCREMENT, title INTEGER, priority INTEGER, created_at DATETIME, updated DATETIME)")