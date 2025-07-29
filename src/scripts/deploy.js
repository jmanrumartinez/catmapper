// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import hre from "hardhat";
import { parseEther } from "viem";

async function main() {
  const [buyer, seller, inspector, lender] = await hre.ethers.getSigners();

  const realEstateFactory = await hre.ethers.getContractFactory("RealEstate");
  const realEstate = await realEstateFactory.deploy();
  await realEstate.waitForDeployment();

  console.log(`Deployed Real Estate contract at: ${await realEstate.getAddress()}`)
  console.log('Now minting 3 properties... 👀');

  const mintingPromises = Array.from({ length: 3 }, () => null).map(async (_, index) => {
    const transaction = await realEstate.connect(seller).mint(`https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/${index + 1}.json`);
    await transaction.wait();

    console.log(`Minted property ${index + 1} at: ${transaction.hash}`);
  });

  await Promise.all(mintingPromises);

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

  const approvePromises = Array.from({ length: 3 }, () => null).map(async (_, index) => {
    const transaction = await realEstate.connect(seller).approve(await escrow.getAddress(), index + 1);
    await transaction.wait();
  });

  await Promise.all(approvePromises);

  const listPromises = Array.from({ length: 3 }, () => null).map(async (_, index) => {
    const transaction = await escrow.connect(seller).list(index + 1, buyer.address, parseEther("20"), parseEther("10"));
    await transaction.wait();

    console.log(`Listed property ${index + 1} at: ${transaction.hash} for 20 ETH`);
  });

  await Promise.all(listPromises);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
