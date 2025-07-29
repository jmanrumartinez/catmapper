import { ethers } from "hardhat";

const tokens = (n: number) => {
  return ethers.parseUnits(n.toString(), "ether");
};

describe("Escrow", () => {
  it("should store the addresses", async () => {
    const realEstate = await ethers.getContractFactory("RealEstate");
    await realEstate.deploy();

    console.log(realEstate.address);
  });
});
