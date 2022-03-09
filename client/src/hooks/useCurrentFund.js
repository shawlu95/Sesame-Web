import { useContractCall } from "@usedapp/core";
import { useSesame } from './useSesame';
export const useCurrentFund = () => {
  const [address, abi, chainId] = useSesame();
  const [currentFund] = useContractCall({
    abi: abi,
    address: address,
    method: 'currentFund',
    args: [],
  }) ?? [];
  if (currentFund) {
    return currentFund.div('1000000000000000000').toNumber();
  }
  return 0;
}