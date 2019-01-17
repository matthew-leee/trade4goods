import React from 'react'
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import {popUpCloseTag, content} from './compCSS/popupCss'

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { open: true }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }



    openModal = () => {
        this.setState({ open: true })
    }

    closeModal = () => {
        this.setState({ open: false })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //some stuff is success
                this.setState({ open: false })
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Popup open={this.state.open} closeOnDocumentClick onClose={this.closeModal}>
                <div style={content}>
                    <a style={popUpCloseTag} onClick={this.closeModal}>&times;</a>
                    <Form onSubmit={this.handleSubmit} className="login-form">
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
                                <Checkbox style={{ color: 'grey' }}>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <br />
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{ backgroundColor: "grey" }}>
                                Log in
                    </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </Popup>
        );
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default LoginForm;