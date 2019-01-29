import React from 'react'
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from './compCSS/popupCss'
import axios from 'axios'

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { open: true }
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

                try{
                   let res = await axios.post('https://localhost:8443/api/login', passingDB)
                   console.log(res)

                }catch(err){
                    console.log(err.response.status)
                    console.log(err.response.data)

                }



                // if (res) {
                //     console.log("login good")
                //     console.log(res)

                //     // this.setState({ finishReg: true })
                //     //this.setState({ open: false }) // it will close the form immediately
                // } else {
                //     console.log("login no good")
                    
                    
                //     window.alert("E-mail or Username exsisted, please try again")
                // }
            }
        });
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
                </div>
            </Popup>
        );
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default LoginForm;