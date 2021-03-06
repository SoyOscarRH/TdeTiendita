import React from "react"
import {Link} from "react-router-dom"
import {ShowCuteMode} from "./CoolFunctions.js"

// =====================================================================
// ============     HEADER COMPONENT       =============================
// =====================================================================
export default class AppHeader extends React.Component {

    constructor(props) {
        super(props)

        document.addEventListener('DOMContentLoaded', function() {
            const Elements = document.querySelectorAll('.sidenav')
            const Sidenavs = M.Sidenav.init(Elements, {draggable: true, edge: "left"})
        })
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
                                T de Tiendita
                            </div>

                            {/*+++++++++++   LINK TO HOME   ++++++++++++*/}
                            <Link to='/' className="brand-logo right">
                                <i className="material-icons white-text">home</i>
                            </Link>


                            {/*+++++++++++      MENU       ++++++++++++++*/}
                            <a id="ToogleSideBar" data-target="SideMenu" className="sidenav-trigger show-on-large">
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
                                <h5 className="white-text" style={{fontWeight: 300}}>
                                    Menú de <b> Páginas</b>
                                </h5>

                                <div className="background">
                                  <img src="/Distribution/Graphics/BackgroundBlue.jpg" />
                                </div>

                                <a><img className="circle" src="/Distribution/Graphics/T.png" /></a>
                                <a><span className="white-text name">{ShowCuteMode(UserName)}</span></a>
                                <a><span className="white-text email">{UserName}@tdetiendita.com</span></a>
                            </div>
                        </div>
                    </li>
                    <li><a className="subheader">Enlances</a></li>
                    <li>
                        <Link
                            className = "waves-effect"
                            to        = '/'
                            onClick   = {() => M.Sidenav.getInstance(document.getElementById("SideMenu")).close()}>
                            <i className="material-icons">home</i>
                            Página de Inicio
                        </Link>
                    </li>
                    <li><a className="subheader">Analíticas</a></li>
                    <li>
                        <Link
                            className = "waves-effect"
                            to        = '/Analytics'
                            onClick   = {() => M.Sidenav.getInstance(document.getElementById("SideMenu")).close()}>
                            <i className="material-icons">assessment</i>
                            Resúmen de Ventas
                        </Link>
                    </li>
                    <li><div className="divider" /></li>

                    <li><a className="subheader">Productos</a></li>
                    <li>
                        <Link
                            className = "waves-effect"
                            to        = '/SalesPage'
                            onClick   = {() => M.Sidenav.getInstance(document.getElementById("SideMenu")).close()}>
                            <i className="material-icons">attach_money</i>
                            Página de Ventas
                        </Link>
                    </li>
                    <li>
                        <Link
                            className = "waves-effect"
                            to        = '/EditProduct'
                            onClick   = {() => M.Sidenav.getInstance(document.getElementById("SideMenu")).close()}>
                            <i className="material-icons">edit</i>
                            Editar Productos
                        </Link>
                    </li>
                    <li><a className="subheader">Sesión</a></li>
                    <li>
                        <a
                            className = "waves-effect"
                            href = "/logout"
                        >
                            <i className="material-icons">exit_to_app</i>
                            Cerrar Sesión
                        </a>
                    </li>
                </ul>




            </div>
        );
    }
}
