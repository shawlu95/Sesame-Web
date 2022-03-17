import { useContractCall } from "@usedapp/core";
import { useSesame } from './useSesame';
export const useRecentWinner = () => {
  const [address, abi, chainId] = useSesame();
  const [lastWinner] = useContractCall({
    abi: abi,
    address: address,
    method: 'lastWinner',
    args: [],
  }) ?? [];
  return lastWinner;
}