const photoReducer = (state = {
    details: [],
    uploadedPhotos: [],
    previewPhotos: [],
    inputVisible: false,
    inputValue: "",
    inputConfirm: "",
    typingTag: "",
    finishedTag: []
}, action) => {
    switch (action.type) {
        case "ADDPHOTOS_DETAILS":
            return {
                ...state,
                details: [...action.details]
            }
        case "UPLOADPHOTOS":
            return {
                ...state,
                uploadedPhotos: [...action.uploadedPhotos],
            }
        case "PREVIEWPHOTOS":
            if (action.previewPhotos.src == "fail") {
                return {
                    ...state,
                    previewPhotos: [...state.previewPhotos, action.previewPhotos]
                }
            } else {
                return {
                    ...state,
                    previewPhotos: [...state.previewPhotos, action.previewPhotos]
                }
            }
        case "ADDPHOTOSFORM_TYPINGTAG":
            return {
                ...state,
                typingTag: action.typingTag
            }
        case "ADDPHOTOSFORM_FINISHEDTAG":
            if (action.finishedTag) {
                const tagExist = state.finishedTag.some((u) => {
                    return u == action.finishedTag
                })
                if (!tagExist) {
                    return {
                        ...state,
                        finishedTag: [...state.finishedTag, action.finishedTag],
                        typingTag: ""
                    }
                } else {
                    return {
                        ...state,
                        finishedTag: state.finishedTag,
                        typingTag: ""
                    }
                }
            } else {
                return {
                    ...state,
                    finishedTag: state.finishedTag,
                    typingTag: ""
                }
            }
        case "ADDPHOTOSFORM_DELETETAG":
            const filtered = state.finishedTag.filter((u) => u != action.deleteTag)
            return {
                ...state,
                finishedTag: filtered
            }
        case "CLEAR_FORM":
            return {
                ...state,
                previewPhotos: [],
                finishedTag: [],
                uploadedPhotos: []
            }
        case "IMG_DEL":
        return {
            ...state,
            previewPhotos: state.previewPhotos.filter((u)=>{
                return u.key !== action.key
            })
        }
        default:
            return state
    }
}



export default photoReducer