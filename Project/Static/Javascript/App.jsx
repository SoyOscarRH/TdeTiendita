import React from "react"
import {Switch, Route, NavLink, HashRouter, BrowserRouter} from "react-router-dom"
import {HotKeys} from "react-hotkeys"

import AppHeader from "./AppHeader"
import AppFooter from "./AppFooter"
import SalesPage from "./SalesPage"
import Products from "./Products"

const Pages = {
    SalesPage: {
        Name: "Página de Ventas",
        MiniName: "Ventas",
        Links: [
            ["Home", ".... :0"],
        ]

    }
}

const Home = () => (
    <div>
        <span> Mira, funciono </span>
    </div>
)


// =====================================================================
// ============      APP COMPONENTS        =============================
// =====================================================================
export default class App extends React.Component {
    render () {
        return (
            <HotKeys 
                    keyMap   = {{ToogleBar: 'b'}}
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
                          <Route path='/Products' component={Products}/>
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


