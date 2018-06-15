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
    host       = 'localhost',
    user       = 'root',
    password   = '123Tienda',
    db         = 'tdetiendita',
    autocommit = True
)

Session(WebApp)

#==========================================================================
#======================         ROUTES           ==========================
#==========================================================================

#++++++++++++++++++++++++++++++++++++++++++++
#+++++++          ROUT: INDEX        ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
@WebApp.route('/')
def index():
    
    User = session.get('UserName', None)

    if User:
        return render_template("index.html")
    else:
        return redirect(url_for('Login'))


#++++++++++++++++++++++++++++++++++++++++++++
#+++++++    DATA FROM BAR CODE       ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
@WebApp.route("/GetProductDataFromBarCode", methods=['POST'])
def GetProductDataFromBarCode():
    
    BarCode = request.json
    if BarCode == None: return json.dumps({"Error": f"Error con el código de barras"})

    with Connection.cursor(pymysql.cursors.DictCursor) as Cursor:
        Cursor.callproc("GetProductDataFromBarCode", (BarCode,) )
        Results = Cursor.fetchone()

        if Results == None: 
            return json.dumps({"Error": f"No hay producto con código de barras {BarCode}"})
        else:
            return json.dumps(Results)


#++++++++++++++++++++++++++++++++++++++++++++
#+++++    DATA FROM PRODUCT FROM ??    ++++++
#++++++++++++++++++++++++++++++++++++++++++++
@WebApp.route("/GetAllProductData", methods=['POST'])
def GetAllProductData():
    
    ProductQuery = request.json.replace(" ", "%")

    with Connection.cursor(pymysql.cursors.DictCursor) as Cursor:
        Cursor.callproc("GetAllProductDataExceptBarcode", (ProductQuery,) )
        ProductsData = Cursor.fetchall()

        if ProductsData == (): 
            return json.dumps({"Error": f"No hay producto con esas características"})
        
        RealData = []

        for ProductData in ProductsData:
            Cursor.callproc("GetAllBarcodesFromProductID", (ProductData['ID'],) )
            BarCodes = Cursor.fetchall()
            BarCodes = [Code['Barcode'] for Code in BarCodes]
            RealData.append({**ProductData, "BarCodes": BarCodes}) 

        return json.dumps(RealData)


#++++++++++++++++++++++++++++++++++++++++++++
#+++++++    DATA FROM BAR CODE       ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
@WebApp.route("/SaleProducts", methods=['POST'])
def SaleProducts():
    
    Data = request.json

    with Connection.cursor(pymysql.cursors.DictCursor) as Cursor:
        Cursor.callproc("CreateSale", (session['ID'],) )
        SaleID = Cursor.fetchone()['ID']

        with Connection.cursor(pymysql.cursors.DictCursor) as Cursor:
            for Sale in Data:

                Cursor.callproc("GetProductID", (Sale['Name'],) )
                ProductID = Cursor.fetchone()['ID']

                Cursor.callproc("AddUnitSale", (ProductID, Sale['Quantity'], SaleID) )


    return json.dumps({"Result": "All ok"}) 





#++++++++++++++++++++++++++++++++++++++++++++
#+++++++    SAVE DATA EDITS          ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
@WebApp.route("/SaveProductEdit", methods=['POST'])
def SaveProductEdit():
    
    Data = request.json

    if session['isAdmin'] == "0":
        return json.dumps({"Error": "No tienes permisos para editar productos"}) 

    with Connection.cursor(pymysql.cursors.DictCursor) as Cursor:
        if Data['NewCode'] != "":
            Cursor.callproc("ExistsBarcode", (Data['NewCode'], ) )
            
            if Cursor.fetchall() != ():
                return json.dumps({"Error": "Nuevo código de barras ya ocupado"}) 
            else:
                Cursor.callproc("AddNewCode", (Data['ID'], Data['NewCode']))
        
        Cursor.callproc("EditProductData", \
        (Data['ID'], Data['Name'], Data['Description'], Data['PriceOfSale'], Data['PriceAcquisition'], Data['CurrentQuantity']) ) 

    return json.dumps({"Result": "All ok"}) 



#++++++++++++++++++++++++++++++++++++++++++++
#+++++++    GET SALES FROM S DATES   ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
@WebApp.route("/GetSalesFromDates", methods=['POST'])
def GetSalesFromDates():
    
    Data = request.json

    print (Data)

    with Connection.cursor(pymysql.cursors.DictCursor) as Cursor:
        Cursor.callproc("GetSaleID", (session['ID'], Data['DateStart'], Data['DateEnd']) )

        Results = Cursor.fetchall()
        Sales = []

        for Result in Results:
            Cursor.callproc("GetUnitSale", (Result['ID'], ) )
            UnitSales = Cursor.fetchall()

            if UnitSales != (): Sales.append(UnitSales)

    return json.dumps(Sales)



#++++++++++++++++++++++++++++++++++++++++++++
#+++++++          LOGIN              ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
@WebApp.route('/login', methods = ['GET', 'POST'])
def Login():
    if request.method == 'POST':

        with Connection.cursor(pymysql.cursors.DictCursor) as Cursor:
            Cursor.callproc("LogIn", (request.form['UserName'], request.form['Password']) )
            Result = Cursor.fetchone()

            if (Result == None): return render_template("login.html")

            session['isAdmin'] = str(Result['isAdmin'])
            session['UserName'] = str(Result['Name'])
            session['ID'] = str(Result['ID'])

            return redirect(url_for('index'))
    
    else:
        return render_template("login.html")




#++++++++++++++++++++++++++++++++++++++++++++
#+++++++           LOG OUT           ++++++++
#++++++++++++++++++++++++++++++++++++++++++++
@WebApp.route('/logout')
def Logout():
    session.clear()
    return render_template("Logout.html")





#=============================================================
#================           MAIN        ======================
#=============================================================
if __name__ == "__main__":
    WebApp.run(debug=True)

