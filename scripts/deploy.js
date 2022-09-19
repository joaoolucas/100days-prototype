const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");

async function main() {
  //   const posup = await ethers.getContractFactory("Posup");
  //   // deploy the contract
  //   const deployedPosup = await posup.deploy();

  //   const charityNature = await ethers.getContractFactory("CharityNature");
  //   // deploy the contract
  //   const deployedCharityNature = await charityNature.deploy();

  const contract = await ethers.getContractFactory("Contract");
  // deploy the contract
  const deployedContract = await contract.deploy();

  //   await deployedPosup.deployed();

  //   await deployedCharityNature.deployed();

  await deployedContract.deployed();

  //   // print the address of the deployed contract
  //   console.log("Verify Contract Address:", deployedPosup.address);

  //   console.log("Verify Contract Address:", deployedCharityNature.address);

  console.log("Verify Contract Address:", deployedContract);

  console.log("Waiting for Etherscan verification.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);

  // Verify the contract after deploying
  //   await hre.run("verify:verify", {
  //     address: deployedPosup.address,
  //     constructorArguments: [],
  //   });

  //   await hre.run("verify:verify", {
  //     address: deployedCharityNature.address,
  //     constructorArguments: [],
  //   });

  await hre.run("verify:verify", {
    address: deployedContract.address,
    constructorArguments: [],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//