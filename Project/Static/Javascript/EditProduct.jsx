import React from "react"
import {HotKeys} from "react-hotkeys"
import {SentData, ShowCuteMode, CapitalizeFirstLetter} from "./CoolFunctions.js"
import ErrorModal from "./ErrorModal"


// =====================================================================
// ============      APP COMPONENTS        =============================
// =====================================================================
export default class EditProduct extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            ErrorMessage: "",
            Products: [],
            ProductEditing: {},
        }

        this.ProductQuery = React.createRef()
        this.ErrorModal = React.createRef()
    }

    handleSendQuery() {
        const ProductQuery = this.ProductQuery.current.value

        if (ProductQuery.trim().length < 2) {
            this.setState({Products: []})
            M.toast({html: 'No se pudo hacer una búsqueda con tan poca información'})
            document.getElementById("ProductQueryInput").focus()
            return
        }

        SentData('/GetAllProductData', ProductQuery)
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

                    this.ErrorModal.current.ShowErrorMessage(ErrorMessage)
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
                        <div className="left-align" style={{fontSize: '1.2rem'}}>
                            {ShowCuteMode(Product.Name)}
                        </div>
                    </div>
                    <div className="collapsible-body blue-grey-text text-darken-3">

                        <div className="row">
                            <div className="col s10 m8 l8">
                                <div className="left-align">
                                    <span style={{fontSize: '1.15rem'}}>
                                        {CapitalizeFirstLetter(Product.Description)}
                                    </span>

                                    <br /> 
                                    <br /> 

                                    <ul>
                                        <li>
                                            <strong>Marca: </strong>
                                            {ShowCuteMode(Product.BrandName)}
                                        </li>
                                        <li>
                                            <strong>Proovedor: </strong>
                                            {ShowCuteMode(Product.ProviderName)}
                                        </li>
                                        <li>
                                            <strong>Códigos de Barra: </strong>
                                            <ul className="browser-default">
                                            {Product.BarCodes.map(Code => (<li key={Code}>{Code}</li>))}
                                            </ul>
                                        </li>
                                    </ul>

                                    <br />
                                    <br />
                                </div>
                                <div className="right-align">
                                    <div className="chip">
                                        <strong>Precio Unitario de Venta: </strong>$
                                        {Product.PriceOfSale}
                                    </div>
                                    <div className="chip">
                                        <strong>Precio Unitario de Adquisición: </strong>$
                                        {Product.PriceAcquisition}
                                    </div>
                                </div>
                            </div>
                            <div className="col s4 m2 l2">
                                <a 
                                    className="waves-effect waves-light btn-large red lighten-2"
                                    onClick={() => {this.setState({Products: [], ProductEditing: Product})}}
                                >
                                    Editar
                                </a>                            
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
                                            ref       = {this.ProductQuery}
                                            style     = {{fontSize: "1.7rem"}}
                                        />
                                    </div>
                                    <div className="input-field col s2">
                                        <button 
                                            onClick ={() => this.handleSendQuery()}
                                            className = "waves-effect btn-floating btn-large waves-light green btn-flat">
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

                </HotKeys>

                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                {/*+++++++++          ERROR MODAL           ++++++++++++*/}
                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                {Object.keys(this.state.ProductEditing).length !== 0 && <ReallyEditProduct Product={this.state.ProductEditing} />}

                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                {/*+++++++++          ERROR MODAL           ++++++++++++*/}
                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                <ErrorModal ref={this.ErrorModal} />
            </div>
        )
    }
}

    


// =====================================================================
// ============      APP COMPONENTS        =============================
// =====================================================================
class ReallyEditProduct extends React.Component {
    
    constructor(props) {
        super(props)

        const EditProduct = this.props.Product
        EditProduct.Name = ShowCuteMode(EditProduct.Name)
        EditProduct.BrandName = ShowCuteMode(EditProduct.BrandName)
        EditProduct.Description = ShowCuteMode(EditProduct.Description)
        EditProduct.ProviderName = ShowCuteMode(EditProduct.ProviderName)
        EditProduct.NewCode = ""

        this.state = {
            Product: EditProduct
        }

        this.ErrorModal = React.createRef()
    }

    static getDerivedStateFromProps(props, state) {

        const EditProduct = props.Product
        EditProduct.Name = ShowCuteMode(EditProduct.Name)
        EditProduct.BrandName = ShowCuteMode(EditProduct.BrandName)
        EditProduct.Description = ShowCuteMode(EditProduct.Description)
        EditProduct.ProviderName = ShowCuteMode(EditProduct.ProviderName)
        EditProduct.NewCode = ""

        return {Product: EditProduct}
    }

    handleSendEdit () {

        SentData('/SaveProductEdit', this.state.Product)
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

                    this.ErrorModal.current.ShowErrorMessage(ErrorMessage)
                    return
                }
                else {
                    M.toast({html: "Modificación exitosa :D"})
                }
            })
            .catch(ErrorMessageFromServer => console.log(ErrorMessageFromServer))
    }


    componentDidMount() {
        M.updateTextFields()
    }

    render () {

        return (
            <div className="row center-align">
                
                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                {/*+++++++++          EDIT CARD             ++++++++++++*/}
                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                <div className="card-panel grey lighten-4 col s12 grey-text text-darken-2">
                    <div className="container">

                        {/*===================================================*/}
                        {/*==============      TITLE      ====================*/}
                        {/*===================================================*/}
                        <br />
                        <h4><b>Editemos</b> un Producto</h4>
                        
                        {/*=============================================*/}
                        {/*==============   EDIT    ====================*/}
                        {/*=============================================*/}
                        <br />
                        <h5><strong> Datos </strong> Modificables</h5> 
                        <br />

                        <div className="container">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input 
                                        id         = "NameInput"
                                        type       = "text"
                                        className  = "validate"
                                        value      = {this.state.Product.Name} 
                                        onChange   = {(e) => {
                                                const NewState = this.state.Product
                                                NewState.Name = e.target.value
                                                this.setState({Product: NewState})
                                            }
                                        } 
                                    />
                                    <label htmlFor="NameInput">Nombre del Producto</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input 
                                        id           = "DesInput"
                                        type         = "text"
                                        className    = "validate"
                                        value      = {this.state.Product.Description} 
                                        onChange   = {(e) => {
                                                const NewState = this.state.Product
                                                NewState.Description = e.target.value
                                                this.setState({Product: NewState})
                                            }
                                        }
                                    />
                                    <label htmlFor="DesInput">Descripción</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s2">
                                    <input 
                                        id           = "QuantityInput"
                                        type         = "number"
                                        min          = "0"
                                        className    = "validate"
                                        value      = {this.state.Product.CurrentQuantity} 
                                        onChange   = {(e) => {
                                                const NewState = this.state.Product
                                                NewState.CurrentQuantity = e.target.value
                                                this.setState({Product: NewState})
                                            }
                                        }
                                    />
                                    <label htmlFor="QuantityInput">Cantidad</label>
                                </div>

                                <div className="input-field col s2">
                                    <input 
                                        id           = "PriceInput"
                                        type         = "number"
                                        min          = "0"
                                        className    = "validate"
                                        value      = {this.state.Product.PriceOfSale} 
                                        onChange   = {(e) => {
                                                const NewState = this.state.Product
                                                NewState.PriceOfSale = e.target.value
                                                this.setState({Product: NewState})
                                            }
                                        }
                                    />
                                    <label htmlFor="PriceInput">Precio Venta</label>
                                </div>

                                <div className="input-field col s2">
                                    <input 
                                        id           = "PriceAInput"
                                        type         = "number"
                                        className    = "validate"
                                        value      = {this.state.Product.PriceAcquisition} 
                                        onChange   = {(e) => {
                                                const NewState = this.state.Product
                                                NewState.PriceAcquisition = e.target.value
                                                this.setState({Product: NewState})
                                            }
                                        }
                                        />
                                    <label htmlFor="PriceAInput">Precio Adq.</label>
                                </div>

                                <div className="input-field col s6">
                                    <input 
                                        id           = "CodeInput"
                                        type         = "text"
                                        className    = "validate"
                                        value      = {this.state.Product.NewCode} 
                                        onChange   = {(e) => {
                                                const NewState = this.state.Product
                                                NewState.NewCode = e.target.value
                                                this.setState({Product: NewState})
                                            }
                                        }
                                    />
                                    <label htmlFor="CodeInput" className="active">Nuevo Código de Barras</label>
                                </div>
                            </div>


                            <div className="row">
                                <a 
                                    onClick={() => this.handleSendEdit()}
                                    className="col s4 offset-s4 light-green waves-effect waves-light btn">
                                    Salvar Cambios
                                </a>
                            </div>
                        </div>


                        <br />
                        <div className="divider"></div>
                        <br />

                        {/*=============================================*/}
                        {/*==============   EDIT    ====================*/}
                        {/*=============================================*/}
                        <br /><br />
                        <h5><strong> Datos </strong> Visibles</h5> 
                        <br />

                        <div className="container">
                            <div className="row">
                                <div className="input-field col s6">
                                    <input 
                                        readOnly  = {true}
                                        id        = "NameInput"
                                        type      = "text"
                                        value     = {ShowCuteMode(this.state.Product.BrandName)}
                                    />
                                    <label htmlFor="NameInput">Marca</label>
                                </div>
                                <div className="input-field col s6">
                                    <input 
                                        readOnly  = {true}
                                        id        = "NameInput"
                                        type      = "text"
                                        value     = {ShowCuteMode(this.state.Product.ProviderName)}
                                    />
                                    <label htmlFor="NameInput">Proovedor</label>
                                </div>
                            </div>

                            <div className="row">
                                {this.state.Product.BarCodes.map((Barcode, Index) => {
                                    return (
                                        <div className="input-field col s4" key={`Code${Index}`}>
                                            <input 
                                                readOnly  = {true}
                                                id        = {`Code${Index}`}
                                                type      = "text"
                                                value     = {Barcode}
                                            />
                                            <label htmlFor={`Code${Index}`} className="active">Código de Barras {Index + 1}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                {/*+++++++++          ERROR MODAL           ++++++++++++*/}
                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                <ErrorModal ref={this.ErrorModal} />

            </div>
        )
    }



}
