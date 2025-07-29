import { expect } from "chai";
import hre from "hardhat";

const tokens = (n) => {
  return hre.ethers.parseUnits(n.toString(), "ether");
};

describe("Escrow", () => {
  let escrow = null;
  let realEstateAddress = null;
  let buyer, seller, inspector, lender, random = null
  let realEstate = null
  let transaction = null;

  beforeEach(async () => {
    // Deploy RealEstate contract
    const realEstateFactory = await hre.ethers.getContractFactory("RealEstate");
    realEstate = await realEstateFactory.deploy();

    // Get signers
    const [buyerSigner, sellerSigner, inspectorSigner, lenderSigner, randomSigner] = await hre.ethers.getSigners();
    buyer = buyerSigner;
    seller = sellerSigner;
    inspector = inspectorSigner;
    lender = lenderSigner;
    random = randomSigner;

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

    transaction = await escrow.connect(seller).list(nftId, buyer.address, tokens(10), tokens(5));
    await transaction.wait();
    expect(await realEstate.ownerOf(nftId)).to.be.equal(await escrow.getAddress())

    // Now the NFT (representing the RE property is owned by the Escrow)
    const isListed = await escrow.isListed(nftId);
    expect(isListed).to.equal(true);

    const purchasePrice = await escrow.getPurchasePrice(nftId);
    expect(purchasePrice).to.equal(tokens(10));

    const escrowAmount = await escrow.getEscrowAmount(nftId);
    expect(escrowAmount).to.equal(tokens(5));

    const buyerNft = await escrow.getBuyer(nftId);
    expect(buyerNft).to.equal(buyer.address)
  })

  it('should not allow to list a property if the sender is not the seller', async () => {
    const nftId = 1;

    await expect(
      escrow.connect(random).list(nftId, buyer.address, tokens(10), tokens(5))
    ).to.be.revertedWith("Only seller can call this method");
  })

  it('should allow the buyer the deposit the escrow amount', async () => {
    const nftId = 1;

    // Approve transaction
    transaction = await realEstate.connect(seller).approve(await escrow.getAddress(), nftId)
    await transaction.wait();

    transaction = await escrow.connect(seller).list(nftId, buyer.address, tokens(10), tokens(5));
    await transaction.wait();

    transaction = await escrow.connect(buyer).depositEscrow(1, {
      value: tokens(5)
    })

    await transaction.wait();
    const balanceOfEscrow = await escrow.getBalance();

    expect(balanceOfEscrow).to.be.equal(tokens(5));
  })
});
