const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile)
const grab = require("../../testscrape/igpuppeteer")

router.get("/ig/:id", async (req, res) => {
    const ac = req.param.id;
    console.log(ac)
    await grab(ac)
    const json = await readFile(`../../testscrape/ac/${ac}/${ac}.json`)
    console.log (`you got the json report of ${ac}!`)
    res.json(json)
})

module.exports = router;