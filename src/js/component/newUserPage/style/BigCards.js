const BigCardsStyle = {
    out: {
        width: "100vw",
        height: "93vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 99998,
        // position: "absolute"
        position: "fixed"
    },
    frame: {
        width: "90vw",
        height: "93vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 99998,
        position: "absolute"
    },
    content: {
        width: "80vw",
        height: "80vh",
        backgroundColor: "rgb(200,200,200)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
    },
    details: {
        outer: {
            width: "76vw",
            height: "76vh",
            display: "grid",
            gridTemplateColumns: "35vw 6vw 35vw",
        },
        inner:{
            img: {
                gridColumn: "1/2",
                display: "grid",
                gridTemplateRows: "6vh 70vh"
            },
            imgHeader:{
                display: "flex",
                flexDirection: "row",
                width: "inherit",
                justifyContent: "space-between",
                alignItems: "center",
                gridRow: "1/2"
            },
            carousel:{
                display: "grid",
                gridRow: "2/3",
                gridTemplateRows: "60vh,10vh",
                width: "inherit",
            },
            currentImg: {
                gridRow: "1/2",
                display: "flex",
                justifyContent: "center",
                width: "35vw",
                alignItems: "center",
            },
            allImg: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"rgba(200,200,200,0.5)"
            },
            allImgContainer:{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"rgba(200,200,230,0.9)",
                width: "8vh",
                height: "8vh",
                overflow: "hidden"
            },
            notImg:{
                gridColumn: "3/4",
                display: "flex",
                flexDirection: "column",
                height: "76vh",
                overflowY: "scroll"
            }
        }
    }
}

export default BigCardsStyle