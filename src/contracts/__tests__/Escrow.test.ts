import { ethers } from "ethers";

const tokens = (n: number) => {
  return ethers.parseUnits(n.toString(), "ether");
};

describe("Escrow", () => {});
