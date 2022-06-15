const axios = require('axios');
const https = require('https');
const exec = require('@actions/exec');

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const axiosClient = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

const certificateUrl = "https://localhost:8081/_explorer/emulator.pem";

module.exports.isReady = async () => {
    try {
        await axiosClient.get(certificateUrl);

        return true;
    }
    catch (ex) {
        console.log("HANDLING 1: " + ex);
        console.log("CosmosDB emulator is not ready yet, will retry in a few seconds...");

        await exec.exec("docker logs cosmos");

        return false;
    }
}

module.exports.downloadCertificate = async () => {
    await exec.exec(`curl --insecure ${certificateUrl} > sudo tee /usr/local/share/ca-certificates/cosmosdb-emulator.crt`);
}