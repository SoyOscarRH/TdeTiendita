#|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
#|||||||||||||||||||||||           SALES PAGE       ||||||||||||||||||||||||||||||||||||||||
#|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

from flask import Flask, render_template, request, json, session, redirect, url_for
import pymysql.cursors
from flask_session import Session

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

WebApp.config['SESSION_USE_SIGNER'] = True
WebApp.config['SESSION_FILE_THRESHOLD'] = 500
WebApp.config['SESSION_FILE_DIR'] = "FlaskSessions"
WebApp.config['SESSION_TYPE'] = 'filesystem'
WebApp.config['PERMANENT_SESSION_LIFETIME'] = 86400

WebApp.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
WebApp.config['TEMPLATES_AUTO_RELOAD'] = True
WebApp.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


#++++++++++++++++++++++++++++++++++++++++++++
#+++++++     DATABASE CONFIGURATION  ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
Connection = pymysql.connect(
    host     = 'localhost',
    user     = 'root',
    password = '123Tienda',
    db       = 'tdetiendita'
)

Session(WebApp)

#==========================================================================
#======================         ROUTES           ==========================
#==========================================================================


#++++++++++++++++++++++++++++++++++++++++++++
#+++++++    DATA FROM BAR CODE       ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
@WebApp.route("/DataFromBarCode", methods=['POST'])
def DataFromBarCode():
    
    BarCode = request.json.get('BarCodeInput')
    if BarCode == None: return json.dumps({"Error": f"Error con el código de barras"})

    with Connection.cursor() as Cursor:
        SQLQuery = "SELECT PriceOfSale, Name from Product WHERE CodeBar = %s;"
        Cursor.execute(SQLQuery, (BarCode,) )
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

    return json.dumps({"Result": "HWebAppy"}) 


#++++++++++++++++++++++++++++++++++++++++++++
#+++++++          ROUT: INDEX        ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
@WebApp.route('/')
def index():
    
    User = session.get('UserName', None)

    print(session)

    if User:
        return render_template("index.html")
    else:
        return redirect(url_for('Login'))


@WebApp.route('/login', methods = ['GET', 'POST'])
def Login():
    if request.method == 'POST':
        print(request.form)
        session['UserName'] = str(request.form['UserName'])
        print(str(session) + "session en login")
        return redirect(url_for('index'))
    else:
        return render_template("Login.html")

@WebApp.route('/logout')
def Logout():
    session.clear()
    return "listo"



#=============================================================
#================           MAIN        ======================
#=============================================================
if __name__ == "__main__":
    WebApp.run()

