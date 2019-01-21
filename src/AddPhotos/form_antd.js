/* jshint expr: true */
import React, { Component } from "react"

import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Tag
} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import FormItem from "antd/lib/form/FormItem";
import actions from "./actions"
import { connect } from "react-redux"
import GeneralTags from "./tags_antd"

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: 'HK',
    label: 'Hong Kong',
    children: [
      {
        value: 'central',
        label: 'Central'
      },
      {
        value: "admiralty",
        label: "Admiralty"
      },
      {
        value: "taiKoo",
        label: "Tai Koo"
      }
    ],
  }, {
    value: 'KLN',
    label: 'Kowloon',
    children: [
      {
        value: 'tsimShaTsui',
        label: 'Tsim Sha Tsui'
      },
      {
        value: 'wongTaiSin',
        label: 'Wong Tai Sin'
      }
    ],
  }, {
    value: "NT",
    label: "New Terroritories",
    children: [
      {
        value: "tsuenWan",
        label: "Tsuen Wan"
      },
      {
        value: "yuenLong",
        label: "Yuen Long"
      }
    ]
  }
];

class AddPhotoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    }
    console.log(props.typingTag)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
       console.log(values)
       values.tags = [...this.props.finishedTag]
       console.log (values)
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
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
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

      <div>
        <Form onSubmit={this.handleSubmit}>

          <Form.Item
            {...formItemLayout}
            label="Product Name"
          >
            {getFieldDecorator('productName', {
              rules: [{ required: true, message: 'Please input the name of your product', whitespace: true }],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Product Genuineness"
          >
            {getFieldDecorator('genuineness', {
              rules: [{ required: true, message: 'Choose a genuineness rating' }],
            })(
              <Select defaultValue="100">
                <Option value="100">100% Genuine</Option>
                <Option value="50">Not Sure</Option>
                <Option value="1">No Brand or N/A</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Product Description"
          >
            {getFieldDecorator('productDescription', {
              rules: [{ required: true, message: 'Describe your product', whitespace: true }],
            })(
              <TextArea />
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Trade Location"
          >
            {getFieldDecorator('location', {
              initialValue: ['HK', 'central'],
              rules: [{ type: 'array', required: true, message: 'Select a trade location' }],
            })(
              <Cascader options={residences} />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Expectation">
            {
              getFieldDecorator("expectation", {
                rules: [
                  {
                    required: true, message: 'List your expected products for exchange'
                  }
                ]
              })(
                <TextArea />
              )
            }
          </Form.Item>

          <Form.Item {...formItemLayout} label="Tags">
            <Input placeholder="Press Spacebar after finishing One Tag" onChange={this.props.handleChange} value={this.props.typingTag} />
            <GeneralTags tags={this.props.finishedTag} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>


          

        </Form>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    typingTag: state.typingTag,
    finishedTag: state.finishedTag
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e) => {
      const input = e.target.value
      if (input.indexOf(" ") == input.length - 1) {
        dispatch(actions.AddPhotosForm_finishedTag(input.slice(0, input.length - 1)))
      } else {
        dispatch(actions.AddPhotosForm_typingTag(input))
      }
    }
  }
}

// set id in the name field
const WrappedAddPhotoForm = Form.create({ name: 'AddPhotoForm' })(connect(mapStateToProps, mapDispatchToProps)(AddPhotoForm));

export default WrappedAddPhotoForm