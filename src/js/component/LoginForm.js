import React from 'react'
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from './compCSS/popupCss'
import axios from 'axios'
import actions_userPage from '../actions/userPage';
import { connect } from "react-redux"
import SocialButton from './SocialButton'
import ErrAllInOne from './HandleOKandError/ErrAllInOne'

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            userID: '',
            name: '',
            email: '',
            errMsg: ""
        }
        //this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }



    // openModal = () => {
    //     this.setState({ open: true })
    // }

    closeModal = () => {
        this.setState({ open: false })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let passingDB = {
                    username_or_email: values.userName,
                    password: values.password,
                }

                try {
                    let res = await axios('https://localhost:8443/api/login', {
                        method: "post",
                        data: passingDB,
                        withCredentials: true
                    })
                    console.log(res)

                    // put userinfo in redux
                    const user = await axios('https://localhost:8443/api/profile', {
                        method: "get",
                        withCredentials: true
                    })
                    this.props.storeMyUser(user.data)
                    this.setState({ open: false })

                } catch (err) {
                    console.log(err.response.data)
                    if (err.response.data.message) {
                        this.setState({ errMsg: err.response.data.message })
                    } else {
                        this.setState({ errMsg: "Connection fail, please try again later" })
                    }

                }
            }
        });
    }



    handleSocialLoginFailure = (err) => {
        console.log(err)
    }


    responseFacebook = (res) => {

        let facebook_id = res._profile.id
        let access_token = res._token.accessToken
        let displayed_name = res._profile.name
        let profile_picutre = res._profile.profilePicURL
        let phone_number = ""
        console.log(res)
        if (!res._token.accessToken) {
            return console.log("hi")
        }
        console.log(res._token.accessToken)
        if (access_token) {
            axios(`https://localhost:8443/api/facebook_login`,
                {
                    method: "post",
                    data: {
                        facebook_id: facebook_id,
                        access_token: access_token,

                    },
                    withCredentials: true
                }
            )
                .then(async () => {

                    try {
                        const user = await axios('https://localhost:8443/api/profile', {
                            method: "get",
                            withCredentials: true
                        })

                        console.log(user.data)
                        this.props.storeMyUser(user.data)
                        console.log('fb login success')

                    } catch (err) {
                        if (err.response.data.message) {
                            this.setState({ errMsg: err.response.data.message })
                        } else {
                            this.setState({ errMsg: "Connection fail, please try again later" })
                        }
                    }
                }
                )
                .catch(err => {
                    console.log(err.response.status)
                    console.log(err.response)
                    console.log(err.response.data)
                    console.log(err.response.data.message)
                })
        }
    }
    responseGoogle = (res) => {

        let google_id = res._profile.id
        let name = res._profile.name
        let access_token = res._token.accessToken
        let id_token = res._token.idToken
        
        console.log(res)
        if (access_token) {
            console.log("try login google")
            axios(`https://localhost:8443/api/google_login`,
                {
                    method: "post",
                    data: {
                        google_id: google_id,
                        access_token: access_token,
                        id_token: id_token,
                        name: name
                    },
                    withCredentials: true
                }
            )
                .then(async () => {
                    console.log('google login success')
                    const user = await axios('https://localhost:8443/api/profile', {
                        method: "get",
                        withCredentials: true
                    })

                    console.log(user.data)
                    this.props.storeMyUser(user.data)
                }
                )
                .catch(err => {
                    console.log(err.response.status)
                    console.log(err.response)
                    console.log(err.response.data)
                    console.log(err.response.data.message)
                })
        }
    }

    render() {




        const { getFieldDecorator } = this.props.form;
        return (
            <Popup contentStyle={content} open={this.state.open} closeOnDocumentClick onClose={this.props.handleLogin}  >
                <div style={{ textAlign: "center", }}>
                    <a style={popUpCloseTag} onClick={this.props.handleLogin}>&times;</a>
                    {!this.state.errMsg && <div style={{ position: "absolute", left: "50%", top: "40%", transform: 'translate(-50%, -50%)' }}>
                        <Form onSubmit={this.handleSubmit} className="login-form ">
                            <div style={{ marginBottom: "10px" }}>
                                <h1>Login</h1>
                                <span>Enter your login details</span>
                            </div>

                            <Form.Item>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username or e-mail' }],
                                })(
                                    <Input size="large" prefix={<Icon type="user" style={{ color: 'white' }} />} placeholder="Username / E-mail" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input size="large" prefix={<Icon type="lock" style={{ color: 'white' }} />} type="password" placeholder="Password" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: false,
                                })(
                                    <Checkbox >Remember me</Checkbox>
                                )}
                                <a className="login-form-forgot" href="">Forgot password?</a>
                                <br />
                                <Button type="default" htmlType="submit" className="myBtn" >
                                    Log in
                            </Button>
                                <Button type="default" className="myRegBtn" >
                                    Register now!
                            </Button>

                            </Form.Item>
                        </Form>
                        <div>
                            <SocialButton className="myFbBtn"
                                provider='facebook'
                                appId='372390923567171'
                                onLoginSuccess={this.responseFacebook}
                                onLoginFailure={this.handleSocialLoginFailure}
                            >
                                Login with Facebook
                            </SocialButton>

                            <SocialButton className="myGoogleBtn"
                                provider='google'
                                appId='980192618991-ntaogv3tkbg21ve3qhfjq8us1f1au1gb.apps.googleusercontent.com'
                                onLoginSuccess={this.responseGoogle}
                                onLoginFailure={this.handleSocialLoginFailure}
                            >
                                Login with Google
                            </SocialButton>
                        </div>
                    </div>}
                    {this.state.errMsg && <ErrAllInOne err={this.state.errMsg} rubyClose={this.closeModal} />}
                </div>
            </Popup>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeMyUser: (user) => {
            dispatch(actions_userPage.storeMyUser(user))
        }
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm));

export default LoginForm;