const MyGStyle = {
    outFrame: {
        // superFrame:{
        //     display: "flex",
        //     flexDirection: "column",
        //     width: "inherit",
        //     height: "auto",
        //     justifyContent: "center"
        // },
        superFrame: {
            display: "grid",
            gridTemplateRows: "6vh auto",
            width: "inherit",
            height: "auto",
            justifyContent: "center"
        },
        bigFrame: {
            gridRow: "2/3",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "90vw",
            height: "auto",
            justifyContent: "center",
            overflowY: "scroll",
        },
        button: {
            gridRow: "1/2",
            display: "flex",
            backgroundImage: "linear-gradient(rgba(150,150,150,0.8),rgb(110, 110, 110))",
            justifyContent: "flex-end",
            alignItems: "center",
            opacity: 0.8,
            paddingRight: "9.3vw"
        },
    },
    frame: {
        width: 250,
        height: 275,
        gridTemplateColumns: "repeat(2, 125px)",
        gridTemplateRows: "125px 125px 25px",
        overflow: "hidden",
        boxShadow: "0.5vw 0.5vw 4vw rgb(50,50,50)",
    },
    img: {
        container: {
            gridColumn: "1 / 3",
            gridRow: "1 / 3",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            width: 250,
            height: 250,
        },
        frame: {
            position: "absolute",
            width: 250,
            height: 250,
            zIndex: 9999,
            borderWidth: 10,
            borderStyle: "solid",
            borderColor: "rgba(200,200,200,0.4)",
        },
        img: {
            width: 250,
            zIndex: 5
        },
        status: {
            traded: {
                position: "absolute",
                width: 250,
                height: 250,
                zIndex: 9999,
                borderWidth: 10,
                borderStyle: "solid",
                borderColor: "rgba(17, 178, 44,1)",
            },
            trading:{
                position: "absolute",
                width: 250,
                height: 250,
                zIndex: 9999,
                borderWidth: 10,
                borderStyle: "solid",
                borderColor: "rgba(239, 192, 4,1)",
            },
            withR:{
                position: "absolute",
                width: 250,
                height: 250,
                zIndex: 9999,
                borderWidth: 10,
                borderStyle: "solid",
                borderColor: "rgba(4, 90, 239,1)",
            }
        }
    },
    status: {
        container: {
            width: 250,
            height: 25,
            gridColumn: "1/3",
            gridRow: "3/4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(150,150,150,0.5)"
        }
    }
}

export default MyGStyle