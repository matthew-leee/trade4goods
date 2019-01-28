/* jshint expr: true */
import React, { Component } from "react"

import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Tag
} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import actions_addPhotos from "../../actions/addPhotos"
import { connect } from "react-redux"
import GeneralTags from "./tags_antd"
import uuidv1 from "uuid/v1"

const { Option } = Select;

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
    console.log(props)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const photos = this.props.previewPhotos.filter((u)=>{
          return u.src != "fail"
        })
        values.tags = [...this.props.finishedTag]
        values.photos = [...photos]
        console.log (values)
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

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

    const preview = this.props.previewPhotos.map((photo) => {
      if (photo.src != "fail") {
        return (
          <div className="previewBox" key={photo.key} id={photo.key}>
            <img src={photo.src} alt="" style={{ width: 100 }} />
          </div>
        )
      } else {
        return (
          <div className="previewBox" key={photo.key} id={photo.key}>
            <div className="pContainer" style={{
              width: 100, height: 100, backgroundColor: "rgb(252, 255, 241)", overflowWrap: "break-word"
            }}>
              <p style={{ color: "red" }}>This file exceeds 5MB limit</p>
            </div>
          </div>
        )
      }
    })

    return (

      <div style={{display: "flex", justifyContent: "center", alignContent: "center",  marginTop: "24vh", marginRight: "5vw"}}>
        <Form onSubmit={this.handleSubmit} style={{width: 800, height: 800}}>

          <Form.Item {...formItemLayout} label="upload Photos">
            <input type="file" multiple onChange={this.props.handleFiles} />
            <div className="imgContainer" style={{ display: "flex", flexDirection: "row" }}>
              {preview}
            </div>
          </Form.Item>

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
            <Input placeholder="Press Spacebar after finishing One Tag" onChange={this.props.handleTagChange} value={this.props.typingTag} />
            <GeneralTags tags={this.props.finishedTag} closable={true} />
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
  const s = state.photoReducer
  return {
    typingTag: s.typingTag,
    finishedTag: s.finishedTag,
    previewPhotos: s.previewPhotos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleTagChange: (e) => {
      const input = e.target.value
      if (input.indexOf(" ") == input.length - 1) {
        dispatch(actions_addPhotos.AddPhotosForm_finishedTag(input.slice(0, input.length - 1)))
      } else {
        dispatch(actions_addPhotos.AddPhotosForm_typingTag(input))
      }
    },
    handleFiles: (e) => {
      let files = [];
      for (let i = 0; i < e.target.files.length; i++) {
        files.push(e.target.files[i])
      }
      files.forEach((file) => {
        console.log(file.size)
        // if image is smaller than 5MB
        if (file.size < 5242880) {
          const reader = new FileReader();
          reader.readAsDataURL(file)
          reader.onloadend = () => {
            dispatch(actions_addPhotos.PreviewPhotos({
              src: reader.result,
              key: String(uuidv1())
            }))
          }
        } else {
          dispatch(actions_addPhotos.PreviewPhotos({
            src: "fail",
            key: String(uuidv1())
          }))
        }
      })
    }
  }
}

// set id in the name field
const AddPhotos = Form.create({ name: 'AddPhotoForm' })(connect(mapStateToProps, mapDispatchToProps)(AddPhotoForm));

export default AddPhotos