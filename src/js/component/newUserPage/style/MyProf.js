const MyProfStyle = {
    MyProf: {
        padding: "2.5vw 2.5vw 2.5vw 2.5vw",
        display: "grid",
        height: "inherits",
        width: "90vw",
        gridTemplateColumns: "1fr 3fr",
        gridTemplateRows: "repeat(3, 1fr)",
        gridTemplateAreas: `
        "a b b"
        "a c c"
        "a d d"
        `
    },
    profile: {
        gridArea: "a",
        backgroundColor: "rgba(255,255,255,0.5)",
        overflow: "hidden",
        margin: "1vw 1vw 1vw 1vw",
        display: "flex",
        flexDirection: "column",
    },
    imgClass: {
        width: "19.25vw",
        height: "19.25vw",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        // borderWidth: "1vw",
        // borderStyle: "solid",
        // borderColor: "rgba(255,255,255,0.3)",
        position: "relative",
    },
    imgOverlay: {
        position: "absolute",
        width: "19.25vw",
        height: "19.25vw",
        borderWidth: "1vw",
        borderStyle: "solid",
        borderColor: "rgba(200,200,200,0.4)",
        zIndex: 999,
    },
    imgHover: {
        position: "absolute",
        width: "19.25vw",
        height: "19.25vw",
        backgroundColor: "rgba(200,200,200,0.4)",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    img:{
        width: "19.25vw",
    },
    icon: {
        fontSize: "3vw",
        color: "white",
        cursor: "pointer"
    },
    details: {
        margin: "1vw 1vw 1vw 1vw"
    },
    detailsh4:{
        paddingBottom: "1vw"
    },
    stat: {
        gridArea: "b",
        backgroundColor: "yellow",
        margin: "1vw 1vw 1vw 1vw",
    },
    history: {
        gridArea: "c",
        backgroundColor: "green",
        margin: "1vw 1vw 1vw 1vw",
    },
    chain: {
        gridArea: "d",
        backgroundColor: "blue",
        margin: "1vw 1vw 1vw 1vw",
    }
    
}

export default MyProfStyle