const core = require('@actions/core');
const exec = require('@actions/exec');

const { waitUntil } = require('async-wait-until/dist/commonjs');
const { isReady, getCertificate } = require("./emulator");

const fs = require('fs');

async function run() {
    try {
        const imageTag = core.getInput('image-tag');
        const startTimeout = parseInt(core.getInput('start-timeout')) * 1000;
        const partitionsCount = parseInt(core.getInput('partitions-count'));

        const fullImageName = `mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:${imageTag}`

        // This is to avoid countint the time to pull the image into the start timeout
        await exec.exec(`docker pull ${fullImageName}`);

        await exec.exec(`docker run -d -p 8081:8081 -p 10251-10254:10251-10254 -e AZURE_COSMOS_EMULATOR_PARTITION_COUNT=${partitionsCount} -e AZURE_COSMOS_EMULATOR_ENABLE_DATA_PERSISTENCE=true ${fullImageName}`);

        try {
            await waitUntil(
                () => isReady(),
                {
                    timeout: startTimeout,
                    intervalBetweenAttempts: 1000
                });
        }
        catch (ex) {
            console.log("HANDLING 2: " + ex);

            core.setFailed("The emulator did not get ready in time.");
            return;
        }

        await trustCertificate();
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

async function trustCertificate() {
    const certContent = await getCertificate();

    await fs.promises.writeFile("/usr/local/share/ca-certificates/cosmosdb-emulator.crt", certContent, 'utf-8');
    
    await exec.exec("update-ca-certificates");
}

run();