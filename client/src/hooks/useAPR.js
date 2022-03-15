import { useContractCall } from "@usedapp/core";
import { useTokenDistributor } from './useTokenDistributor';

const ether = '1000000000000000000';
const blocksPerDay = 24 * 60 * 60 / 3;

export const useAPR = () => {
  const [address, abi, chainId] = useTokenDistributor();

  // Total amount staked
  let [staked] = useContractCall({
    abi, address,
    method: 'totalAmountStaked',
    args: [],
  }) ?? [];

  // Reward per block
  let [reward] = useContractCall({
    abi, address,
    method: 'rewardPerBlockForStaking',
    args: [],
  }) ?? [];

  if (staked && reward) {
    staked = parseFloat(staked.div(ether));
    reward = parseFloat(reward.div(ether));
    return (reward * blocksPerDay * 365) / staked - 1;
  }
  return 0;
}