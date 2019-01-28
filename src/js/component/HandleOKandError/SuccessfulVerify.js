import React from 'react'
import { popUpCloseTag, content } from '../compCSS/popupCss'

class SuccessfulVerify extends React.Component {

    render() {
        return (
                <div style={content} >
                    <div>You Have Successfully Registered. </div>
                    <p>Feel free to play arround!</p>
                </div>
        )

    }
}



export default SuccessfulVerify;