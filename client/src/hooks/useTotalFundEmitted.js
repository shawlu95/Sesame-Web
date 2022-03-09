// import { Web3 } from 'web3';
import { useContractCall } from "@usedapp/core";
import { useSesame } from './useSesame';
export const useTotalFundEmitted = () => {
  const [address, abi, chainId] = useSesame();
  const [totalFundEmitted] = useContractCall({
    abi: abi,
    address: address,
    method: 'totalFundEmitted',
    args: [],
  }) ?? [];
  if (totalFundEmitted) {
    return totalFundEmitted.div('1000000000000000000').toNumber();
  }
  return 0;
}