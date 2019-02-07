const actions_addPhotos = {
    AddPhotos_Details: (data) => {
        return {
            type: "ADDPHOTOS_DETAILS",
            details: data
        }
    },
    UploadPhotos: (photos) => {
        return {
            type: "UPLOADPHOTOS",
            uploadedPhotos: photos
        }
    },
    PreviewPhotos: (photo) => {
        return {
            type: "PREVIEWPHOTOS",
            previewPhotos: photo
        }
    },
    AddPhotosForm_typingTag: (input) => {
        return {
            type: "ADDPHOTOSFORM_TYPINGTAG",
            typingTag: input
        }
    },
    AddPhotosForm_finishedTag: (input)=>{
        return {
            type: "ADDPHOTOSFORM_FINISHEDTAG",
            finishedTag: input
        }
    },
    AddPhotosForm_deleteTag: (tag)=>{
        return {
            type: "ADDPHOTOSFORM_DELETETAG",
            deleteTag: tag
        }
    },
    clearForm: ()=> {
        return {
            type: "CLEAR_FORM"
        }
    },
    imgDelete:(key)=>{
        return {
            type: "IMG_DEL",
            key: key
        }
    }
}

export default actions_addPhotos