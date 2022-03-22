import { useEthers } from '@usedapp/core';
import { constants, utils } from "ethers";
import config from '../config.json';
import Product from '../artifacts/contracts/SesameGame.sol/SesameGame.json';

export const useSesame = (token, index) => {
  const { chainId } = useEthers();
  const { address } = config['97'][token]['products'][index];
  const abi = new utils.Interface(Product.abi);
  return [address, abi, chainId];
};