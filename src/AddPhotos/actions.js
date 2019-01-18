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
    PreviewPhotos: (photo)=>{
        return {
            type: "PREVIEWPHOTOS",
            previewPhotos: photo
        }
    }
}

export default actions