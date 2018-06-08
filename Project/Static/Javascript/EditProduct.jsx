import React from "react"
import {HotKeys} from "react-hotkeys"
import {SentData} from "./CoolFunctions.js"


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

    }

    /* 
     * Show a Modal and call CallbackOnClose when close 
     */
    ShowErrorMessage(Message, CallbackOnClose) {
        this.setState({ErrorMessage: Message})
        const InstanceModal = M.Modal.getInstance(document.getElementById('ErrorModal'))
        InstanceModal.options.onCloseEnd = CallbackOnClose
        InstanceModal.open()
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

                    this.ShowErrorMessage(ErrorMessage)
                    return
                }
                else {
                    console.log(Results)
                }
            })
            .catch(ErrorMessageFromServer => console.log(ErrorMessageFromServer))
    }

    componentDidMount() {
        document.getElementById('ProductQueryInput').focus()
        M.Modal.init(document.getElementById('ErrorModal'), {dismissible: true, inDuration: 80, outDuration: 80})
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
                <HotKeys 
                    keyMap   = {{CloseModal: 'enter'}}
                    handlers = {{CloseModal: (e) => {InstanceModal = M.Modal.getInstance(document.getElementById('ErrorModal')).close()}}}>
                    
                    <div id="ErrorModal" className="modal modal-fixed-footer" style={{width: '70%'}} >
                        <div className="modal-content">
                            <h4>Error</h4>
                            {this.state.ErrorMessage}
                        </div>
                        <div className="modal-footer">
                            <a className="btn-flat modal-close waves-effect waves-red red lighten-2">
                                <span className="white-text">Salir</span>
                            </a>
                        </div>
                    </div>

                </HotKeys>
            </div>
        )
    }
}

    