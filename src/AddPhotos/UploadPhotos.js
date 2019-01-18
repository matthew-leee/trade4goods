import React, { Component } from 'react';
import actions from "./actions"
import { Dispatch, Action } from "redux";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";
import { resolve } from 'path';
import { reject } from 'q';

class UploadPhotos extends Component {
    render() {
        const preview = this.props.previewPhotos.map((photo) => {
            console.log (`photo at map props: ${photo}`)
            return (
                <div className="previewBox" key={photo.key} id={photo.key}>
                    <img src={photo.src} alt="" />
                </div>
            )
        })
        return (
            <div className="previewPhotos">

                {preview}

                <div className="previewBox">
                    <form onSubmit={this.props.handleUpload}>
                        <input type="file" multiple onChange={this.props.handlePreview} />
                        <button>Upload Photos</button>
                    </form>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uploadedPhotos: state.uploadedPhotos,
        previewPhotos: state.previewPhotos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handlePreview: (e) => {
            let files = [];
            for (let i = 0; i < e.target.files.length; i++) {
                files.push(e.target.files[i])
            }
            files.forEach((file)=>{
                const reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                    dispatch(actions.PreviewPhotos({
                        src: reader.result,
                        key: String(uuidv1())
                    }))
                }
            })
        },
        handleUpload: async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const photos = "sth"
            dispatch(actions.UploadPhotos(photos))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPhotos)