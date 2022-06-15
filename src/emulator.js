const axios = require('axios');
const https = require('https');
const exec = require('@actions/exec');

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
        return false;
    }
}

module.exports.downloadCertificate = async () => {
    await exec.exec(`bash -c "curl --insecure '${certificateUrl}' | sudo tee /usr/local/share/ca-certificates/cosmosdb-emulator.crt"`);
}