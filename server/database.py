import sqlite3

class Database() :
    db_file = "database.db"

    # Konstrutoriaus iniciavimas atliekant šiuos veiksmus:
    # - Sukuriamas prisijungimas prie duomenų bazės
    def __init__(self) :
        self.con = sqlite3.connect(self.db_file, check_same_thread=False)
        self.cur = self.con.cursor()
    
    # Konvertuoja fetchall() metodo rezultatą iš tuple į dictionary 
    def fetchall_as_dict(self):
        columns = [col[0] for col in self.cur.description]
        return [dict(zip(columns, row)) for row in self.cur.fetchall()]
    
    # Kovertuoja fetchone() metodo rezultątą iš tuple į dictionary
    def fetchone_as_dict(self):
        row = self.cur.fetchone()
        if row is None:
            return None
        columns = [col[0] for col in self.cur.description]
        return dict(zip(columns, row))

    def __del__(self) :
        self.con.close()