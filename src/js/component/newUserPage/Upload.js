/* jshint expr: true */
import React, { Component } from "react"

import {
    Form, Input, Upload, Cascader, Button, Icon
} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import actions_addPhotos from "../../actions/addPhotos"
import actions_userPage from "../../actions/userPage"
import actions_search from "../../actions/search"
import { connect } from "react-redux"
import GeneralTags from "../AddPhotos/tags_antd"
import uuidv1 from "uuid/v1"
import Axios from "axios";
import firebaseConfig from "../../../firebase"
import * as firebase from 'firebase';

import UploadStyle from "./style/Upload"

const app = firebase.initializeApp(firebaseConfig)

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

class AddPhotoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            imgOverlay: UploadStyle.img.overlay
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
                    const addPhotosRes = await Axios("https://localhost:8443/api/product", {
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
                    const res = await Axios.get('https://localhost:8443/api/allProducts/')
                    res.data.forEach((u) => {
                        u.openOneModal = false
                        u.openOGModal = false
                        u.openMyGoodModal = false
                        u.openDELModal = false
                    })
                    this.props.storeAllProducts(res.data)

                    // fetch allUsers
                    const users = await Axios.get('https://localhost:8443/api/allProfile/')
                    this.props.storeAllUsers(users.data)

                    // fetch myUser
                    const user = await Axios('https://localhost:8443/api/profile', {
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

    handleFiles = (e) =>{
        const totalFiles = this.props.previewPhotos.length + e.target.files.length
        if (totalFiles <= 6){
            this.props.handleFiles(e)
        } else {
            alert("You can only upload max 6 photos per product.")
        }
    }

    imgHover = (type) =>{
        if (type == "enter"){
            this.setState({
                imgOverlay: UploadStyle.img.overlayHover
            }) 
        } else {
            this.setState({
                imgOverlay: UploadStyle.img.overlay
            })
        }
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
                    <div className="previewBox" key={photo.key} id={photo.key}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "14vw", 
                            height: "14vw", 
                            overflow: "hidden", 
                            backgroundColor: "rgba(240,240,240,0.7)",
                            overflow: "hidden",
                            position: "relative"
                        }}>
                        <img src={photo.src} alt="" style={{ width: "14vw"}} style={{position: "relative"}} />
                        <div className="previewOverlay" 
                        style={this.state.imgOverlay} 
                        onMouseEnter={()=>{this.imgHover("enter")}}
                        onMouseLeave={()=>{this.imgHover("leave")}}
                        >
                            <Icon type="delete" onClick={()=>{this.props.handleImgDelete(photo.key)}} />
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="previewBox" key={photo.key} id={photo.key}>
                        <div className="pContainer" style={{
                            width: "14vw", height: "14vw", backgroundColor: "rgb(252, 255, 241)", overflowWrap: "break-word"
                        }}>
                            <p style={{ color: "red",display: "flex",
                            alignItems: "center",
                            justifyContent: "center",textAlign: "center"}}>This file exceeds 5MB limit</p>
                        </div>
                    </div>
                )
            }
        })



        return (

            <div className="Upload" style={UploadStyle.frame}>

                <div className="imgUpload" style={UploadStyle.img.frame}>
                    <div className="imgBox" style={UploadStyle.img.imgBox}>
                        {preview}
                        {this.props.previewPhotos.length < 6 && <label htmlFor="clearImageField" style={UploadStyle.img.label}>
                            <Icon type="upload" style={{fontSize: "2vw", paddingBottom: "0.5vw"}} />
                            <p style={{fontSize: "1vw"}}>Upload Photos</p>
                            <input type="file"
                                multiple
                                onChange={this.handleFiles}
                                id="clearImageField"
                                style={{ display: "none" }}
                            />
                        </label>}
                    </div>
                </div>

                <div className="form" style={UploadStyle.form.frame}>
                    <Form onSubmit={this.handleSubmit} style={{ width: "inherit", marginRight: "7vw" }}>
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
        },
        handleImgDelete: (key)=>{
            dispatch(actions_addPhotos.imgDelete(key))
        }
    }
}

// set id in the name field
const Uploads = Form.create({ name: 'AddPhotoForm' })(connect(mapStateToProps, mapDispatchToProps)(AddPhotoForm));

export default Uploads