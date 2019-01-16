const photoReducer = (state, action) => {
    switch(action.type){
        case "ADDPHOTOS_DETAILS": 
            return {
                ...state,
                details: [...action.details]
            }
        case "UPLOADPHOTOS":
            return {
                ...state,
                uploadedPhotos: [...action.uploadedPhotos]
            }
        case "PREVIEWPHOTOS": 
            return {
                ...state,
                previewPhotos: [...action.previewPhotos]
            }
    }
} 

export default photoReducer