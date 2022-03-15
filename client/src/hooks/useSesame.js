import { useEthers } from '@usedapp/core';
import { constants, utils } from "ethers";
import config from '../config.json';
import SesameBnb from '../artifacts/contracts/SesameNative.sol/SesameNative.json';

export const useSesame = () => {
  const { chainId } = useEthers();
  const address = config.SesameBnb.address;
  const abi = new utils.Interface(SesameBnb.abi);
  return [address, abi, chainId];
};