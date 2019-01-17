// import actions from "./actions"

const initState = {
    details: [],
    uploadedPhotos: [],
    previewPhotos: []
  }

const photoReducer = (state=initState, action) => {
    switch(action.type){
        case "ADDPHOTOS_DETAILS": 
            return {
                ...state,
                details: [...action.details]
            }
        case "UPLOADPHOTOS":
            return {
                ...state,
                uploadedPhotos: [...action.uploadedPhotos],
                previewPhotos: []
            }
        case "PREVIEWPHOTOS": 
            return {
                ...state,
                previewPhotos: [...state.previewPhotos, action.previewPhotos]
            }
        default: return state
    }
} 

export default photoReducer