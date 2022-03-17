import { useEthers } from '@usedapp/core';
import { constants, utils } from "ethers";
import config from '../config.json';
import Product from '../artifacts/contracts/SesameGenericAsync.sol/SesameGenericAsync.json';

const token = 'BNB';
const index = 3;
export const useSesame = () => {
  const { chainId } = useEthers();
  const address = config[token][index].address;
  console.log(address)
  const abi = new utils.Interface(Product.abi);
  return [address, abi, chainId];
};