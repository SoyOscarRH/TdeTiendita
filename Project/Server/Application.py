#|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
#|||||||||||||||||||||||           SALES PAGE       ||||||||||||||||||||||||||||||||||||||||
#|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
from flask import Flask, render_template, request, json
import pymysql.cursors

#==========================================================================
#=================     START AND CONFIGURE THE WEB APP     ================
#==========================================================================

#++++++++++++++++++++++++++++++++++++++++++++
#+++++++          FLASK APP          ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
WebApp = Flask(
            __name__, 
            static_folder = "../Static/Distribution", 
            template_folder = "../Static",
        )

WebApp.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
WebApp.config['TEMPLATES_AUTO_RELOAD'] = True


#++++++++++++++++++++++++++++++++++++++++++++
#+++++++     DATABASE CONFIGURATION  ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
Connection = pymysql.connect(
    host     = 'localhost',
    user     = 'root',
    password = '123Tienda',
    db       = 'tdetiendita'
)


#==========================================================================
#======================         ROUTES           ==========================
#==========================================================================

#++++++++++++++++++++++++++++++++++++++++++++
#+++++++          ROUT: INDEX        ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
@WebApp.route("/")
def index():
    return render_template("index.html")


#++++++++++++++++++++++++++++++++++++++++++++
#+++++++    DATA FROM BAR CODE       ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
@WebApp.route("/DataFromBarCode", methods=['POST'])
def DataFromBarCode():
    
    BarCode = request.json.get('BarCodeInput')
    if BarCode == None: return json.dumps({"Error": f"Error con el código de barras"})

    with Connection.cursor() as Cursor:
        SQLQuery = "SELECT PriceOfSale, Name from Product WHERE CodeBar = %s"
        Cursor.execute(SQLQuery, BarCode)
        Results = Cursor.fetchone()

        if Results == None: 
            return json.dumps({"Error": f"No hay producto con código de barras {BarCode}"})
        else:
            return json.dumps({"UnitPrice": Results[0], "BarCode": BarCode, "Name": Results[1]})


#++++++++++++++++++++++++++++++++++++++++++++
#+++++++    DATA FROM BAR CODE       ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
@WebApp.route("/SaleProducts", methods=['POST'])
def SaleProducts():
    
    Data = request.json
    print(Data)

    return json.dumps({"Result": "Happy"}) 







#=============================================================
#================           MAIN        ======================
#=============================================================
if __name__ == "__main__":
    WebApp.run()

