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
                BarCodeInput: " ",
                SearchInput: " ",
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
                    SetFocusToQuantity: ['f1', '|', '!', 'space+1'],
                    SetFocusToBarCode:  ['f2', '@', '"', 'space+2'],
                    SetFocusToSearch:   ['f3', '#', '·', 'space+3'],
                },
                handlers: {
                    'AddCurrentProduct':   (e) => this.handleAddCurrentProduct(),
                    'MoveToRight':         (e) => this.handleChangeOfFocus({Direction: "right"}),
                    'MoveToLeft':          (e) => this.handleChangeOfFocus({Direction: "left"}),
                    'SetFocusToQuantity':  (e) => this.handleChangeOfFocus({Position: 0}),
                    'SetFocusToBarCode':   (e) => this.handleChangeOfFocus({Position: 1}),
                    'SetFocusToSearch':    (e) => this.handleChangeOfFocus({Position: 2}),
                }
            },
            Products: [
                {
                    Quantity: 1,
                    Name: "Chicles",
                    Code: "3434343434",
                    Price: 0.50,
                },
                {
                    Quantity: 2,
                    Name: "Malboro",
                    Code: "mal",
                    Price: 7.50,
                }
            ]
        }

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

        if (Parameters['Direction'] == undefined) {
            NewCurrentFocus = Parameters['Position']
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
        Sell.IsPrice = Sell.QuantityInput[0] === '$'
        Sell.QuantityInput = Number(Sell.QuantityInput.slice(Sell.IsPrice? 1: 0))

        if (Number.isNaN(Sell.QuantityInput) || Sell.QuantityInput == 0) {
            let Message = 
                <div>
                    <h5> Error con el Precio ó Cantidad </h5>
                    <br />
                    Para salir de este diálogo puedes presionar la tecla 'esc'
                </div>

            this.setState({ErrorMessage: Message})

            const InstanceModal = M.Modal.getInstance(document.getElementById('ErrorModal'));
            InstanceModal.open()

            return
        }

        this.setState({CurrentSell: Sell})

        SentData('/CheckPrice', Sell)
        .then(Data => console.log(Data))
        .catch(error => console.log(error))
    }

    componentDidMount() {
        const Instances = M.Modal.init(document.getElementById('ErrorModal'), {
            dismissible: true,
            onCloseEnd: () => this.handleChangeOfFocus({Position: 0})
        });
    }


    // =========================================================
    // ============           RENDER              ==============
    // =========================================================
    render () {

        const TableProductsItems = this.state.Products.map( (Product) => {

            return (
                <tr key={Product.Code}>
                    <td>{Product.Quantity}</td>
                    <td>{Product.Name}</td>
                    <td>${Product.Price.toFixed(2)}</td>
                </tr>
            )
        })

        return (
            <div className="card-panel blue-grey lighten-5 black-text">
                

                {/*=====================================================*/}
                {/*==============     HEADER TO PAY ====================*/}
                {/*=====================================================*/}
                <div className="row section">
                    <div className="input-field col s7 offset-s1 center-align valign-wrapper">
                        <span 
                            className="hide-on-small-only" 
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
                                    defaultValue = {1}
                                    value        = {this.state.CurrentSell.QuantityOrPrice}
                                    onFocus      = {() => this.handleChangeOfFocus({Position: 0})}
                                    onChange     = {(e) => this.handleChangeSaleData(e, "QuantityInput")}
                                />
                                <label htmlFor="QuantityInput">
                                    <div style={{fontSize: '0.8em'}}>
                                        Cantidad o Precio
                                    </div>
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
                                    value     = {this.state.CurrentSell.BarCode}
                                    onFocus   = {() => this.handleChangeOfFocus({Position: 1})}
                                    onChange  = {(e) => this.handleChangeSaleData(e, "BarCodeInput")}
                                />
                                <label htmlFor="BarCodeInput">Código de Barras del Producto</label>
                            </div>

                            {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                            {/*+++++++++         SEARCH INPUT           ++++++++++++*/}
                            {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                            <div className="input-field col s5">
                                <input 
                                    id        = "SearchInput" 
                                    type      = "text"
                                    value     = {this.state.CurrentSell.Search}
                                    onFocus   = {() => this.handleChangeOfFocus({Position: 2})}
                                    onChange  = {(e) => this.handleChangeSaleData(e, "SearchInput")}
                                />
                                <label htmlFor="SearchInput">Buscar por Nombre</label>
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
                                <th>Precio</th>
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