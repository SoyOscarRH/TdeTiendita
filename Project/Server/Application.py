#=============================================================
#================       SERVER       =========================
#=============================================================
from flask import Flask, render_template, request, json
import pymysql.cursors

#=============================================================
#=====     START AND CONFIGURE THE WEB APP     ===============
#=============================================================
WebApp = Flask(
            __name__, 
            static_folder = "../Static/Distribution", 
            template_folder = "../Static",
        )

WebApp.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
WebApp.config['TEMPLATES_AUTO_RELOAD'] = True


#=============================================================
#=====           DATABASE CONFIGURATION        ===============
#=============================================================
Connection = pymysql.connect(
    host     = 'localhost',
    user     = 'root',
    password = '123Tienda',
    db       = 'tdetiendita'
)


#=============================================================
#================           ROUTES      ======================
#=============================================================

#=================================================
#==========     ROUT: INDEX       ================
#=================================================
@WebApp.route("/")
def index():
    return render_template("index.html")

#=================================================
#==========     ROUT: HELLO       ================
#=================================================
@WebApp.route("/CheckPrice", methods=['POST'])
def CheckPrice():
    Name = request.json['BarCodeInput']

    with Connection.cursor() as Cursor:
        sql = "SELECT Price from Product WHERE CodeBar = %s"
        Cursor.execute(sql, Name)
        result = Cursor.fetchone()
        print(f"Result: {result}")

    return json.dumps({"Name": "All ok :D"})


#=============================================================
#================           MAIN        ======================
#=============================================================
if __name__ == "__main__":
    WebApp.run()

