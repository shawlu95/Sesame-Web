import { useContractCall } from "@usedapp/core";
import { useSesame } from './useSesame';
export const useRecentWinner = () => {
  const [address, abi, chainId] = useSesame();
  const [recentWinner] = useContractCall({
    abi: abi,
    address: address,
    method: 'recentWinner',
    args: [],
  }) ?? [];
  return recentWinner;
}