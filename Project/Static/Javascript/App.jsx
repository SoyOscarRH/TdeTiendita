import React from "react";
import AppHeader from "./AppHeader"
import SalesPage from "./SalesPage"



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
            <div>
                <header>
                    <AppHeader Page={Pages.SalesPage} />
                </header>
                <div className="container">
                    <br />
                    <SalesPage />
                </div>
            </div>
        );
    }
}


