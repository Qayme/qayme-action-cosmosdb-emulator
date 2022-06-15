module.exports.getContainerName = () => {
    return `${process.env.GITHUB_RUN_ID}R${process.env.GITHUB_RUN_NUMBER}-cosmos`
}