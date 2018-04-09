import React from "react";

// =====================================================================
// ============      APP COMPONENTS        =============================
// =====================================================================
export default class App extends React.Component {
    render () {
        return (
            <header>

                {/* NAV BAR FOR DESKTOP */}
                <div className="navbar-fixed">
                    <nav className="indigo darken-2">
                        
                        <div className="nav-wrapper container">
                            
                            {/* NAME OF PAGE */}
                            <div className="brand-logo white-text" style={{fontSize: '1.5rem'}}>
                                {/* HOME FOR DESKTOP */}
                                <a className="hide-on-med-and-down" href="/index.html">
                                    <i className="material-icons">home</i>
                                </a>
                                {/* NAME OF THIS PAGE */}
                                Sales Pages
                            </div>

                            {/* HOME FOR MOBILE */}
                            <a href="/MaterializeWebTemplate/Web/" className="brand-logo right hide-on-large-only">
                                <i className="material-icons white-text">home</i>
                            </a>

                            {/* Menu for Mobile */}
                            <a href="#" data-activates="mobile-demo" className="button-collapse">
                                <i className="material-icons white-text">menu</i>
                            </a>

                            {/* Links for Normal Web */}
                            <ul className="right hide-on-med-and-down">
                                <li>
                                    <a className="white-text" href="index.html">
                                        Home                                
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                {/* SIDE BAR FOR MOBILE */}
                <ul className="side-nav indigo lighten-1" id="mobile-demo">
                    {/* Links for Mobile Web */}
                    <br /><br />
                    <div id="MobileHeaderSideNav">
                        <h4 className="center-align white-text" style={{fontWeight: 300}}>
                            <b>Pages</b> Menu
                        </h4>
                    </div>
                    <br /><br />
                  
                    <li>
                        <a className="white-text" href="index.html">
                            <span className="flow-text">
                                Home                        
                            </span>
                        </a>
                    </li>
                </ul>

            </header>
        );
    }
}


