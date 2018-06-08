import React from "react"
import {Switch, Route, NavLink, HashRouter, BrowserRouter} from "react-router-dom"
import {HotKeys} from "react-hotkeys"

import AppHeader from "./AppHeader"
import AppFooter from "./AppFooter"
import SalesPage from "./SalesPage"
import Home from "./Home"
import EditProduct from "./EditProduct"

const Pages = {
    SalesPage: {
        Name: "Página de Ventas",
        MiniName: "Ventas",
        Links: [
            ["Home", ".... :0"],
        ]

    }
}




// =====================================================================
// ============      APP COMPONENTS        =============================
// =====================================================================
export default class App extends React.Component {
    render () {
        return (
            <HotKeys 
                    keyMap   = {{ToogleBar: 'ctrl+b'}}
                    handlers = {{ToogleBar: () => document.getElementById('ToogleSideBar').click()}}>
                <header>
                    <AppHeader Page={Pages.SalesPage} />
                </header>
                <main>
                    <div className="container">
                        <br />
                        <Switch>
                          <Route exact path='/' component={Home}/>
                          <Route path='/SalesPage' component={SalesPage}/>
                          <Route path='/EditProduct' component={EditProduct}/>
                        </Switch>
                    </div>
                </main>
                <br /><br /><br />
                <footer 
                    className = "page-footer blue-grey darken-3" 
                    style     = {{left: "0", bottom: "0", width: "100%"}}>
                    <AppFooter/>
                </footer>
            </HotKeys>
        )
    }
}


