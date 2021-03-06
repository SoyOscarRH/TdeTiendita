// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ||||||||||||           SALES PAGE       |||||||||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
import React from "react"
import {HotKeys} from "react-hotkeys"
import {SentData, ShowCuteMode} from "./CoolFunctions.js"
import ErrorModal from "./ErrorModal"


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
            ToPay:       0.0,
            ErrorMessage: "",
            Products:     [],
        }

        this.ErrorModal = React.createRef()
        this.SectionToAddNewProduct = React.createRef()
    }

    // =========================================================
    // ===========              HANDLES            =============
    // =========================================================
    /* 
     * Should send to the server a JSON with this options:
     * {QuantityInput: n, BarCodeInput: "ABCSDS", SearchInput: "", IsPrice: true}
     */
    handleSendSale() {
        SentData('/SaleProducts', this.state.Products)
        .then(Results => {
            
            // ++++++++++++++++++++++++++++++++++++++++++++
            // ++++++          IF NOT FIND        +++++++++
            // ++++++++++++++++++++++++++++++++++++++++++++
            if (Results['Error'] != undefined) {

                const ErrorMessage = (
                    <div>
                        <h5> Error con la Venta de Productos </h5>
                        <br />
                        {Results['Error']}
                        <br />
                        <br />
                        <div>
                            Para salir de este diálogo puedes presionar la tecla 'esc' ó 'enter'
                        </div>
                    </div>
                )

                this.ErrorModal.current.ShowErrorMessage(ErrorMessage)
                return
            }

            this.setState({"Products": []})
            M.toast({html: 'Venta Realizada'})
            this.SectionToAddNewProduct.current.handleChangeOfFocus({Position: 'BarCodeInput'})
        })
        .catch(ErrorMessageFromServer => console.log(ErrorMessageFromServer))
    }

    /* 
     * Should send a Object:
     * Product = {Quantity: 20, Name: "Tortilla", UnitPrice: 20.5}
     */
    AddProduct(NewProduct) {
        const Products = [...this.state.Products]

        // ++++++++++++++++++++++++++++++++++++++++++++
        // ++    WE HAVE THE PRODUCT IN THE LIST?    ++
        // ++++++++++++++++++++++++++++++++++++++++++++
        const ExistAlready = Products.some(
            (Product) => {
                if (Product['Name'] === NewProduct['Name']) {
                    Product['Quantity'] += NewProduct['Quantity']
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
                Quantity:  NewProduct['Quantity'],
                UnitPrice: NewProduct['UnitPrice'],
                Name:      NewProduct['Name'],
            })
        }

        this.setState({Products: Products})
    }

    // =========================================================
    // ============           RENDER              ==============
    // =========================================================
    render () {

        return (
            <div className="card-panel blue-grey lighten-5 black-text">
                
                {/*=====================================================*/}
                {/*==============     HEADER TO PAY ====================*/}
                {/*=====================================================*/}
                <div className="section grey-text text-darken-3">
                    <SectionToPay Products={this.state.Products} handleSendSale={() => this.handleSendSale()} />
                </div>
                

                {/*=====================================================*/}
                {/*=========    SELECTOR FOR NEW PRODUCT    ============*/}
                {/*=====================================================*/}
                <div className="divider" />
                <div className="section">
                    <SectionToAddNewProduct 
                        ref              = {this.SectionToAddNewProduct}
                        ShowErrorMessage = {(Message, CallbackOnClose) => 
                                                this.ErrorModal.current.ShowErrorMessage(Message, CallbackOnClose)}
                        AddProduct       = {(Product) => this.AddProduct(Product)}
                        AutoFocus        = {true}
                    />
                </div>


                {/*=====================================================*/}
                {/*=========          PRODUCTS TABLE        ============*/}
                {/*=====================================================*/}
                <div className="divider" />
                <div className="section">
                    <ProductsTable 
                        Products       = {this.state.Products} 
                        handleSetState = {(Function) => this.setState(Function)}
                    />
                </div>

                <br />
                <br />
                <br />
                <br />
                <br />


                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                {/*+++++++++          ERROR MODAL           ++++++++++++*/}
                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                <ErrorModal ref={this.ErrorModal} />

            </div>
        )
    }


}

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ||||||||||||          SHOW TO PAY              ||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function SectionToPay(props) {

    let InitialValue = 0
    const ToPay = props.Products.reduce((accumulator, Product) => {
        let NewValue = Product.Quantity * Product.UnitPrice
        return accumulator + NewValue
    }, InitialValue)

    return (

        <div>
            <div className="hide-on-small-only">
                <div className="row">
                    <div className="col s7 offset-s1 center-align valign-wrapper">
                        <span 
                            style={{fontWeight: 300, fontSize: '2rem'}}>
                            Por Pagar: &nbsp;&nbsp;
                        </span>
                        <span style={{fontWeight: 600, fontSize: '2rem'}}>
                            ${ToPay.toFixed(2)}
                        </span>
                    </div>

                    <div className="col s4">
                        <a onClick={props.handleSendSale} className="waves-effect waves-light btn-large">
                            Pagar
                        </a>
                    </div>
                </div>
            </div>
            <div className="hide-on-med-and-up">
                <div className="row container">
                   <span
                        className = "col s5" 
                        style={{fontWeight: 300, fontSize: '2rem'}}>
                        Pagar: &nbsp;
                    </span>
                   <span
                        className = "col s7" 
                        style={{fontWeight: 600, fontSize: '2rem'}}>
                        ${ToPay.toFixed(2)}
                    </span>
                </div>
                <div className="row">
                    <div className="col s6 offset-s3">
                        <a onClick={props.handleSendSale} className="waves-effect waves-light btn-large">
                            Pagar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}


// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ||||||||||||      SECTION TO ADD NEW PRODUCT      |||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
class SectionToAddNewProduct extends React.Component {

    // =========================================================
    // ========        CONSTRUCTOR AND STATE         ===========
    // =========================================================
    constructor(props) {
        super(props)

        this.state = {
            FocusGroup: {
                CurrentFocus : 1,
                FocusElements: ["QuantityInput", "BarCodeInput", "SearchInput"],
            },
            CurrentSale: {
                QuantityInput: "1",
                BarCodeInput: "",
                SearchInput: "",
                IsPrice: false,
            },
            CurrentSearch: [],
        }
    }

    // =========================================================
    // ===========              HANDLES            =============
    // =========================================================
    /* 
     * Paramaters: Is a object that have 2 possible values:
     * - Position: Possible values are QuantityInput, BarCodeInput, SearchInput
     * - Direction: Possible values are right, left
     */
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

    /* 
     * You can call it like handleCurrentSaleData("tor", "BarCodeInput")
     */
    handleCurrentSaleData (NewValue, Item) {
        this.setState((PrevState) => {
            const NewCurrentSale = PrevState.CurrentSale
            const NewFocusGroup = PrevState.FocusGroup
            
            NewCurrentSale[Item] = NewValue
            NewFocusGroup.CurrentFocus = NewFocusGroup.FocusElements.findIndex(name => name === Item)
            
            return {CurrentSale: NewCurrentSale, FocusGroup: NewFocusGroup}
        })
    }

    /* 
     * Add CurrentSale to the products array
     */
    handleAddCurrentProduct (SpecialSale = null) {

        const Sale = SpecialSale == null? Object.assign({}, this.state.CurrentSale) : SpecialSale
        
        if (Sale.SearchInput.length > 0) {
            
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // ++++++           CHECK THE SEARCH              +++++++++
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++    
            SentData('/GetAllProductData', Sale.SearchInput)
            .then(Results => {

                // ++++++++++++++++++++++++++++++++++++++++++++
                // ++++++          IF NOT FIND        +++++++++
                // ++++++++++++++++++++++++++++++++++++++++++++
                if (Results['Error'] != undefined) {

                    const ErrorMessage = (
                        <div>
                            <h5> Error con el Producto </h5>
                            <br />
                            {Results['Error']}
                            <br />
                            <div>
                                Para salir de este diálogo puedes presionar la tecla 'esc' ó 'enter'
                            </div>
                        </div>
                    )

                    this.props.ShowErrorMessage(ErrorMessage, () => this.handleChangeOfFocus({Position: "BarCodeInput"}))

                    Sale.BarCodeInput = ""
                    Sale.SearchInput = ""
                    Sale.QuantityInput = Sale.IsPrice? "$" + String(Sale.QuantityInput): String(Sale.QuantityInput)
                    this.setState({"CurrentSale": Sale})
                }
                else {

                    // ++++++++++++++++++++++++++++++++++++++++++++
                    // ++++   SET THE STATE AS IT SHOULD   ++++++++
                    // ++++++++++++++++++++++++++++++++++++++++++++
                    const NewSearch = Results.map(Element => {
                        return {Name: Element.Name, Price: Element.PriceOfSale, Barcode: Element.BarCodes[0]}
                    })

                    const Elements = document.getElementById('SearchInputDropdown')
                    const Options = {
                        autoTrigger: true, 
                        constrainWidth: false,
                        onCloseEnd: () => {
                            const Instance = M.Dropdown.getInstance(Elements)
                            if (Instance != undefined) Instance.destroy()
                        }
                    }
                    M.Dropdown.init(Elements, Options)

                    this.setState({CurrentSearch: NewSearch})
                }
            })
            .catch(ErrorMessageFromServer => console.log(ErrorMessageFromServer))
        }
        else {

            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // ++++++           CHECK THE PRODUCT             +++++++++
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if (Sale.BarCodeInput.split(" ").length === 2 && (Sale.BarCodeInput[0] === '$' || Sale.BarCodeInput[0] > -1)) {
                const BarCodeInputAndBarCodeInput = Sale.BarCodeInput.split(" ")
                
                Sale.QuantityInput = BarCodeInputAndBarCodeInput[0]
                Sale.BarCodeInput  = BarCodeInputAndBarCodeInput[1]
            }

            Sale.QuantityInput = Sale.QuantityInput.toUpperCase().trim()
            Sale.BarCodeInput = Sale.BarCodeInput.toUpperCase().trim()
            Sale.IsPrice = Sale.QuantityInput[0] === '$'
            Sale.QuantityInput = Number(Sale.QuantityInput.slice(Sale.IsPrice? 1: 0))

            if (Number.isNaN(Sale.QuantityInput) || Sale.QuantityInput <= 0) {
                const ErrorMessage = (
                    <div>
                        <h5> Error con el Precio ó Cantidad </h5>
                        <br />
                        Para salir de este diálogo puedes presionar la tecla 'esc' ó 'enter'
                    </div>
                )

                this.props.ShowErrorMessage(ErrorMessage, () => this.handleChangeOfFocus({Position: "QuantityInput"}))
                return
            }


            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // ++++++     SEND TO FIND THE PRICE AND NAME     +++++++++
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            SentData('/GetProductDataFromBarCode', Sale.BarCodeInput)
            .then(Results => {

                // ++++++++++++++++++++++++++++++++++++++++++++
                // ++++++          IF NOT FIND        +++++++++
                // ++++++++++++++++++++++++++++++++++++++++++++
                if (Results['Error'] != undefined) {

                    const ErrorMessage = (
                        <div>
                            <h5> Error con el Producto </h5>
                            <br />
                            {Results['Error']}
                            <br />
                            <div>
                                Para salir de este diálogo puedes presionar la tecla 'esc' ó 'enter'
                            </div>
                        </div>
                    )

                    this.props.ShowErrorMessage(ErrorMessage, () => this.handleChangeOfFocus({Position: "BarCodeInput"}))

                    Sale.BarCodeInput = ""
                    Sale.SearchInput = ""
                    Sale.QuantityInput = Sale.IsPrice? "$" + String(Sale.QuantityInput): String(Sale.QuantityInput)
                    this.setState({"CurrentSale": Sale})
                }
                else {
                    // ++++++++++++++++++++++++++++++++++++++++++++
                    // ++++   SET THE STATE AS IT SHOULD   ++++++++
                    // ++++++++++++++++++++++++++++++++++++++++++++

                    Sale.QuantityInput = Number(Sale.QuantityInput)
                    const NewQuantity = (Sale.IsPrice)? Sale.QuantityInput / Number(Results['UnitPrice']): Sale.QuantityInput

                    const Product = {
                        Quantity: NewQuantity,
                        Name: Results['Name'],
                        UnitPrice: Results['UnitPrice'],
                    }

                    this.props.AddProduct(Product)

                    Sale.QuantityInput = "1"
                    Sale.BarCodeInput = ""
                    Sale.SearchInput = ""
                    this.handleChangeOfFocus({Position: "BarCodeInput"})
                    this.setState({"CurrentSale": Sale})
                }
            })
            .catch(ErrorMessageFromServer => console.log(ErrorMessageFromServer))
        }
    }


    componentDidUpdate() {
        M.updateTextFields()

        const Elements = document.getElementById('SearchInputDropdown')
        const Instance = M.Dropdown.getInstance(Elements)
        if (Instance != undefined) Instance.open()
    }

    // =========================================================
    // ============           RENDER              ==============
    // =========================================================
    render () {

        const HotKeysMappingForNewProduct = {
            KeyMap: {
                AddCurrentProduct:  ['enter'],
                MoveToRight:        ['shift+right', 'alt+right', 'ctrl+right'],
                MoveToLeft:         ['shift+left',  'alt+left',  'ctrl+left'],
                SetFocusToQuantity: ['f1', '|', '!'],
                SetFocusToBarCode:  ['f2', '@', '"'],
                SetFocusToSearch:   ['f3', '#', '·'],
            },
            Handlers: {
                'AddCurrentProduct':   (e) => this.handleAddCurrentProduct(),
                'MoveToRight':         (e) => this.handleChangeOfFocus({Direction: "right"}),
                'MoveToLeft':          (e) => this.handleChangeOfFocus({Direction: "left"}),
                'SetFocusToQuantity':  (e) => this.handleChangeOfFocus({Position: "QuantityInput"}),
                'SetFocusToBarCode':   (e) => this.handleChangeOfFocus({Position: "BarCodeInput"}),
                'SetFocusToSearch':    (e) => this.handleChangeOfFocus({Position: "SearchInput"}),
            }
        }

        return (
            <HotKeys keyMap={HotKeysMappingForNewProduct.KeyMap} handlers={HotKeysMappingForNewProduct.Handlers}>
                <div className="row">
                    
                    {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                    {/*+++++++++    QUANTITY OR PRICE INPUT     ++++++++++++*/}
                    {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                    <div className="input-field col s2">
                        <input 
                            id           = "QuantityInput" 
                            type         = "text"
                            value        = {this.state.CurrentSale.QuantityInput}
                            onFocus      = {() => this.handleChangeOfFocus({Position: "QuantityInput"})}
                            onChange     = {(e) => this.handleCurrentSaleData(e.target.value, "QuantityInput")}
                        />
                        <label htmlFor="QuantityInput" className="active">
                            <span style={{fontSize: '0.8em'}}>
                                Cantidad
                            </span>
                            &nbsp;
                            <span className="hide-on-small-only"  style={{fontSize: '0.8em'}}>
                                o Precio
                            </span>
                        </label>
                    </div>

                    {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                    {/*+++++++++          BAR CODE INPUT        ++++++++++++*/}
                    {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                    <div className="input-field col s4">
                        <input 
                            id        = "BarCodeInput" 
                            type      = "text"
                            autoFocus = {true}
                            value     = {this.state.CurrentSale.BarCodeInput}
                            onFocus   = {() => this.handleChangeOfFocus({Position: "BarCodeInput"})}
                            onChange  = {(e) => this.handleCurrentSaleData(e.target.value, "BarCodeInput")}
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
                    <div className="input-field col s4">
                        <input 
                            id        = "SearchInput" 
                            type      = "text"
                            value     = {this.state.CurrentSale.SearchInput}
                            onFocus   = {() => this.handleChangeOfFocus({Position: "SearchInput"})}
                            onChange  = {(e) => this.handleCurrentSaleData(e.target.value, "SearchInput")}
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
                    <a className="dropdown-trigger" id='SearchInputDropdown' data-target='SearchInputDropdownTarget' />

                    {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                    {/*+++++++++         ADD BUTTON             ++++++++++++*/}
                    {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                    <div className="col s1">
                        <p className="">
                            <button 
                                onClick   = {() => this.handleAddCurrentProduct()}
                                className = "waves-effect btn-floating waves-light green btn-flat">
                                <i className="material-icons">
                                    {(this.state.CurrentSale.SearchInput == "")? "arrow_forward": "search"}
                                </i>
                            </button>
                        </p>
                    </div>

                    <ul id='SearchInputDropdownTarget' className='dropdown-content'>
                        {this.state.CurrentSearch.map(Element => {
                            return (
                                <li key={Element.Name}>
                                    <a onClick={() => {
                                            const Sale = Object.assign({}, this.state.CurrentSale)
                                            Sale.BarCodeInput = Element.Barcode
                                            Sale.SearchInput = ""

                                            const DropElement = document.getElementById("SearchInputDropdown")
                                            M.Dropdown.getInstance(DropElement).destroy()

                                            this.handleAddCurrentProduct(Sale)
                                        }
                                    }>
                                        (${Element.Price}): {Element.Name}
                                    </a>
                                </li>        
                            )
                        })
                        }
                    </ul>

                </div>

            </HotKeys>
        )
    }


}



// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ||||||||||||           SHOW PRODUCT TABLE      ||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function ProductsTable(props) {

    const DeleteItem = (Product) => {
        props.handleSetState((PrevState) => {
            const NewProducts = PrevState.Products.filter(Item => Item.Name !== Product.Name)
            return {"Products": NewProducts}
        })
    }

    const TableProductsItems = props.Products.map( (Product) => {

        let VisualQuantity = (Number.isInteger(Product.Quantity))? 
            Product.Quantity: 
            Product.Quantity.toFixed(3)

        return (
            <tr key={Product.Name} className="hoverable">
                <td>  &ensp; {VisualQuantity}                               </td>
                <td>  {ShowCuteMode(Product.Name)}                          </td>
                <td>$ {Product.UnitPrice.toFixed(2)}                        </td>
                <td>$ {(Product.UnitPrice * Product.Quantity).toFixed(2)}   </td>
                <td>
                    <a 
                        onClick      = {() => DeleteItem(Product)}
                        className    = "waves-effect waves-light btn-flat red lighten-1">
                        <i className = "white-text material-icons">close</i>
                    </a>
                </td>
            </tr>
        )
    })


    return (
        <div className="row">
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
    )
}

