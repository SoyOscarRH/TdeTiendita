
import React from "react"
import {HotKeys} from "react-hotkeys"
import {Link} from "react-router-dom"


// =====================================================================
// ============      APP COMPONENTS        =============================
// =====================================================================
export default class EditProduct extends React.Component {
    
    render () {
        return (
            <HotKeys 
                    keyMap   = {{ToogleBar: 'b'}}
                    handlers = {{ToogleBar: () => document.getElementById('ToogleSideBar').click()}}>
                <div className="container">
                    
                    <div className="row center-align">
                        <div className="card grey lighten-4 col s12 m10 l10 offset-m1 offset-l1">

                            <div className="card-image">
                                <a className = "btn-floating halfway-fab waves-effect waves-light red">
                                    <i className="material-icons">edit</i>
                                </a>
                            </div>

                            <div className="card-content">
                                <h4 className="grey-text text-darken-2"><b>Ve y Modifica </b> tu Información Personal</h4>
                                <br />
                                <span className="grey-text">
                                    Ve tu información, oprime el botón superior para editar
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </HotKeys>
        )
    }
}

    