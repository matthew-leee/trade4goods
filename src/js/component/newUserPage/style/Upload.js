const UploadStyle = {
    frame: {
        padding: "2.5vw 2.5vw 2.5vw 2.5vw",
        display: "grid",
        height: "80vh",
        width: "90vw",
        gridTemplateColumns: "42.5vw, 5vw, 42.5vw"
    },
    img: {
        frame: {
            gridColumn: "1/2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "inherit",
            width: "42.5vw"
        },
        imgBox: {
            // display: "flex",
            // flexDirection: "row",
            // backgroundColor: "rgba(150,150,150,0.5)",
            // width: "24vw",
            // height: "36vw",
            // flexWrap: "wrap",
            // justifyContent: "flex-start"
            display: "grid",
            gridTemplateColumns: "repeat(2, 14vw)",
            gridTemplateRows: "repeat(3,14vw)",
            backgroundColor: "rgba(150,150,150,0.5)"
        },
        label: {
            display: "flex",
            flexDirection: "column",
            width: "14vw",
            height: "14vw",
            backgroundColor: "rgba(240,240,240,0.7)",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            margin: 0,
        },
        overlay: {
            display: "flex",
            flexDirection: "column",
            width: "14vw",
            height: "14vw",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            backgroundColor: "rgba(200,200,200,0.8)",
            opacity: 0,
            zIndex: 999
        },
        overlayHover: {
            display: "flex",
            flexDirection: "column",
            width: "14vw",
            height: "14vw",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            backgroundColor: "rgba(200,200,200,0.8)",
            opacity: 1,
            zIndex: 999
        }
    },
    form: {
        frame: {
            gridColumn: "3/4",
            display: 'flex',
            justifyContent: "flex-start",
            alignItems: "center",
            height: "inherit",
            width: "42.5vw"
        },
    }
}

export default UploadStyle