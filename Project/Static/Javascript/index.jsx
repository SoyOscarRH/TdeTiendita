// ======================================================================
// ============          WEB APP IN REACT           =====================
// ======================================================================
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"


$(document).ready(function() {
    $(".button-collapse").sideNav()
})

ReactDOM.render(<App />, document.getElementById("ReactApp"))
