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
            SalesRange: []
        }

        this.ErrorModal = React.createRef()
    }

    componentDidMount() {
        const Elems = document.querySelectorAll('.datepicker')
        M.Datepicker.init(Elems, {})
    }

    handleSearch () {

        const ID1 = document.getElementById('Start')
        const ID2 = document.getElementById('End')
        
        const Instance1 = M.Datepicker.getInstance(ID1)
        const Instance2 = M.Datepicker.getInstance(ID2)

        if (Instance1.toString() == "" || Instance2.toString() == "") {
            M.toast({html: "Primero coloca las 2 fechas porfavor"})
            return
        }
        const DateStart = new Date(Instance1.toString())        
        const DateEnd   = new Date(Instance2.toString())   

        if (DateStart.getTime() > DateEnd.getTime()) {
            M.toast({html: "La segunda fecha debe ser mayor o igual que la primera"})
            return
        }
        SentData('/GetSalesFromDates', {
            DateStart: DateStart.toISOString().substring(0, 10), 
            DateEnd: DateEnd.toISOString().substring(0, 10), 
        })
            .then(Results => {
                // ++++++++++++++++++++++++++++++++++++++++++++
                // ++++++          IF NOT FIND        +++++++++
                // ++++++++++++++++++++++++++++++++++++++++++++
                if (Results['Error'] != undefined) {

                    const ErrorMessage = (
                        <div>
                            <h5> Error con la Fecha </h5>
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
                    console.log(Results)
                    if (Results.length == 0)
                        M.toast({html: "No hay ventas en el rango"})

                    this.setState({SalesRange: Results})
                }
            })
            .catch(ErrorMessageFromServer => console.log(ErrorMessageFromServer))
    }

    componentDidMount() {
        const Elements = document.querySelectorAll('.datepicker')
        M.Datepicker.init(Elements, {autoClose: true, showClearBtn: true})
    }
    
    render() {
        return (
            <div className="row center-align">
                {/*==============================================*/}
                {/*===========     SEARCH DATA   ================*/}
                {/*==============================================*/}
                <div className="card-panel grey lighten-4 col s12">

                    <div className="container">
                        <h4 className="grey-text text-darken-2">
                            <b>Búsqueda </b> de Rangos
                        </h4>
                        <br />
                        <span className="grey-text">
                            Selecciona 2 fechas para visualizar las ventas en ese rango
                        </span>
                        <br />
                        <br />

                        <div className="row">
                            <div className="input-field col s4 offset-s1">
                                <input id="Start" type="text" className="datepicker" />
                            </div>
                            <div className="input-field col s4">
                                <input id="End" type="text" className="datepicker" />
                            </div>
                            <div className="input-field col s2">
                                <button 
                                    onClick={() => this.handleSearch()}
                                    className = "waves-effect btn-floating btn-large waves-light green btn-flat">
                                    <i className="material-icons">
                                        search
                                    </i>
                                </button>
                            </div>
                        </div>


                    </div>

                    {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                    {/*+++++++++          ERROR MODAL           ++++++++++++*/}
                    {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                    <ErrorModal ref={this.ErrorModal} />
                </div>

                {/*==============================================*/}
                {/*===========      SHOW DATA    ================*/}
                {/*==============================================*/}
                {this.state.SalesRange.length > 0 && <ShowSaleData SalesRange={this.state.SalesRange} />}
            </div>
        )
    }

}


class ShowSaleData extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const Elems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(Elems, {})
    }

    render () {

        return (
            <div className="card-panel grey lighten-4 col s12">
                <div className="container">
                    <h4 className="grey-text text-darken-2">
                        <b>Análisis </b> de Ventas
                    </h4>
                    <br />

                    <ul className="collapsible">
                        {this.props.SalesRange.map((Element, index) => {

                            return (
                                <li key={index}>
                                    <div className="collapsible-header">
                                        <i className="material-icons">attach_money</i>Venta: {ShowCuteMode(Element[0].DateOfSale)}
                                    </div>

                                    <div className="collapsible-body">
                                        <table className="striped responsive-table">
                                            <thead>
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Cantidad Vendida</th>
                                                    <th>Precio</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {Element.map(UnitSale => 
                                                    <tr key={UnitSale.Name}>
                                                        <td>{ShowCuteMode(UnitSale.Name)}</td>
                                                        <td>{UnitSale.QuantitySell}</td>
                                                        <td>${UnitSale.PriceOfSale}</td>
                                                        <td>${UnitSale.QuantitySell * UnitSale.PriceOfSale}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>

                    <br />
                    <br />
                    <br />
                    
                </div>
            </div>
        )
        
    }
}