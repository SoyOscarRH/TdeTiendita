import React from "react"
import {HotKeys} from "react-hotkeys"
import {SentData} from "./CoolFunctions.js"
import ErrorModal from "./ErrorModal"


// =====================================================================
// ============      APP COMPONENTS        =============================
// =====================================================================
export default class EditProduct extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            ShowButton: false,
            ProductQuery: "", 
            ErrorMessage: "",
        }

        this.ErrorModal = React.createRef()
    }

    handleSendQuery() {
        SentData('/GetAllProductData', this.state.ProductQuery)
            .then(Results => {
                // ++++++++++++++++++++++++++++++++++++++++++++
                // ++++++          IF NOT FIND        +++++++++
                // ++++++++++++++++++++++++++++++++++++++++++++
                if (Results['Error'] != undefined) {

                    const ErrorMessage = (
                        <div>
                            <h5> Error con la Búsqueda de Productos </h5>
                            <br />
                            {Results['Error']}
                            <br />
                            <br />
                            <div>
                                Para salir de este diálogo puedes presionar la tecla 'esc' ó 'enter'
                            </div>
                        </div>
                    )

                    this.ErrorModal.current.ShowErrorMessage(ErrorMessage)
                    return
                }
                else {
                    console.log(Results)
                }
            })
            .catch(ErrorMessageFromServer => console.log(ErrorMessageFromServer))
    }

    render () {
        return (
            <div>
                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                {/*+++++++++          CARD CONTAINER        ++++++++++++*/}
                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                <HotKeys 
                        keyMap   = {{SendProductQuery: 'enter'}}
                        handlers = {{SendProductQuery: () => this.handleSendQuery(), }}>

                    <div className="container">
                        
                        <div className="row center-align">
                            <div className="card-panel grey lighten-4 col s12 m10 l10 offset-m1 offset-l1">
                                <h4 className="grey-text text-darken-2">
                                    <b>Ve y Modifica </b> información de un Producto
                                </h4>
                                <br />
                                <span className="grey-text">
                                    Busca por código de barras, por nombre o por descripción
                                </span>
                                <br />
                                <br />

                                <div className="row">
                                    <div className="input-field col s8 offset-s1">
                                        <input 
                                            id       = "ProductQueryInput" 
                                            type     = "text"
                                            value    = {this.state.ProductQuery}
                                            onChange = {(e) => this.setState({ProductQuery: e.target.value})}
                                        />
                                    </div>
                                    <div className="input-field col s2">
                                        <button 
                                            onClick ={() => this.handleSendQuery()}
                                            className = "waves-effect btn-floating waves-light green btn-flat">
                                            <i className="material-icons">
                                                search
                                            </i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </HotKeys>

                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                {/*+++++++++          ERROR MODAL           ++++++++++++*/}
                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                <ErrorModal ref={this.ErrorModal} />
            </div>
        )
    }
}

    