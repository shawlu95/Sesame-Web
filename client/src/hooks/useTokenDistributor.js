import { useEthers } from '@usedapp/core';
import { utils } from "ethers";
import config from '../config.json';
import TokenDistributor from '../artifacts/contracts/TokenDistributor.sol/TokenDistributor.json';

export const useTokenDistributor = () => {
  const { chainId } = useEthers();
  const address = config.TokenDistributor.address;
  const abi = new utils.Interface(TokenDistributor.abi);
  return [address, abi, chainId];
};