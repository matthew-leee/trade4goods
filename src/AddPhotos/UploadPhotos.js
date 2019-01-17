import React, { Component } from 'react';
import actions from "./actions"
import { Dispatch, Action } from "redux";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";

class UploadPhotosComponent extends Component {
    constructor(props){
        super(props)
    }
    
    

    render(){
        const preview = this.props.previewPhotos.map((photo) => {
            return (
                <div className="previewBox" key={photo.id}>
                    <img src={photo.src} alt="" />
                </div>
            )
        })
        return (
            <div className="previewPhotos">
    
                {preview}
    
                <div className="previewBox">
                    <form onSubmit={this.props.handleUpload}>
                        <input type="file" onChange={this.props.handlePreview} />
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

    const getPhotos = (e) => {
        const files = e.target.files
        const photos = files.map((data) => {
            const id = uuidv1();
            const reader = new FileReader();
            let temp = []
            reader.onloadend = () => {
                const photo = {
                    src: reader.result,
                    id: id
                }
                temp.push(photo)
            }
            reader.readDataAsUrl(data)
            return temp[0]
        })
        return photos
    }

    return {
        handlePreview: (e) => {
            const photos = getPhotos(e)
            dispatch(actions.PreviewPhotos(photos))
        },
        handleUpload: (e)=>{
            e.preventDefault();
            e.stopPropagation();
            const photos = getPhotos(e)
            dispatch(actions.UploadPhotos(photos))
        }
    }
}


const UploadPhotos = connect(mapStateToProps, mapDispatchToProps)(UploadPhotosComponent)

export default UploadPhotos