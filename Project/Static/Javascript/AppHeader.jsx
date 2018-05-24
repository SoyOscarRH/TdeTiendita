import React from "react";





// =====================================================================
// ============     HEADER COMPONENT       =============================
// =====================================================================
export default class AppHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };

        document.addEventListener('DOMContentLoaded', function() {
            const Elements = document.querySelectorAll('.sidenav');
            const Sidenavs = M.Sidenav.init(Elements, {draggable: true, edge: "left"});
        });

    }

    render () {
        return (
            
            <div>

                {/*=========================================================*/}
                {/*================       NAV BAR        ===================*/}
                {/*=========================================================*/}
                <div className="navbar-fixed">
                    <nav className="indigo darken-2">
                        <div className="nav-wrapper container">
                            
                            {/*+++++++++++   NAME OF PAGE   ++++++++++++*/}
                            <div className="brand-logo white-text center" style={{fontSize: '1.5rem'}}>
                                {this.props.Page.Name}
                            </div>

                            {/*+++++++++++   LINK TO HOME   ++++++++++++*/}
                            <a href="/index.html" className="brand-logo right">
                                <i className="material-icons white-text">home</i>
                            </a>

                            {/*+++++++++++      MENU       ++++++++++++++*/}
                            <a href="#" data-target="SideMenu" className="sidenav-trigger show-on-large">
                                <i className="material-icons white-text">menu</i>
                            </a>

                        </div>
                    </nav>
                </div>


                {/*=========================================================*/}
                {/*================      SIDE NAV        ===================*/}
                {/*=========================================================*/}
                <ul id="SideMenu" className="sidenav">
                    
                    <li>
                        <div className="user-view">
                            <div className="container">
                                <h4 className="white-text" style={{fontWeight: 300}}>
                                    <b>{this.props.Page.MiniName}</b> Menu
                                </h4>
                                
                                <div className="background">
                                  <img src="/Distribution/Graphics/BackgroundBlue.jpg" />
                                </div>
                                
                                <a href="#user"><img className="circle" src="/Distribution/Graphics/BackgroundBlue.jpg" /></a>
                                <a href="#name"><span className="white-text name">John Doe</span></a>
                                <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                            </div>
                        </div>
                    </li>


                    <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
                    <li><a href="#!">Second Link</a></li>

                    <li><div className="divider" /></li>

                    <li><a className="subheader">Subheader</a></li>
                    <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
                </ul>

                
                

            </div>
        );
    }
}