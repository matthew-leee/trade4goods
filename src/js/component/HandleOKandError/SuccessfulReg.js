import React from 'react'
import { content } from '../compCSS/popupCss'

class SuccessfulReg extends React.Component {

    render() {
        return (
                <div style={content} >
                    <div>You Have Successfully Registered. </div>
                    <p>Please check your mail box and verfy the account in 24 hours</p>
                </div>
        )

    }
}



export default SuccessfulReg;