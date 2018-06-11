import React from "react"
import {HotKeys} from "react-hotkeys"
import {Link} from "react-router-dom"


// =====================================================================
// ============      APP COMPONENTS        =============================
// =====================================================================
export default class Home extends React.Component {
    
    render () {
        return (
            <div className="container">
                
                <div className="row center-align">
                    <div className="card-panel light-green lighten-5 col s12 m10 l10 offset-m1 offset-l1">
                        <h4 className="grey-text text-darken-2">
                            <br/>
                            <b>Bienvenid@</b> de Nuevo
                            <br/>
                            <br/>
                        </h4>

                        <span className="grey-text" style={{fontSize: "1.15rem"}}>
                            Bienvenid@ al Sistema {UserName}
                            <br />
                            <br />

                            Estas ahora mismo en el modo de 
                            <br />
                            <br />
                            <br />
                        </span>
                    </div>
                </div>

                <div className="row center-align">
                    <div className="card-panel grey lighten-4 col s12 m10 l10 offset-m1 offset-l1">
                        <h4 className="grey-text text-darken-2">
                            <br />
                            <b>Menú</b> de Opciones
                            <br />
                        </h4>

                        <span className="grey-text" style={{fontSize: "1.15rem"}}>
                            Selecciona cual es la opción que necesites
                            <br />
                            <br />
                        </span>

                        <div className="row">
                            <Link 
                                className = "waves-effect waves-light btn-large light-green lighten-1"
                                to        = '/SalesPage'>
                                Página de Ventas
                            </Link>

                            <br />
                            <br />
                            
                            <Link 
                                className = "waves-effect waves-light btn-large blue lighten-1"
                                to        = '/EditProduct'>
                                Editar Productos
                            </Link>
                        </div> 
                    </div>
                </div>

            </div>
        )
    }
}
