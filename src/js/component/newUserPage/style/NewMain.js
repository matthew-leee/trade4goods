const NewMainStyle = {
    newMain: {
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
        gridTemplateAreas: '"a b b c c c c c c c"',
        backgroundColor: "black",
        width: "100vw",
        height: "93vh"
    },
    newNav: {
        gridArea: "a",
        display: "flex",
        justifyContent: "center",
        paddingTop: "6vh",
        // backgroundImage: "linear-gradient(to right, rgb(60, 60, 60), rgb(106, 106, 106) 99%)",
        backgroundColor: "rgb(80, 80, 80)",
        height: "inherit",
    },
    cP : {
        display: "none",
    },
    cP_clicked: {
        gridArea: "b",
        backgroundColor: "rgb(95, 95, 95)",
        height: "inherit"
    },
    mainPanel: {
        gridArea: "b / b / c / c",
        display: "flex",
        // backgroundImage: "linear-gradient(to right, rgb(110, 110, 110), rgb(170, 170, 170) 99%)",
        backgroundColor: "rgb(110, 110, 110)",
        height: "inherit"
    },
    mainPanel_cP_clicked: {
        gridArea: "c",
        // backgroundImage: "linear-gradient(to right, rgb(110, 110, 110), rgb(170, 170, 170) 99%)",
        backgroundColor: "rgb(110, 110, 110)",
        height: "inherit"
    }
}

export default NewMainStyle