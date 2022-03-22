import { useEthers } from '@usedapp/core';
import { constants, utils } from "ethers";
import config from '../config.json';
import Product from '../artifacts/contracts/SesameToken.sol/SesameToken.json';

export const useSesameToken = () => {
  const { chainId } = useEthers();
  const address = config['97'].SESA.tokenAddress;
  const abi = new utils.Interface(Product.abi);
  return [address, abi, chainId];
};