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

  it('should mark a property as inspected', async () => {
    const nftId = 1;

    // Approve transaction
    transaction = await realEstate.connect(seller).approve(await escrow.getAddress(), nftId)
    await transaction.wait();

    transaction = await escrow.connect(seller).list(nftId, buyer.address, tokens(10), tokens(5));
    await transaction.wait();

    transaction = await escrow.connect(inspector).setInspectionStatus(nftId, true);
    await transaction.wait();

    const isInspected = await escrow.isInspected(nftId);
    expect(isInspected).to.equal(true);
  })

  it('should not allow to mark a property if its not the inspector', async () => {
    const nftId = 1;

    // Approve transaction
    transaction = await realEstate.connect(seller).approve(await escrow.getAddress(), nftId)
    await transaction.wait();

    transaction = await escrow.connect(seller).list(nftId, buyer.address, tokens(10), tokens(5));
    await transaction.wait();

    expect(escrow.connect(random).setInspectionStatus(nftId, true)).to.be.revertedWith("Only inspector can call this method")
  })

  it('should approval the sale', async () => {
    const nftId = 1;

    // Approve transaction
    transaction = await realEstate.connect(seller).approve(await escrow.getAddress(), nftId)
    await transaction.wait();

    transaction = await escrow.connect(seller).list(nftId, buyer.address, tokens(10), tokens(5));
    await transaction.wait();

    // Approve the sale
    transaction = await escrow.connect(seller).approveSale(nftId);
    await transaction.wait();

    transaction = await escrow.connect(buyer).approveSale(nftId);
    await transaction.wait();

    transaction = await escrow.connect(lender).approveSale(nftId);
    await transaction.wait();

    expect(await escrow.hasApproved(nftId, seller.address)).to.equals(true);
    expect(await escrow.hasApproved(nftId, buyer.address)).to.equals(true);
    expect(await escrow.hasApproved(nftId, lender.address)).to.equals(true);
  })

  it('should transfer the property when all the conditions are met', async () => {
    const nftId = 1;

    // List and transfer the property to the escrow
    transaction = await realEstate.connect(seller).approve(await escrow.getAddress(), nftId)
    await transaction.wait();

    transaction = await escrow.connect(seller).list(nftId, buyer.address, tokens(10), tokens(5));
    await transaction.wait();

    // Inspector mark as as inspected 
    transaction = await escrow.connect(inspector).setInspectionStatus(nftId, true);
    await transaction.wait();

    // Buyer deposits escrow amount
    transaction = await escrow.connect(buyer).depositEscrow(nftId, {
      value: tokens(5)
    });
    await transaction.wait();

    // Lender pays the remaining amount (purchase price - escrow amount)
    await lender.sendTransaction({
      to: await escrow.getAddress(),
      value: tokens(5)
    })

    // Approve the sale
    transaction = await escrow.connect(seller).approveSale(nftId);
    await transaction.wait();

    transaction = await escrow.connect(buyer).approveSale(nftId);
    await transaction.wait();

    transaction = await escrow.connect(lender).approveSale(nftId);
    await transaction.wait();

    // We check the escrow to have the money on hold from the buyer + lender.
    expect(await escrow.getBalance()).to.equals(tokens(10))

    // We transfer the property
    transaction = await escrow.connect(seller).finalizeSale(nftId);
    await transaction.wait();

    // We check the escrow to have not any money and now the buyer is the owner of the property
    expect(await escrow.getBalance()).to.equals(0)
    expect(await realEstate.ownerOf(1)).to.equals(buyer.address)
  })
});
