import React, { Component } from 'react';
import actions from "./actions"
import { Dispatch, Action } from "redux";
import { connect } from "react-redux";
import UploadPhotos from "./UploadPhotos"

class AddPhotos extends Component  {

    render(){
        return (
            <div className="AddPhotos">
    
                <div className="photosContainer">
                    <h2>Click and Upload Photos</h2>   
                </div>
    
                <div className="uploadPhotosContainer">
                    <UploadPhotos />
                </div>
    
                <div className="uploadDetails">
                    <form id="AddPhotos_Details" onSubmit = {this.props.handleSubmit}>
    
                        <label htmlFor="AddPhotos_ProductName">Product Name</label>
                        <input id="AddPhotos_ProductName" name="AddPhotos_ProductName" type="text" />
    
                        <label htmlFor="AddPhotos_IsGenuine">Is Genuine</label>
                        <input id="AddPhotos_IsGenuine" name="AddPhotos_IsGenuine" type="text" />
    
                        <label htmlFor="AddPhotos_ProductDescription">Product Description</label>
                        <input id="AddPhotos_ProductDescription" name="AddPhotos_ProductDescription" type="text" />
    
                        <label htmlFor="AddPhotos_TradeLocation">Trade Location</label>
                        <input id="AddPhotos_TradeLocation" name="AddPhotos_TradeLocation" type="text" />
    
                        <label htmlFor="AddPhotos_Expectation">Expectation</label>
                        <input id="AddPhotos_Expectation" name="AddPhotos_Expectation" type="text" />
    
                        <label htmlFor="AddPhotos_Tags">Tags</label>
                        <input id="AddPhotos_Tags" name="AddPhotos_Tags" type="text" />
    
                        <button>Send Form</button>
                    </form>
                </div>
    
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        uploadedPhotos: state.uploadedPhotos,
        previewPhotos: state.previewPhotos
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        handleSubmit: (e)=>{
            e.preventDefault();
            e.stopPropagation();
            const data = new FormData(e.target);
            dispatch(actions.AddPhotos_Details(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhotos)