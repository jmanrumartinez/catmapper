//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;
}

struct Property {
    bool listed;
    uint256 purchasePrice;
    uint256 escrowAmount;
    address buyer;
}

contract Escrow {
    address public nftAddress;
    address payable public seller;
    address public inspector;
    address public lender;

    mapping(uint256 => Property) public properties;

    constructor(
        address _nftAddress,
        address payable _seller,
        address _inspector,
        address _lender
    ) {
        nftAddress = _nftAddress;
        seller = _seller;
        inspector = _inspector;
        lender = _lender;
    }

    function list(
        uint256 _nftId,
        address _buyer,
        uint256 _purchasePrice,
        uint256 _escrowAmount
    ) public {
        IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftId);
        properties[_nftId] = Property({
            listed: true,
            purchasePrice: _purchasePrice,
            escrowAmount: _escrowAmount,
            buyer: _buyer
        });
    }

    function isListed(uint256 _nftId) public view returns (bool) {
        return properties[_nftId].listed;
    }

    function getPurchasePrice(uint256 _nftId) public view returns (uint256) {
        return properties[_nftId].purchasePrice;
    }

    function getEscrowAmount(uint256 _nftId) public view returns (uint256) {
        return properties[_nftId].escrowAmount;
    }

    function getBuyer(uint256 _nftId) public view returns (address) {
        return properties[_nftId].buyer;
    }
}
