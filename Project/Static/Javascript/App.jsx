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
                    
                    <div className="center-align row section">
                        <div className="col s12">
                            <SalesPage />
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}


