import React from 'react'
import { popUpCloseTag, content } from '../compCSS/popupCss'

class ErrorVerify extends React.Component {

    render() {
        return (
                <div style={content} >
                    <div>You Verify Email has been expired. </div>
                    <p>Please check your mail box and verfy the account in 24 hours</p>
                </div>
        )

    }
}



export default ErrorVerify;