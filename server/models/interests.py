from database import Database

class Interests(Database):

    def __init__(self):

        super().__init__()
        self.cur.execute("CREATE TABLE IF NOT EXISTS interests (id INTEGER PRIMARY KEY AUTOINCREMENT, title INTEGER, priority INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
        self.cur.execute("INSERT INTO interests (title, priority) VALUES('Help others', 1)")
        self.cur.execute("INSERT INTO interests (title, priority) VALUES('Get Help', 2)")
        self.cur.execute("INSERT INTO interests (title, priority) VALUES('Make friends', 3)")
        self.con.commit()

 # Visų eilučių sugrąžinimas
    def get_rows(self) :
        self.cur.execute("SELECT * FROM interests;")
        return self.fetchall_as_dict()
    
# Eilutės atnaujinimas nurodant įrašo id ir modifikuotą informaciją
    def insert_row(self, id, data) :
        self.cur.execute(f"UPDATE interests SET title = '{data["title"]}', priority = '{data["priority"]}', updated_at = CURRENT_TIMESTAMP WHERE id = {id}")
        return self
    