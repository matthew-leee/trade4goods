

const cheerio = require("cheerio");
const request = require("request");
const rp = require("request-promise");
const fs = require("fs")

let username = "happy"

async function igAttack(url) {
    let html = await rp(url);
    fs.writeFile("./testingIG.html", String(html), "utf8")
    const $ = cheerio.load(html);

    const array = String($("body > script").html())
    const real = [...array].slice(array.indexOf("{"), array.length - 1).join("")
    const realreal = `[${real}]`
    let a = JSON.parse(realreal);
    let urls = a[0].entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.map(u => {
        return u.node.thumbnail_resources
    }).map((u) => {
        return u[4].src
    })
    for (let i=0; i<urls.length; i++){
        await request(urls[i]).pipe(fs.createWriteStream(`./testimg/${username}_${i}.jpg`))
    }
    return "success"
}

igAttack("https://www.instagram.com/hiavmy/")
    .then((data) => console.log(data))
    .catch((err) => console.log(err))