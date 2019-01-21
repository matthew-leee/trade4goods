import React, { Component } from 'react';
import actions from "./actions"
import { Dispatch, Action } from "redux";
import { connect } from "react-redux";
import UploadPhotos from "./UploadPhotos"
import GeneralTags from "./tags_antd";

class AddPhotos extends Component {

    render() {
        return (
            <div className="AddPhotos">

                <div className="photosContainer">
                    <h2>Click and Upload Photos</h2>
                </div>

                <div className="uploadPhotosContainer">
                    <UploadPhotos />
                </div>

                <div className="uploadDetails">
                    
                </div>

                <div className="displayDetails">
                    <p>{this.props.details}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uploadedPhotos: state.uploadedPhotos,
        previewPhotos: state.previewPhotos,
        details: state.details
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: (e) => {
            e.preventDefault();
            e.stopPropagation();
            const data = new FormData(e.target);
            dispatch(actions.AddPhotos_Details(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhotos)