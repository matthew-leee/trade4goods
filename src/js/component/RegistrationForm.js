import React from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, } from 'antd';
import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from './compCSS/popupCss'
import TermsAndConditions from './TermsAndCondition'
import axios from 'axios'
import SuccessfulReg from './HandleOKandError/SuccessfulReg'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationFormgp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            open: true,
            terms: false,
            finishReg: false

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
                    email: values.email
                }
                // console.log('Received values of form: ', passingDB);
                const res = await axios.post('https://localhost:8443/api/signup', passingDB)
                if (res) {
                    console.log("register good")
                    this.setState({ finishReg: true })
                    //this.setState({ open: false }) // it will close the form immediately
                } else {
                    console.log("register no good")
                    window.alert("E-mail or Username exsisted, please try again")
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

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['@gmail.com', '@hotmail.com', '@yahoo.com.hk', '@qq.com'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
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

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (

            <Popup open={this.state.open} closeOnDocumentClick onClose={this.props.handleRegToggle}>
                <div style={content}>
                    <a style={popUpCloseTag} onClick={this.props.handleRegToggle}>&times;</a>
                    {!this.state.finishReg && <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            label="Username"
                        >
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your Username!', whitespace: true }, { max: 15, min: 5, message: 'Username must be 5 to 15 characters long!' }],
                            })(
                                <Input placeholder="Username must be 5 to 15 characters long" />
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
                                <AutoComplete
                                    dataSource={websiteOptions}
                                    onChange={this.handleWebsiteChange}
                                    placeholder="E-mail"
                                >
                                    <Input />
                                </AutoComplete>
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
                                <Input type="password" placeholder="Password" />
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
                                <Input type="password" onBlur={this.handleConfirmBlur} placeholder="Confirm Password" />
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
                            <Button type="primary" htmlType="submit">Register</Button>
                        </Form.Item>
                    </Form>}
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