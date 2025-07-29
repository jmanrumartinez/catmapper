import { expect } from "chai";
import hre from "hardhat";

const tokens = (n) => {
  return hre.ethers.parseUnits(n.toString(), "ether");
};

describe("Escrow", () => {
  let escrow = null;
  let realEstateAddress = null;
  let seller, inspector, lender = null
  let realEstate = null
  let transaction = null;

  beforeEach(async () => {
    // Deploy RealEstate contract
    const realEstateFactory = await hre.ethers.getContractFactory("RealEstate");
    realEstate = await realEstateFactory.deploy();

    // Get signers
    const [sellerSigner, inspectorSigner, lenderSigner] = await hre.ethers.getSigners();
    seller = sellerSigner;
    inspector = inspectorSigner;
    lender = lenderSigner;

    // Mint a token
    transaction = await realEstate.connect(sellerSigner).mint("https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/1.json");
    await transaction.wait();

    // Deploy Escrow contract
    realEstateAddress = await realEstate.getAddress();
    const escrowFactory = await hre.ethers.getContractFactory("Escrow");
    escrow = await escrowFactory.deploy(
      realEstateAddress,
      sellerSigner.address,
      inspector.address,
      lender.address,
    );
  })

  it('should return the NFT address', async () => {
    const nftAddress = await escrow.nftAddress();
    expect(nftAddress).to.equal(realEstateAddress);
  })

  it('should return the seller address', async () => {
    const sellerAddress = await escrow.seller();
    expect(sellerAddress).to.equal(seller.address);
  })

  it('should return the inspector address', async () => {
    const inspectorAddress = await escrow.inspector();
    expect(inspectorAddress).to.equal(inspector.address);
  })

  it('should return the lender address', async () => {
    const lenderAddress = await escrow.lender();
    expect(lenderAddress).to.equal(lender.address);
  })

  it('should update the ownership of the property from the sender to the smart contract', async () => {
    const nftId = 1;

    // Approve transaction
    transaction = await realEstate.connect(seller).approve(await escrow.getAddress(), nftId)
    await transaction.wait();

    transaction = await escrow.connect(seller).list(nftId);
    await transaction.wait();
    expect(await realEstate.ownerOf(nftId)).to.be.equal(await escrow.getAddress())

    // Now the NFT (representing the RE property is owned by the Escrow)
    const isListed = await escrow.isListed(nftId);
    expect(isListed).to.equal(true);
  })
});
