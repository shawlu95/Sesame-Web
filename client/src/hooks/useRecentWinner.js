import { useContractCall } from "@usedapp/core";
import { useSesame } from './useSesame';
export const useRecentWinner = (token, index) => {
  const [address, abi, chainId] = useSesame(token, index);
  const [lastWinner] = useContractCall({
    abi: abi,
    address: address,
    method: 'lastWinner',
    args: [],
  }) ?? [];
  return lastWinner;
}