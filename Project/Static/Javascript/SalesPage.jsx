import React from "react";
import {HotKeys} from "react-hotkeys";




// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ||||||||||||           SALES PAGE       |||||||||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
export default class SalesPage extends React.Component {


    // =========================================================
    // ========        CONSTRUCTOR AND STATE         ===========
    // =========================================================
    constructor(props) {
        super(props)

        this.state = {
            FocusGroup: {
                CurrentFocus : 1,
                FocusElements: ["QuantityOrPriceInput", "BarCodeInput", "SearchInput"]
            },
            ToPay: 0.0,
            CurrentSell: {
                QuantityOrPrice: "1",
                BarCode: " ",
                Search: " "
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
            ],
            HotKeysMapping: {
                keyMap: {
                    SendProduct: 'enter',
                    MoveToRight: ['shift+right', 'alt+right', 'ctrl+right'],
                    MoveToLeft: ['shift+left', 'alt+left', 'ctrl+left'],
                    SetFocusToQuantityOrPrice: ['|'],
                    SetFocusToBarCode: ['@'],
                    SetFocusToSearch: ['#'],
                },
                handlers: {
                    'SendProduct': (e) => this.handleSendProduct(),
                    'MoveToRight': (e) => this.handleChangeOfFocus("right", null),
                    'MoveToLeft':  (e) => this.handleChangeOfFocus("left", null),
                    'SetFocusToQuantityOrPrice':  (e) => this.handleChangeOfFocus(null, 0),
                    'SetFocusToBarCode':          (e) => this.handleChangeOfFocus(null, 1),
                    'SetFocusToSearch':           (e) => this.handleChangeOfFocus(null, 2),
                }
            } 
        }
    }


    // =========================================================
    // ===========              HANDLES            =============
    // =========================================================
    handleCurrentSaleData (Event, Item) {
        const NewCurrentSell = Object.assign({}, this.state.CurrentSell)
        const NewFocusGroup = Object.assign({}, this.state.FocusGroup)
        NewCurrentSell[Item] = Event.target.value
        NewFocusGroup.CurrentFocus = NewFocusGroup.FocusElements.findIndex(name => name === Item + "Input")

        this.setState({CurrentSell: NewCurrentSell, FocusGroup: NewFocusGroup})
    }

    handleChangeOfFocus (Direction, Position) {
        const NewFocusGroup = this.state.FocusGroup
        let NewCurrentFocus = 1

        if (Direction == null) {
            NewCurrentFocus = Position
        }
        else {
            const Move = (Direction === "right")? 1: -1;
            NewCurrentFocus = (NewFocusGroup.CurrentFocus + Move) % 3
            if (NewCurrentFocus < 0) NewCurrentFocus += 3
        }

        NewFocusGroup.CurrentFocus = NewCurrentFocus
        this.setState({FocusGroup: NewFocusGroup})

        document.getElementById(NewFocusGroup.FocusElements[NewFocusGroup.CurrentFocus]).focus()
    }

    handleSendProduct () {
        const Sell = this.state.CurrentSell
        const IsPrice = Sell.QuantityOrPrice[0] === '$'
        Sell.QuantityOrPrice = Sell.QuantityOrPrice.slice(IsPrice? 1: 0)

        if (Number(Sell.QuantityOrPrice) == NaN) {
            alert("Error en el precio")
            return
        }

        if (IsPrice) console.log(`Send Price ${Sell.QuantityOrPrice} Code Bar: ${Sell.BarCode}`)
        else console.log(`Send ${Sell.QuantityOrPrice} of Code Bar: ${Sell.BarCode}`)

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
        });

        return (
            <div className="card-panel blue-grey lighten-5 black-text">
                
                {/*=====================================================*/}
                {/*==============     HEADER TO PAY ====================*/}
                {/*=====================================================*/}
                <div className="row section">
                    <div className="input-field col s7 offset-s1 center-align valign-wrapper">
                        <span className="hide-on-small-only" style={{fontWeight: 300, fontSize: '2rem'}}>
                            Por Pagar: &nbsp;&nbsp;
                        </span>
                        <span style={{fontWeight: 600, fontSize: '2rem'}}>${this.state.ToPay.toFixed(2)}</span>
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

                    <HotKeys keyMap={this.state.HotKeysMapping.keyMap} handlers={this.state.HotKeysMapping.handlers}>
                    <div className="row">
                      
                        {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                        {/*+++++++++    QUANTITY OR PRICE INPUT     ++++++++++++*/}
                        {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                        <div className="input-field col s2">
                            <input 
                                id        = "QuantityOrPriceInput" 
                                type      = "text"
                                value     = {this.state.CurrentSell.QuantityOrPrice}
                                onFocus   = {() => this.handleChangeOfFocus(null, 0)}
                                onChange  = {(e) => this.handleCurrentSaleData(e, "QuantityOrPrice")}
                            />
                            <label htmlFor="QuantityOrPriceInput">
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
                                onFocus   = {() => this.handleChangeOfFocus(null, 1)}
                                onChange  = {(e) => this.handleCurrentSaleData(e, "BarCode")}
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
                                onFocus   = {() => this.handleChangeOfFocus(null, 2)}
                                onChange  = {(e) => this.handleCurrentSaleData(e, "Search")}
                            />
                            <label htmlFor="SearchInput">Buscar por Nombre</label>
                        </div>

                    </div>
                    </HotKeys>
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
        );
    }
}