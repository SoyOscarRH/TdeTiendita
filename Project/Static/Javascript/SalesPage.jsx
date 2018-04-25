import React from "react";


// =====================================================================
// ============           SALES PAGE       =============================
// =====================================================================
export default class SalesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render () {
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
                        <span style={{fontWeight: 600, fontSize: '2rem'}}>$0.00</span>
                      </div>
                      <div className="s4">
                        <a className="waves-effect waves-light btn-large">Pagar</a>
                      </div>
                    </div>

                    <div className="divider" />

                    <div className="section">
                      <div className="row">
                        <div className="input-field col s1">
                          <input id="icon_prefix" type="text" className="validate" />
                          <label htmlFor="icon_prefix">
                            <div style={{fontSize: '0.8em'}}>
                              Cantidad
                            </div>
                          </label>
                        </div>
                        <div className="input-field col s1">
                          <input id="icon_prefix" type="text" className="validate" />
                          <label htmlFor="icon_prefix">
                            <div style={{fontSize: '0.9em'}}>
                              Precio
                            </div>
                          </label>
                        </div>
                        <div className="input-field col s5">
                          <input id="icon_prefix" type="text" className="validate" />
                          <label htmlFor="icon_prefix">Código de Barras del Producto</label>
                        </div>
                        <div className="input-field col s5">
                          <input id="icon_prefix" type="text" className="validate" />
                          <label htmlFor="icon_prefix">Buscar por Precio</label>
                        </div>
                      </div>
                    </div>

                    <div className="divider" />

                    <div className="row section">
                      <table className="container bordered striped col s10 offset-s1 responsive-table">
                        <thead>
                          <tr>
                            <th>Cantidad</th>
                            <th>Producto</th>
                            <th>Precio</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Alvin</td>
                            <td>Eclair</td>
                            <td>$0.87</td>
                          </tr>
                          <tr>
                            <td>Alan</td>
                            <td>Jellybean</td>
                            <td>$3.76</td>
                          </tr>
                          <tr>
                            <td>Jonathan</td>
                            <td>Lollipop</td>
                            <td>$7.00</td>
                          </tr>
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