import React from 'react'
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from './compCSS/popupCss'
import axios from 'axios'
import actions_userPage from '../actions/userPage';
import { connect } from "react-redux"
import SocialButton from './SocialButton'

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            userID: '',
            name: '',
            email: '',
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
                    console.log(user.data)
                    this.props.storeMyUser(user.data)

                } catch (err) {
                    console.log(err.response.status)
                    console.log(err.response)
                    console.log(err.response.data)

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
        console.log(facebook_id)
        console.log(access_token)
        if (access_token) {
            axios(`https://localhost:8443/api/facebook_login`,
                {
                    method: "post",
                    data: {
                        facebook_id: facebook_id,
                        access_token: access_token
                    },
                    withCredentials: true
                }
            )
                .then(async () => {
                    const user = await axios('https://localhost:8443/api/profile', {
                        method: "get",
                        withCredentials: true
                    })
                    console.log(user.data)
                    this.props.storeMyUser(user.data)
                    console.log('fb login success')
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
        let access_token = res._token.accessToken
        let id_token = res._token.idToken
        console.log(res)
        if (access_token) {
            axios(`https://localhost:8443/api/google_login`,
                {
                    method: "post",
                    data: {
                        google_id: google_id,
                        access_token: access_token,
                        id_token: id_token
                    },
                    withCredentials: true
                }
            )
                .then(() =>
                    console.log('fb login success')
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
            <Popup open={this.state.open} closeOnDocumentClick onClose={this.props.handleLogin} className="bg-dark">
                <div style={content} >
                    <a style={popUpCloseTag} onClick={this.props.handleLogin}>&times;</a>
                    <Form onSubmit={this.handleSubmit} className="login-form ">
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username or e-mail' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username / E-mail" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(
                                <Checkbox style={{ color: 'white' }}>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <br />
                            <Button type="default" htmlType="submit" className="btn btn-success" style={{ fontSize: "10px" }} >
                                Log in
                            </Button>
                            <div className="d-inline">&nbsp; Or &nbsp;</div> <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                    <div><SocialButton
                        provider='facebook'
                        appId='372390923567171'
                        onLoginSuccess={this.responseFacebook}
                        onLoginFailure={this.handleSocialLoginFailure}
                    >
                        Login with Facebook
                    </SocialButton></div>
                    <div><SocialButton
                        provider='google'
                        appId='980192618991-ntaogv3tkbg21ve3qhfjq8us1f1au1gb.apps.googleusercontent.com'
                        onLoginSuccess={this.responseGoogle}
                        onLoginFailure={this.handleSocialLoginFailure}
                    >
                        Login with Google
                    </SocialButton></div>
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