import { expect } from "chai";
import hre from "hardhat";
import { ethers } from "hardhat";

const tokens = (n: number) => {
  return ethers.parseUnits(n.toString(), "ether");
};

describe("Escrow", () => {
  it("should store the addresses", async () => {
    const realEstateFactory = await ethers.getContractFactory("RealEstate");
    const realEstate = await realEstateFactory.deploy();

    console.log(realEstate.address);
  });
});
