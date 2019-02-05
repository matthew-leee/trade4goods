const MyProfStyle = {
    MyProf: {
        fontFamily: "'Rajdhani', sans-serif",
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
        boxShadow: "0.5vw 0.5vw 4vw rgb(50,50,50)",
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
    img: {
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
    detailsh4: {
        paddingBottom: "1vw"
    },
    stat: {
        gridArea: "b",
        margin: "1vw 1vw 1vw 1vw",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(6, 1fr)",
        boxShadow: "0.5vw 0.5vw 4vw rgb(50,50,50)",
        backgroundColor: "rgb(60,237,188)"
    },
    stat1: {
        gridColumn: "1/2",
        gridRow: "2/7",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(150,150,150,0.4)"
    },
    cred: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    stat2: {
        gridColumn: "2/3",
        gridRow: "2/7",
        backgroundColor: "rgba(150,150,150,0.5)",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    statTitle: {
        gridColumn: "1/3",
        gridRow: "1/2",
        backgroundColor: "rgba(150,150,150,0.8)",
        display: "flex",
        alignItems: "center"
    },
    history: {
        gridArea: "c",
        backgroundColor: "rgb(181,229,80)",
        margin: "1vw 1vw 1vw 1vw",
        boxShadow: "0.5vw 0.5vw 4vw rgb(50,50,50)",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "repeat(6, 1fr)",
    },
    historyTitle:{
        gridRow: "1/2",
        backgroundColor: "rgba(150,150,150,0.8)",
        display: "flex",
        alignItems: "center"
    },
    historyDetails: {
        gridRow: "2/7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(150,150,150,0.6)",
    },
    chain: {
        gridArea: "d",
        backgroundColor: "blue",
        margin: "1vw 1vw 1vw 1vw",
        boxShadow: "0.5vw 0.5vw 4vw rgb(50,50,50)",
    }
}

export default MyProfStyle