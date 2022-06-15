# CosmosDB Emulator

Starts [CosmosDB emulator](https://docs.microsoft.com/en-us/azure/cosmos-db/linux-emulator?tabs=sql-api%2Cssl-netstd21) emulator in GitHub actions via Docker CLI.

## Usage
```yaml
# ...
jobs:
  <jobname>:
    steps:
      - name: Start CosmosDB emulator
        uses: qayme/qayme-action-cosmosdb-emulator@<version>
# ...
```

:warning: CosmosDB emulator currently fails in ubuntu-20.04 and ubuntu-22.04 images. This is due to a bug in the emulator/image itself.