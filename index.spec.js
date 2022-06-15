const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://localhost:8081"
const key = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

const getRandomName = () => {
    return "t" + (Math.random() + 1).toString(36).substring(7);
}

test('Verify emulator is running', async () => {
    const client = new CosmosClient({ endpoint, key });

    await client.databases.create(getRandomName());
});