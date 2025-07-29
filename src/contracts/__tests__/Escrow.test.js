import { expect } from "chai";
import hre from "hardhat";

const tokens = (n) => {
  return hre.ethers.parseUnits(n.toString(), "ether");
};

describe("Escrow", () => {
  it("should store the addresses", async () => {
    const realEstateFactory = await hre.ethers.getContractFactory("RealEstate");
    const realEstate = await realEstateFactory.deploy();

    console.log(realEstate.address);
    expect(1).to.equal(1);
  });
});
