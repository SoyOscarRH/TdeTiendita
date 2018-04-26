import React from "react";


// =====================================================================
// ============           SALES PAGE       =============================
// =====================================================================
export default class SalesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ToPay: 0.0,
            CurrentSell: {
                Quantity: 1,
                Name: "",
                Price: -1
            },
            Price: "",
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
        };
    }


    AddProduct(Event) {
        if (Event.key === 'Enter') {
          console.log('do validate');
          console.log(Event);
        }
    }


    render () {

        const TableProductsItems = this.state.Products.map( (Product) => {

                this.state.ToPay += Product.Price

                return (
                    <tr key={Product.Code}>
                        <td>{Product.Quantity}</td>
                        <td>{Product.Name}</td>
                        <td>${Product.Price.toFixed(2)}</td>
                    </tr>
                )
            }
        );


        return (
            <div className="center-align row section">

                <div className="col s12">
                    <div className="card-panel blue-grey lighten-5">
                        <div className="black-text">

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

                            <div className="divider" />

                            <div className="section">
                                <div className="row">
                                  
                                    <div className="input-field col s1">
                                        <input 
                                            onKeyPress = {this.AddProduct} 
                                            id = "QuantityInput" 
                                            type = "text" 
                                            className = "validate"
                                            value = {this.state.CurrentSell.Quantity}  
                                        />
                                        
                                        <label htmlFor="QuantityInput">
                                            <div style={{fontSize: '0.8em'}}>
                                                Cantidad
                                            </div>
                                        </label>
                                    </div>

                                    <div className="input-field col s1">
                                        <input 
                                            onKeyPress = {this.AddProduct} 
                                            id = "PriceInput" 
                                            type = "text" 
                                            className = "validate"
                                            value = {this.state.CurrentSell.Price}  
                                        />

                                        <label htmlFor="PriceInput">
                                            <div style={{fontSize: '0.9em'}}>
                                                Precio
                                            </div>
                                        </label>
                                    </div>

                                    <div className="input-field col s5 focus">

                                        <input 
                                            onKeyPress = {this.AddProduct} 
                                            id = "CodeInput" 
                                            type = "text"
                                            className = "validate" 
                                        />
                                        
                                        <label htmlFor="CodeInput">Código de Barras del Producto</label>
                                    </div>

                                    <div className="input-field col s5">
                                        <input 
                                            onKeyPress = {this.AddProduct} 
                                            id = "SearchInput" 
                                            type = "text"
                                            className = "validate" 
                                        />
                                        <label htmlFor="SearchInput">Buscar por Precio</label>
                                    </div>

                                </div>
                            </div>

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
                  </div>
              </div>
            </div>
        );
    }
}