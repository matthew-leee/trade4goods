const TradeStyle = {
    frame: {
        width: "90vw",
        height: "93vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 999998,
        position: "absolute",
        fontFamily: "'Rajdhani', sans-serif",
    },
    outFrame: {
        width: "100vw",
        height: "93vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 999998,
        // position: "absolute",
        position: "fixed",
        fontFamily: "'Rajdhani', sans-serif",
    },
    content: {
        width: "80vw",
        height: "80vh",
        backgroundColor: "rgba(200,200,200,0.85)",
        display: "grid",
        gridTemplateRows: "5vh 70vh 5vh",
        zIndex: 999999,
    },
    inner: {
        title: {
            gridRow: "1/2",
            backgroundColor: "rgba(200,200,200,0.8)",
            display: "flex",
            alignItems: "center",
        },
        titleAConfirm: {
            gridRow: "1/2",
            backgroundColor: "rgba(126,164,94,0.8)",
            display: "flex",
            alignItems: "center",
            color: "white"
        },
        titleRequestedConfirm: {
            gridRow: "1/2",
            backgroundColor: "rgba(178,34,34,0.8)",
            display: "flex",
            alignItems: "center",
            color: "white"
        },
        titleWithRConfirm: {
            gridRow: "1/2",
            backgroundColor: "rgba(144,181,255,0.8)",
            display: "flex",
            alignItems: "center",
            color: "white"
        },
        titleSwapDone: {
            gridRow: "1/2",
            backgroundColor: "rgba(126,164,94,0.8)",
            display: "flex",
            alignItems: "center",
            color: "white"
        },
        content: {
            gridRow: "2/3",
            backgroundColor: "rgba(130,130,130,0.7)",
        },
        buttons: {
            gridRow: "3/4",
            backgroundColor: "rgba(200,200,200,0.8)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingLeft: "1vw",
            paddingRight: "1vw"
        }
    },
    swap: {
        frame: {
            gridColumn: "1/2",
            display: "grid",
            width: "37vw",
            height: "inherit",
            backgroundColor: "rgba(230,230,230,0.8)",
            gridTemplateColumns: "17vw 3vw 17vw",
            gridTemplateRows: "45vh 25vh"
        },
        swapzone1: {
            gridColumn: "1/2",
            gridRow: "1/2",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        swapzone2: {
            gridColumn: "3/4",
            gridRow: "1/2",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        swapLogo: {
            gridColumn: "2/3",
            gridRow: "1/2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "2vw",
            backgroundColor: "rgba(210,210,210,0.7)"
        },
        choose: {
            gridColumn: "1/4",
            gridRow: "2/3",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(150,150,150,0.8)",
            overflowY: "scroll"
        },
        middleCard: {
            display: "grid",
            width: "10vw",
            height: "13vw",
            gridTemplateRows: "10vw 3vw",
            boxShadow: "0.5vw 0.5vw 2vw rgb(100,100,100)"
        },
        middlename: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gridRow: "2/3",
            color: "white",
            backgroundColor: "rgba(100,100,100,0.3)",
            fontSize: "0.7vw",
            overflow: "hidden",
        },
        swapButton: {
            marginTop: "3vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "15vw"
        }
    },
    withR: {
        arrow: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "5vw",
        },
        frame: {
            gridColumn: "1/2",
            display: "grid",
            gridTemplateColumns: "16vw 21vw",
            width: "37vw",
            height: "inherit",
            backgroundColor: "rgba(230,230,230,0.8)",
        },
        accepted: {
            gridColumn: "1/2",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "37vw",
            height: "inherit",
            backgroundColor: "rgba(230,230,230,0.8)",
        },
        items: {
            gridColumn: "1/2",
            display: "grid",
            gridTemplateRows: "15vh 55vh",
            width: "16vw",
            height: "inherit"
        },
        itemsTitle: {
            gridRow: "1/2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(140,140,140,0.8)",
            color: "white"
        },
        itemsContent: {
            gridRow: "2/3",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "16vw",
            height: "55vh",
            backgroundColor: "rgba(160,160,160,0.8)",
            overflowY: "scroll"
        },
        choosed: {
            gridColumn: "2/3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "21vw",
            height: "inherit"
        }
    },
    a: {
        frame: {
            gridRow: "2/3",
            backgroundColor: "rgba(110,110,110,0.7)",
            width: "80vw",
            height: "70vh",
            display: "grid",
            gridTemplateColumns: "37vw 6vw 37vw",
        },
        aItems: {
            gridColumn: "1/2",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "37vw",
            height: "inherit",
            backgroundColor: "rgba(230,230,230,0.8)",
            overflowY: "scroll"
        },
        aItemsConfirm: {
            gridColumn: "1/2",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "37vw",
            height: "inherit",
            backgroundColor: "rgba(230,230,230,0.8)",
        },
        smallCard: {
            display: "grid",
            width: "7vw",
            height: "9vw",
            gridTemplateRows: "7vw 2vw",
            margin: "0.5vw",
            boxShadow: "0.5vw 0.5vw 2vw rgb(100,100,100)"
        },
        img: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gridRow: "1/2",
            backgroundColor: "rgba(150,150,150,0.3)"
        },
        name: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gridRow: "2/3",
            overflow: "hidden",
            color: "white",
            backgroundColor: "rgba(100,100,100,0.3)"
        },
        drop: {
            gridColumn: "3/4",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "37vw",
            height: "inherit",
            backgroundColor: "rgba(230,230,230,0.8)"
        },
        middleCard: {
            display: "grid",
            width: "14vw",
            height: "18vw",
            gridTemplateRows: "14vw 4vw",
            boxShadow: "0.5vw 0.5vw 2vw rgb(100,100,100)"
        },
        middlename: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gridRow: "2/3",
            color: "white",
            backgroundColor: "rgba(100,100,100,0.3)",
            fontSize: "1vw",
            overflow: "hidden",
        },
        arrow: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "5vw"
        }
    }
}

export default TradeStyle