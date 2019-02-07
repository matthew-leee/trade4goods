const BigCardsStyle = {
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
                display: "flex",
                flexDirection: "column",
                height: "76vh",
                overflowY: "scroll"
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