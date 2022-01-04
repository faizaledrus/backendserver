import Moralis from "moralis/node.js"
/* Moralis init code */
const serverUrl = "https://9dgvhuh9j4dm.usemoralis.com:2053/server";
const appId = "tXqE7eg3lXXLW7AAqfy6tGml6a3YswFzik3sFvJx";
const masterkey = "Ee5itc9bJDMGQrOMHC2aJXIolixcQPFibo5s617n"
// let count = 0; // very bad
//  Moralis.start({ serverUrl, appId, masterkey });
// Moralis.Cloud.define("increment");

/* TODO: Add Moralis Authentication code */
const getData = async () => {


    try {
        await Moralis.start({ serverUrl, appId, masterkey });
        // await Moralis.Cloud.define("watchEthAddress", async (request) => {
        //     // return request.address
        // });
        // Moralis.Cloud.define("averageStars");
        const test = await Moralis.Cloud.run("getAvgGas", { address: "0x517d88a1935ac068e0f0b7e1e68fb8570d0c021c", sync_historical: true })
//0x517d88a1935ac068e0f0b7e1e68fb8570d0c021c Ser
//0x2c9F5c6C275cd01d0b2d2610Aab7668C2F3cC047 FZL

        console.log(test)
    } catch (error) {
        console.log(error)
    }
}

getData()