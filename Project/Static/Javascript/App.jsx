import React from "react";
import AppHeader from "./AppHeader"
import SalesPage from "./SalesPage"



const Pages = {
    SalesPage: {
        Name: "Sales Page",
        MiniName: "Sales",
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
                    <AppHeader Page={Pages.SalesPage}>
                    </AppHeader>
                </header>

                <div className="container">
                    <SalesPage />
                </div>
            </div>
        );
    }
}


