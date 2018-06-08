import React from "react"
import {HotKeys} from "react-hotkeys"


// =====================================================================
// ============      APP COMPONENTS        =============================
// =====================================================================
export default class ErrorModal extends React.Component {
	
	constructor(props) {
        super(props)
        this.state = {ErrorMessage: ""}
    }
    
    /* 
     * Show a Modal and call CallbackOnClose when close 
     */
    ShowErrorMessage(Message, CallbackOnClose) {
        this.setState({ErrorMessage: Message})
        const InstanceModal = M.Modal.getInstance(document.getElementById('ErrorModal'))
        InstanceModal.options.onCloseEnd = CallbackOnClose
        InstanceModal.open()
    }

    componentDidMount() {
        M.Modal.init(document.getElementById('ErrorModal'), {dismissible: true, inDuration: 80, outDuration: 80})
    }


    render () {

    	return (
            <HotKeys 
                keyMap   = {{CloseModal: 'enter'}}
                handlers = {{CloseModal: (e) => {InstanceModal = M.Modal.getInstance(document.getElementById('ErrorModal')).close()}}}>
                
                <div id="ErrorModal" className="modal modal-fixed-footer" style={{width: '70%'}} >
                    <div className="modal-content">
                        <h4>Error</h4>
                        {this.state.ErrorMessage}
                    </div>
                    <div className="modal-footer">
                        <a className="btn-flat modal-close waves-effect waves-red red lighten-2">
                            <span className="white-text">Salir</span>
                        </a>
                    </div>
                </div>

            </HotKeys>
    	)
    }
}