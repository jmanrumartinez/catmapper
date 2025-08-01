import hre from "hardhat";

async function main() {
    const [seller, inspector, lender] = await hre.ethers.getSigners();

    const realEstateFactory = await hre.ethers.getContractFactory("RealEstate");
    const realEstate = await realEstateFactory.deploy();
    await realEstate.waitForDeployment();

    console.log(`Deployed Real Estate contract at: ${await realEstate.getAddress()}`)

    const escrowFactory = await hre.ethers.getContractFactory("Escrow");
    const realEstateAddress = await realEstate.getAddress();
    const escrow = await escrowFactory.deploy(
        realEstateAddress,
        seller.address,
        inspector.address,
        lender.address,
    );
    await escrow.waitForDeployment();

    console.log(`Deployed Escrow contract at: ${await escrow.getAddress()}`)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
