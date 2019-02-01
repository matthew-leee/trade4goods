import React from 'react'
import Axios from 'axios';
import { Link } from "react-router-dom";
import { popUpCloseTag, content } from './compCSS/popupCss'
class VerifyEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVerify: false,
            isError:false,
            errorMsg:""
        }
    }



    async componentDidMount() {

        try {
            let good = await Axios(`https://localhost:8080/api/verifyEmail/${this.props.match.params.id}`,
                {method: "post",
                withCredentials: true}
              )
            this.setState({isVerify: true})
            

        } catch (err) {
            console.log(err.response.status)
            console.log(err.response)
            console.log(err.response.data)
            console.log(err.response.data.message)
            this.setState({isError: true, errorMsg: err.response.data.message })
        }



    }

    render() {
        return (
            <div style={content}>

                {!this.state.isVerify && !this.state.isError &&<div>
                    <img src={require('./asset/gif/loadingpic.gif')}></img>
                    <h1>Verifying...</h1>
                </div>}

                {this.state.isVerify && <div>

                    <div>You have successfully verified the email!</div>
                    <Link to="/">Return</Link>
                </div>}


                {this.state.isError && <div>
                    <h1>{this.state.errorMsg}</h1>
                    <Link to="/">Return</Link>
                </div>}


            </div>

        )
    }
}


export default VerifyEmail;