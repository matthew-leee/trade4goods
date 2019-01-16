const actions = {
    AddPhotos_Details: (data)=>{
        return {
            type: "ADDPHOTOS_DETAILS",
            details: data
        }
    },
    UploadPhotos: (photos)=>{
        return {
            type: "UPLOADPHOTOS",
            uploadedPhotos: photos
        }
    },
    PreviewPhotos: (photos)=>{
        return {
            type: "PREVIEWPHOTOS",
            previewPhotos: photos
        }
    }
}

export default actions