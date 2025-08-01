/* eslint-disable @typescript-eslint/no-require-imports */
const { ethers } = require("ethers");
const RealEstateAbi = require("../consts/abis/RealEstate.json");
const EscrowAbi = require("../consts/abis/Escrow.json");
const { parseEther } = require("viem/utils");
const config = require("../consts/config.json");
const { chainId } = require("../consts/chains");
require("dotenv").config();

const realEstateAddress = config[chainId.SEPOLIA].realEstate.address;
const escrowAddress = config[chainId.SEPOLIA].escrow.address;

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_RPC);
  const sellerWallet = new ethers.Wallet(
    process.env.SELLER_PRIVATE_KEY,
    provider
  );

  const realEstateContract = new ethers.Contract(
    realEstateAddress,
    RealEstateAbi,
    sellerWallet
  );


  const mintingPromises = Array.from({ length: 3 }, () => null).map(
    async (_, index) => {
      const transaction = await realEstateContract.mint(
        `https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/${index + 1
        }.json`
      );
      await transaction.wait();

      console.log(`Minted property ${index + 1} at: ${transaction.hash}`);
    }
  );

  for (const promise of mintingPromises) {
    await promise;
  }

  const approvePromises = Array.from({ length: 2 }, () => null).map(
    async (_, index) => {
      const transaction = await realEstateContract
        .connect(sellerWallet)
        .approve(escrowAddress, index + 1);
      await transaction.wait();
    }
  );

  for (const promise of approvePromises) {
    await promise;
  }

  const escrowContract = new ethers.Contract(escrowAddress, EscrowAbi, sellerWallet);

  const pricePerIndex = {
    0: "20",
    1: "15",
    2: "10",
  };

  const listPromises = Array.from({ length: 1 }, () => null).map(
    async (_, index) => {
      const transaction = await escrowContract
        .connect(sellerWallet)
        .list(
          2,
          process.env.BUYER_ADDRESS,
          parseEther(pricePerIndex[1] ?? "20"),
          parseEther("10")
        );
      await transaction.wait();

      console.log(
        `Listed property ${2} at: ${transaction.hash} for ${pricePerIndex[index]} ETH`
      );
    }
  );

  for (const promise of listPromises) {
    await promise;
  }
}

main();
