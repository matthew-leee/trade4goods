import React from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, } from 'antd';
import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from './compCSS/popupCss'
import TermsAndConditions from './TermsAndCondition'
import axios from 'axios'
import SuccessfulReg from './HandleOKandError/SuccessfulReg'
import SocialButton from './SocialButton'




class RegistrationFormgp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            confirmDirty: false,
            open: true,
            terms: false,
            finishReg: false,
            isLoggedIn: false,
            userID: '',
            name: '',
            email: '',

        };
        this.closeModal = this.closeModal.bind(this)
        this.openTerms = this.openTerms.bind(this)
    }


    closeModal = () => {
        this.setState({ open: false })
    }


    openTerms = () => {
        this.setState({ terms: !this.state.terms })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const passingDB = {
                    username: values.username,
                    password: values.password,
                    confirmed_password: values.confirmed_password,
                    email: values.email,
                    displayed_name: values.displayed_name,
                    phone_number: values.phone_number,
                    profile_picutre: ""
                }

                try {
                    const res = await axios('https://localhost:8080/api/signup', {
                        method: "post",
                        data: passingDB,
                        withCredentials: true
                    })


                    if (res) {
                        console.log("register good")
                        this.setState({ finishReg: true })
                    }




                } catch (err) {
                    if (err.response.data.message) {
                        window.alert(err.response.data.message)
                        console.log("register no good")
                    } else {
                        window.alert("Connection fail, please try again later")
                        console.log("register no good")
                    }

                }
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }




    handleSocialLoginFailure = (err) => {
        console.log(err)
    }


    responseFacebook = (res) => {

        let facebook_id = res._profile.id
        let email = res._profile.email
        let access_token = res._token.accessToken
        let name = res._profile.id
        let displayed_name = res._profile.name
        let phone_number = ""
        let profile_picture = ""

        if (access_token) {
            axios(`https://localhost:8080/api/signup`,
                {
                    method: "post",
                    data: {
                        facebook_id: facebook_id,
                        access_token: access_token,
                        name: name,
                        email: email,
                        profile_picture: profile_picture,
                        phone_number: phone_number,
                        displayed_name: displayed_name
                    },
                    withCredentials: true
                }
            )
                .then(() => {
                    axios(`https://localhost:8080/api/profile/`,
                        {
                            method: "post",
                            data: {
                                profile_picture: profile_picture,
                                phone_number: phone_number,
                                displayed_name: displayed_name
                            },
                            withCredentials: true
                        }
                    )
                        .then(() => console.log('fb register success'))
                        .catch((err) => {
                            console.log("api profile create fail")
                            console.log(err.response.status)
                            console.log(err.response)
                            console.log(err.response.data)
                            console.log(err.response.data.message)
                        })
                }

                )
                .catch(err => {
                    console.log("api sign up create fail")
                    console.log(err.response.status)
                    console.log(err.response)
                    console.log(err.response.data)
                    console.log(err.response.data.message)
                })
        }
    }

    responseGoogle = (res) => {

        let google_id = res._profile.id
        let email = res._profile.email
        let accessToken = res._token.accessToken
        let id_token = res._token.idToken
        let name = res._profile.id

        if (accessToken) {
            axios(`https://localhost:8080/api/signup`,
                {
                    method: "post",
                    data: {
                        google_id: google_id,
                        access_token: accessToken,
                        id_token: id_token,
                        name: name,
                        email: email
                    },
                    withCredentials: true
                }
            )
                .then(() =>
                    console.log('google register success')
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
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        return (

            <Popup contentStyle={content} open={this.state.open} closeOnDocumentClick onClose={this.props.handleRegToggle}>
                <div style={{ textAlign: "center", }}>
                    <a style={popUpCloseTag} onClick={this.props.handleRegToggle}>&times;</a>
                    {!this.state.finishReg &&

                        <div style={{ position: "absolute", left: "50%", top: "40%", transform: 'translate(-50%, -50%)' }}>

                            <Form onSubmit={this.handleSubmit}>



                                <div style={{ marginBottom: "20px" }}>
                                    <h1>Register</h1>
                                    <span>Fill in the register details</span>
                                </div>

                                <Form.Item
                                    {...formItemLayout}
                                    label="Username"
                                >
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input your Username!', whitespace: false }, { max: 15, min: 5, message: 'Username must be 5 to 15 characters long!' }],
                                    })(
                                        <Input size="large" placeholder="Username must be 5 to 15 characters long" />
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label="Display Name"
                                >
                                    {getFieldDecorator('displayed_name', {
                                        rules: [{ required: true, message: 'Please input your display name!', whitespace: true }, { max: 15, min: 3, message: 'Display Name must be 3 to 15 characters long!' }],
                                    })(
                                        <Input size="large" placeholder="Display Name must be 3 to 15 characters long" />
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label="Phone Number"
                                >
                                    {getFieldDecorator('phone_number', {
                                        rules: [{ required: true, message: 'Please input your Phone Number!', whitespace: false }, { len: 8, message: 'Input must be number and Phone number 8 characters long!' }],
                                    })(
                                        <Input size="large" type='number' placeholder="Phone number must 8 characters long" />
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label="E-mail"
                                >
                                    {getFieldDecorator('email', {
                                        rules: [{
                                            type: 'email', message: 'The input is not valid E-mail!',
                                        }, {
                                            required: true, message: 'Please input your E-mail!',
                                        }],
                                    })(

                                        <Input size="large" placeholder="E-mail" />

                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label="Password"
                                >
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: true, message: 'Please input your password!',
                                        }, {
                                            validator: this.validateToNextPassword,
                                        }, { max: 15, min: 5, message: 'Password must be 5 to 15 characters long!' }],
                                    })(
                                        <Input size="large" type="password" placeholder="Password" />
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label="Confirm Password"
                                >
                                    {getFieldDecorator('confirmed_password', {
                                        rules: [{
                                            required: true, message: 'Please confirm your password!',
                                        }, {
                                            validator: this.compareToFirstPassword,
                                        }],
                                    })(
                                        <Input size="large" type="password" onBlur={this.handleConfirmBlur} placeholder="Confirm Password" />
                                    )}
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    {getFieldDecorator('agreement', {
                                        rules: [{
                                            required: true, message: 'Please confirm to read the agreement',
                                        }],
                                        valuePropName: 'checked',
                                    })(
                                        <Checkbox>I have read the <span onClick={this.openTerms} style={{ color: "blue" }}>agreement</span></Checkbox>
                                    )}
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit" className="myBtn">Register</Button>
                                </Form.Item>
                            </Form>

                            <div style={{ marginLeft: "222px" }}>
                                <SocialButton
                                    provider='facebook'
                                    appId='372390923567171'
                                    onLoginSuccess={this.responseFacebook}
                                    onLoginFailure={this.handleSocialLoginFailure}
                                    className="myFbBtn"

                                >
                                    Register with Facebook
                                </SocialButton>
                                <SocialButton
                                    provider='google'
                                    appId='980192618991-ntaogv3tkbg21ve3qhfjq8us1f1au1gb.apps.googleusercontent.com'
                                    onLoginSuccess={this.responseGoogle}
                                    onLoginFailure={this.handleSocialLoginFailure}
                                    className="myGoogleBtn"
                                >
                                    Register with Google
                                </SocialButton>
                            </div>
                        </div>}
                    {this.state.terms && <TermsAndConditions openTerms={this.openTerms} style={{ color: "black" }} />}
                    {this.state.finishReg && <div><SuccessfulReg /></div>}
                    {this.state.finishReg && <a onClick={this.props.handleRegToggle}>return</a>}
                </div>
            </Popup>
        );
    }
}

const RegistrationForm = Form.create({ name: 'register' })(RegistrationFormgp);


export default RegistrationForm;