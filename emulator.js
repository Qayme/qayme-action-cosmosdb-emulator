module.exports.isReady = async () => {
    try {
        const url = "https://localhost:8081/_explorer/certificate.pem";

        // TODO: Only check the response status code (should be 200)
        // TODO: Ignore SSL errors
    }
    catch (ex) {
        console.log("CosmosDB emulator is not ready yet, will retry in a few seconds...");

        return false;
    }
}

module.exports.getCertificate = async () => {

}