/* jshint expr: true */
import React, { Component } from "react"

import {
  Form, Input, Upload, Icon, Modal, Cascader, Select, Button,
} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import actions_addPhotos from "../../actions/addPhotos"
import actions_userPage from "../../actions/userPage"
import actions_search from "../../actions/search"
import { connect } from "react-redux"
import GeneralTags from "./tags_antd"
import uuidv1 from "uuid/v1"
import Axios from "axios";
import firebaseConfig from "../../../firebase"
import * as firebase from 'firebase';

const app = firebase.initializeApp(firebaseConfig)

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
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const photos = this.props.previewPhotos
          .filter((u) => {
            return u.src != "fail"
          })
          .map((u) => {
            return u.src
          })
        values.tags = [...this.props.finishedTag]
        values.photos = [...photos]
        console.log(values)
        const newValues = {
          name: values.productName,
          description: values.productDescription,
          expectation: values.expectation,
          trade_location: `${values.location[0]},${values.location[1]}`,
          tags: values.tags,
          image: values.photos
        }
        try {
          const addPhotosRes = await Axios("https://trade4goods.xyz/api/product", {
            method: "post",
            data: newValues,
            withCredentials: true
          })
          console.log(addPhotosRes)
          alert("success")
          this.props.form.setFieldsValue({
            productName: "",
            productDescription: "",
            expectation: "",
            location: ['HK', 'central']
          })

          // to update redux after one product is uploaded

          // fetch allProducts
          const res = await Axios.get('https://trade4goods.xyz/api/allProducts/')
          res.data.forEach((u) => {
            u.openOneModal = false
            u.openOGModal = false
            u.openMyGoodModal = false
            u.openDELModal = false
          })
          this.props.storeAllProducts(res.data)

          // fetch allUsers
          const users = await Axios.get('https://trade4goods.xyz/api/allProfile/')
          this.props.storeAllUsers(users.data)

          // fetch myUser
          const user = await Axios('https://trade4goods.xyz/api/profile', {
            method: "get",
            withCredentials: true
          })
          this.props.storeMyUser(user.data)

          this.props.handleSubmitForm()

          document.querySelector("#clearImageField").setAttribute("value", "")
        } catch (err) {
          console.log(err.response.data)
        }
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

      <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "24vh", marginRight: "5vw" }}>
        <Form onSubmit={this.handleSubmit} style={{ width: 800, height: 800 }}>

          <Form.Item {...formItemLayout} label="upload Photos">
            <input type="file" multiple onChange={this.props.handleFiles} id="clearImageField" />
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
        const id = String(uuidv1())
        if (file.size < 5242880) {
          const ref = app.storage().ref();
          const name = `${id}-${file.name}`
          const metadata = { contentType: file.type };
          const task = ref.child(name).put(file, metadata)
          task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
              console.log(url)
              dispatch(actions_addPhotos.PreviewPhotos({
                src: url,
                key: id
              }))
            })
        } else {
          dispatch(actions_addPhotos.PreviewPhotos({
            src: "fail",
            key: id
          }))
        }
      })
    },
    handleSubmitForm: () => {
      dispatch(actions_addPhotos.clearForm())
    },
    storeAllProducts: (products) => {
      dispatch(actions_search.storeAllProducts(products))
    },
    storeAllUsers: (allUsers) => {
      dispatch(actions_userPage.storeAllUsers(allUsers))
    },
    storeMyUser: (user) => {
      dispatch(actions_userPage.storeMyUser(user))
    }
  }
}

// set id in the name field
const AddPhotos = Form.create({ name: 'AddPhotoForm' })(connect(mapStateToProps, mapDispatchToProps)(AddPhotoForm));

export default AddPhotos