import React from "react"
import {Link} from "react-router-dom"

// =====================================================================
// ============     HEADER COMPONENT       =============================
// =====================================================================
export default class AppFooter extends React.Component {

    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                {/* ========================= */}
                {/* ==        LINKS        == */}
                {/* ========================= */}
                <div className="row container">
                    {/* ========================= */}
                    {/* =======   ABOUT US   ==== */}
                    {/* ========================= */}
                    <div className="col l6 s12">
                        {/*  =========  Title   ======== */}
                        <h5 className="white-text" style={{fontSize: '1.1rem'}}>About This</h5>
                        
                        {/*  =========  Text   ======== */}
                        <span className="grey-text text-lighten-4" style={{fontSize: '0.85rem'}}>
                          This is a template for a web project
                        </span>
                    </div>

                    {/* ========================= */}
                    {/* ==   ADITIONAL LINKS   == */}
                    {/* ========================= */}
                    <div className="col l3 s12">
                        {/*  =========  Title   ======== */}
                        <h5 className="white-text" style={{fontSize: '1.1rem'}}>Additional Pages</h5>
                        
                        {/*  =========  Text   ======== */}
                        <ul style={{fontSize: '0.85rem'}}>
                          <li>
                            <a className="white-text" href="https://github.com/SoyOscarRH/">
                              <b>Autor: </b>Oscar Andrés
                            </a>
                          </li>
                          <li>
                            <a className="white-text" href="https://github.com/SoyOscarRH/">
                              Source Code
                            </a>
                          </li>
                        </ul>
                    </div>
                </div>
                
                {/* ========================= */}
                {/* ==      LAST LINE      == */}
                {/* ========================= */}
                <div className="footer-copyright blue-grey darken-4">
                    <div className="container">
                        <span className="text-lighten-3" style={{fontSize: '0.8rem'}}>December 25, 2017</span>
                        <br />
                        <b>Create by</b> <span className="text-lighten-3">CompilandoConocimiento</span>
                    </div>
                </div>
            </div>
        )
    }
}
