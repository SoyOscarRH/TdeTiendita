import React from "react";
import {HotKeys} from "react-hotkeys";




// =====================================================================
// ============           SALES PAGE       =============================
// =====================================================================
export default class SalesPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            ToPay: 0.0,
            CurrentSell: {
                QuantityOrPrice: "1",
                BarCode: "",
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
                },
                handlers: {
                    'SendProduct': (event) => {
                        const Sell = this.state.CurrentSell
                        const IsPrice = Sell.QuantityOrPrice[0] === '$'
                        Sell.QuantityOrPrice = Sell.QuantityOrPrice.slice(IsPrice? 1: 0)

                        if (Number(Sell.QuantityOrPrice) == NaN) {
                            alert("Error en el precio")
                            return
                        }

                        console.log(`Enviamos ${(IsPrice)? "$" : ""} ${Sell.QuantityOrPrice} Code bar ${Sell.BarCode}`)
                    }
                }
            }
        }
    }

    handleChangeQuantityOrPrice = (Event) => {
        const NewCurrentSell = Object.assign({}, this.state.CurrentSell)
        NewCurrentSell.QuantityOrPrice = Event.target.value
        this.setState({CurrentSell: NewCurrentSell})
    }

    handleChangeBarCode = (Event) => {
        const NewCurrentSell = Object.assign({}, this.state.CurrentSell)
        NewCurrentSell.BarCode = Event.target.value
        this.setState({CurrentSell: NewCurrentSell})
    }

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
                      
                        <div className="input-field col s2">
                            <input 
                                id        = "QuantityOrPrice" 
                                type      = "text"
                                className = "validate"
                                value     = {this.state.CurrentSell.QuantityOrPrice}
                                onChange  = {this.handleChangeQuantityOrPrice}
                            />
                            <label htmlFor="QuantityOrPrice">
                                <div style={{fontSize: '0.8em'}}>
                                    Cantidad o Precio
                                </div>
                            </label>
                        </div>

                        <div className="input-field col s5 focus">
                            <input 
                                id    = "CodeInput" 
                                type  = "text"
                                value = {this.state.CurrentSell.BarCode}
                                onChange = {this.handleChangeBarCode}
                            />
                            <label htmlFor="CodeInput">Código de Barras del Producto</label>
                        </div>

                        <div className="input-field col s5">
                            <input 
                                id = "SearchInput" 
                                type = "text"
                            />
                            <label htmlFor="SearchInput">Buscar por Nombre</label>
                        </div>
                    </div>
                    </HotKeys>
                </div>


                {/*=====================================================*/}
                {/*=========          PRODUCTS TABLES       ============*/}
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