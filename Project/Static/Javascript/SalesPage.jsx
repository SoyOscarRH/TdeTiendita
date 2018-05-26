// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ||||||||||||           SALES PAGE       |||||||||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
import React from "react"
import {HotKeys} from "react-hotkeys"
import {SentData} from "./CoolFunctions.js"

export default class SalesPage extends React.Component {


    // =========================================================
    // ========        CONSTRUCTOR AND STATE         ===========
    // =========================================================
    constructor(props) {
        super(props)

        this.state = {
            ToPay: 0.0,
            ErrorMessage: "",
            CurrentSell: {
                QuantityInput: "1",
                BarCodeInput: "",
                SearchInput: "",
                IsPrice: false
            },
            FocusGroup: {
                CurrentFocus : 1,
                FocusElements: [
                    "QuantityInput", 
                    "BarCodeInput", 
                    "SearchInput"
                ]
            },
            HotKeysMapping: {
                keyMap: {
                    AddCurrentProduct:  ['enter'],
                    MoveToRight:        ['shift+right', 'alt+right', 'ctrl+right'],
                    MoveToLeft:         ['shift+left',  'alt+left',  'ctrl+left'],
                    SetFocusToQuantity: ['f1', '|', '!'],
                    SetFocusToBarCode:  ['f2', '@', '"'],
                    SetFocusToSearch:   ['f3', '#', '·'],
                },
                handlers: {
                    'AddCurrentProduct':   (e) => this.handleAddCurrentProduct(),
                    'MoveToRight':         (e) => this.handleChangeOfFocus({Direction: "right"}),
                    'MoveToLeft':          (e) => this.handleChangeOfFocus({Direction: "left"}),
                    'SetFocusToQuantity':  (e) => this.handleChangeOfFocus({Position: "QuantityInput"}),
                    'SetFocusToBarCode':   (e) => this.handleChangeOfFocus({Position: "BarCodeInput"}),
                    'SetFocusToSearch':    (e) => this.handleChangeOfFocus({Position: "SearchInput"}),
                }
            },
            Products: []
        }

        document.addEventListener('DOMContentLoaded', function() {
            M.Modal.init(document.getElementById('ErrorModal'), {dismissible: true})
        })

    }



    // =========================================================
    // ===========              HANDLES            =============
    // =========================================================
    handleChangeSaleData (Event, Item) {
        const NewCurrentSell = Object.assign({}, this.state.CurrentSell)
        const NewFocusGroup = Object.assign({}, this.state.FocusGroup)
        
        NewCurrentSell[Item] = Event.target.value
        NewFocusGroup.CurrentFocus = NewFocusGroup.FocusElements.findIndex(name => name === Item)
        this.setState({CurrentSell: NewCurrentSell, FocusGroup: NewFocusGroup})
    }

    handleChangeOfFocus (Parameters) {
        const NewFocusGroup = Object.assign({}, this.state.FocusGroup)
        let NewCurrentFocus = 0

        if (Parameters['Position'] != undefined) {
            if (Parameters['Position'] == "QuantityInput") NewCurrentFocus = 0
            if (Parameters['Position'] == "BarCodeInput")  NewCurrentFocus = 1
            if (Parameters['Position'] == "SearchInput")   NewCurrentFocus = 2
        }
        else {
            const Move = (Parameters['Direction'] === "right")? 1: -1
            NewCurrentFocus = (NewFocusGroup.CurrentFocus + Move) % 3
            if (NewCurrentFocus < 0) NewCurrentFocus += 3
        }

        NewFocusGroup.CurrentFocus = NewCurrentFocus
        this.setState({FocusGroup: NewFocusGroup})

        document.getElementById(NewFocusGroup.FocusElements[NewFocusGroup.CurrentFocus]).focus()
    }

    handleAddCurrentProduct () {

        const Sell = Object.assign({}, this.state.CurrentSell)

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++      CHECK IF IS QUANTITY OR PRICE     ++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            Sell.IsPrice = Sell.QuantityInput[0] === '$'
            Sell.QuantityInput = Number(Sell.QuantityInput.slice(Sell.IsPrice? 1: 0))

            if (Number.isNaN(Sell.QuantityInput) || Sell.QuantityInput <= 0) {
                let Message = (
                    <div>
                        <h5> Error con el Precio ó Cantidad </h5>
                        <br />
                        Para salir de este diálogo puedes presionar la tecla 'esc'
                    </div>
                )

                this.setState({ErrorMessage: Message})

                const InstanceModal = M.Modal.getInstance(document.getElementById('ErrorModal'))

                InstanceModal.options.onCloseEnd = () => this.handleChangeOfFocus({Position: "QuantityInput"}) 
                InstanceModal.open()

                return
            }

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++     SEND TO FIND THE PRICE AND NAME     +++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        SentData('/DataFromBarCode', Sell)
        .then(Results => {

            // ++++++++++++++++++++++++++++++++++++++++++++
            // ++++++          IF NOT FIND        +++++++++
            // ++++++++++++++++++++++++++++++++++++++++++++
                if (Results['Error'] != undefined) {

                    this.setState({ErrorMessage:  (
                            <div>
                                <h5> Error con el Producto </h5>
                                <br />
                                {Results['Error']}
                            </div>
                        )
                    })

                    const InstanceModal = M.Modal.getInstance(document.getElementById('ErrorModal'))
                    InstanceModal.options.onCloseEnd = () => this.handleChangeOfFocus({Position: "BarCodeInput"}) 
                    InstanceModal.open()

                    // ++++++++++++++++++++++++++++++++++++++++++++
                    // ++++   SET THE STATE AS IT SHOULD   ++++++++
                    // ++++++++++++++++++++++++++++++++++++++++++++
                    Sell.BarCodeInput = ""
                    Sell.QuantityInput = String(Sell.QuantityInput)
                    this.setState({"CurrentSell": Sell})

                    return
                }

            
            const Products = [...this.state.Products]
            const NewQuantity = (Sell.IsPrice)? 
                Sell.QuantityInput / Results['UnitPrice']:
                Sell.QuantityInput

            // ++++++++++++++++++++++++++++++++++++++++++++
            // ++    WE HAVE THE PRODUCT IN THE LIST?    ++
            // ++++++++++++++++++++++++++++++++++++++++++++

            const NewToPay = this.state.ToPay + (Results['UnitPrice'] * NewQuantity)

            const ExistAlready = Products.some(
                (Product) => {
                    if (Product['Code'] === Results['BarCode']) {
                        Product['Quantity'] = String(Number(NewQuantity) + Number(Product['Quantity']))
                        return true
                    }
                    return false
                }
            )

            // ++++++++++++++++++++++++++++++++++++++++++++
            // +++++    CREATE NEW ITEM IN TABLE   ++++++++
            // ++++++++++++++++++++++++++++++++++++++++++++
            if (!ExistAlready) {
                Products.unshift({
                    "Quantity":  String(NewQuantity),
                    "Name":      Results['Name'],
                    "Code":      Results['BarCode'],
                    "UnitPrice": Results['UnitPrice']
                })
            }

            // ++++++++++++++++++++++++++++++++++++++++++++
            // ++++   SET THE STATE AS IT SHOULD   ++++++++
            // ++++++++++++++++++++++++++++++++++++++++++++
            Sell.QuantityInput = "1"
            Sell.BarCodeInput = ""
            this.handleChangeOfFocus({Position: "BarCodeInput"})
            this.setState({"Products": Products, "CurrentSell": Sell, "ToPay": NewToPay})

        })
        .catch(ErrorMessageFromServer => console.log(ErrorMessageFromServer))
    }


    // =========================================================
    // ============           RENDER              ==============
    // =========================================================
    render () {

        const TableProductsItems = this.state.Products.map( (Product) => {

            let VisualQuantity = Number(Product.Quantity)
            if (!Number.isInteger(VisualQuantity)) VisualQuantity = VisualQuantity.toFixed(3)
            
            return (
                <tr key={Product.Code}>
                    <td>  {VisualQuantity}                                      </td>
                    <td>  {Product.Name}                                        </td>
                    <td>$ {Product.UnitPrice.toFixed(2)}                        </td>
                    <td>$ {(Product.UnitPrice * Product.Quantity).toFixed(2)}   </td>
                    <td>
                        <a class="waves-effect waves-light btn-flat red lighten-1">
                            <i class="white-text material-icons">delete</i>
                        </a>
                    </td>
                </tr>
            )
        })

        return (
            <div className="card-panel blue-grey lighten-5 black-text">
                

                {/*=====================================================*/}
                {/*==============     HEADER TO PAY ====================*/}
                {/*=====================================================*/}
                <div className="section grey-text text-darken-3">

                    <div className="hide-on-small-only">
                        <div className="row">
                            <div className="input-field col s7 offset-s1 center-align valign-wrapper">
                                <span 
                                    style={{fontWeight: 300, fontSize: '2rem'}}>
                                    Por Pagar: &nbsp;&nbsp;
                                </span>
                                <span style={{fontWeight: 600, fontSize: '2rem'}}>
                                    ${this.state.ToPay.toFixed(2)}
                                </span>
                            </div>

                            <div className="s4">
                                <a className="waves-effect waves-light btn-large">Pagar</a>
                            </div>
                        </div>
                    </div>

                    <div className="hide-on-med-and-up">
                        <div className="row container">
                           <span
                                className = "s5" 
                                style={{fontWeight: 300, fontSize: '2rem'}}>
                                Pagar: &nbsp;&nbsp;
                            </span>
                           <span
                                className = "s7" 
                                style={{fontWeight: 600, fontSize: '2rem'}}>
                                ${this.state.ToPay.toFixed(2)}
                            </span>
                        </div>
                        <div className="row">
                            <div className="s10 offset-s1">
                                <a className="waves-effect waves-light btn-large">Pagar</a>
                            </div>
                        </div>
                    </div>

                </div>

                {/*=====================================================*/}
                {/*=========    SELECTOR FOR NEW PRODUCT    ============*/}
                {/*=====================================================*/}
                <div className="divider" />
                <div className="section">

                    {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                    {/*+++++++++            MODALS              ++++++++++++*/}
                    {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                    <HotKeys 
                        keyMap   = {this.state.HotKeysMapping.keyMap} 
                        handlers = {this.state.HotKeysMapping.handlers}>

                        <div className="row">
                          
                            {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                            {/*+++++++++    QUANTITY OR PRICE INPUT     ++++++++++++*/}
                            {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                            <div className="input-field col s2">
                                <input 
                                    id           = "QuantityInput" 
                                    type         = "text"
                                    value        = {this.state.CurrentSell.QuantityInput}
                                    onFocus      = {() => this.handleChangeOfFocus({Position: "QuantityInput"})}
                                    onChange     = {(e) => this.handleChangeSaleData(e, "QuantityInput")}
                                />
                                <label htmlFor="QuantityInput">
                                    <span style={{fontSize: '0.8em'}}>
                                        Cantidad
                                    </span>
                                    &nbsp;
                                    <span className="hide-on-med-and-down"  style={{fontSize: '0.8em'}}>
                                        o Precio
                                    </span>
                                </label>
                            </div>

                            {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                            {/*+++++++++          BAR CODE INPUT        ++++++++++++*/}
                            {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                            <div className="input-field col s5">
                                <input 
                                    id        = "BarCodeInput" 
                                    type      = "text"
                                    autoFocus = {true}
                                    value     = {this.state.CurrentSell.BarCodeInput}
                                    onFocus   = {() => this.handleChangeOfFocus({Position: "BarCodeInput"})}
                                    onChange  = {(e) => this.handleChangeSaleData(e, "BarCodeInput")}
                                />
                                <label htmlFor="BarCodeInput">
                                    <span>
                                        Código
                                    </span>
                                    &nbsp;
                                    <span className="hide-on-small-only">
                                        de Barras
                                    </span>
                                </label>
                            </div>

                            {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                            {/*+++++++++         SEARCH INPUT           ++++++++++++*/}
                            {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                            <div className="input-field col s5">
                                <input 
                                    id        = "SearchInput" 
                                    type      = "text"
                                    value     = {this.state.CurrentSell.SearchInput}
                                    onFocus   = {() => this.handleChangeOfFocus({Position: "SearchInput"})}
                                    onChange  = {(e) => this.handleChangeSaleData(e, "SearchInput")}
                                />
                                <label htmlFor="SearchInput">
                                    <span>
                                        Buscar
                                    </span>
                                    &nbsp;
                                    <span className="hide-on-small-only">
                                        por Nombre
                                    </span>
                                </label>
                            </div>

                        </div>

                    </HotKeys>

                    {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                    {/*+++++++++          ERROR MODAL           ++++++++++++*/}
                    {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                    <div 
                        id        = "ErrorModal"
                        className = "modal modal-fixed-footer"
                        style     = {{width: '45%', height: '20rem'}} >
                        
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

                </div>


                {/*=====================================================*/}
                {/*=========          PRODUCTS TABLE        ============*/}
                {/*=====================================================*/}
                <div className="divider" />
                <div className="row section">
                    <table className="bordered highlight col s10 offset-s1 responsive-table">
                        <thead>
                            <tr>
                                <th>Cantidad</th>
                                <th>Producto</th>
                                <th>Precio Unitario</th>
                                <th>SubTotal</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>

                        <tbody>
                            {TableProductsItems}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}