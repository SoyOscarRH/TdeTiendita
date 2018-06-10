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
            Products: [],
        }

        this.ErrorModal = React.createRef()
    }

    handleSendQuery() {

        if (this.state.ProductQuery.trim().length < 2) {
            this.setState({Products: []})
            M.toast({html: 'No se pudo hacer una búsqueda con tan poca información'})
            document.getElementById("ProductQueryInput").focus()
            return
        }

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

                    this.setState({Products: []})

                    this.ErrorModal.current.ShowErrorMessage(
                        ErrorMessage, 
                        () => document.getElementById("ProductQueryInput").focus()
                    )
                    return
                }
                else {
                    this.setState({Products: Results})
                }
            })
            .catch(ErrorMessageFromServer => console.log(ErrorMessageFromServer))
    }

    componentDidMount() {
        const Elements = document.querySelectorAll('.collapsible');
        M.Collapsible.init(Elements, {accordion: true});
    }

    render () {

        const CollapsibleData = this.state.Products.map( (Product) => {

            return (
                <li key={Product.Name}>
                    <div className="collapsible-header">
                        <div className="left-align">
                            {Product.Name}
                        </div>
                        <div className="right-align">
                            <i className="material-icons">create</i>
                        </div>
                    </div>
                    <div className="collapsible-body left-align blue-grey-text text-darken-3">

                        <span style={{fontSize: '1.15rem'}}>
                            {Product.Description}
                        </span>

                        <ul>
                            <li>
                                <strong>Marca: </strong>
                                {Product.BrandName}
                            </li>
                            <li>
                                <strong>Proovedor: </strong>
                                {Product.ProviderName}
                            </li>
                        </ul>

                        <br />
                        <br />

                        <div className="right-align">
                            <div className="chip">
                                <strong>Precio Unitario de Venta: </strong>
                                {Product.PriceOfSale}
                            </div>
                            <div className="chip">
                                <strong>Precio Unitario de Adquisición: </strong>
                                {Product.PriceAcquisition}
                            </div>
                        </div>
                    </div>
                </li>
            )
        })

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
                            <div className="card-panel grey lighten-4 col s12">

                                <div className="container">
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
                                                autoFocus = {true} 
                                                id        = "ProductQueryInput" 
                                                type      = "text"
                                                value     = {this.state.ProductQuery}
                                                onChange  = {(e) => this.setState({ProductQuery: e.target.value})}
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

                                    <div className={this.state.Products.length === 0? " hide": ""}>
                                        <ul className={"collapsible"}>
                                            {CollapsibleData}
                                        </ul>
                                        <br />
                                        <br />
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

    