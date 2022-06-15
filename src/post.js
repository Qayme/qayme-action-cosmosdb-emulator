const exec = require('@actions/exec');
const { getContainerName } = require("./container-name");

async function run() {
    try {
        const containerName = getContainerName();

        await exec.exec(`docker rm -f ${containerName}`);
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run();