import hre from "hardhat";
import "dotenv/config";

async function main() {
    const realEstateFactory = await hre.ethers.getContractFactory("RealEstate");
    const realEstate = await realEstateFactory.deploy();
    await realEstate.waitForDeployment();

    console.log(`Deployed Real Estate contract at: ${await realEstate.getAddress()}`)

    const escrowFactory = await hre.ethers.getContractFactory("Escrow");
    const realEstateAddress = await realEstate.getAddress();
    const escrow = await escrowFactory.deploy(
        realEstateAddress,
        process.env.SELLER_ADDRESS,
        process.env.INSPECTOR_ADDRESS,
        process.env.LENDER_ADDRESS,
    );
    await escrow.waitForDeployment();

    console.log(`Deployed Escrow contract at: ${await escrow.getAddress()}`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
