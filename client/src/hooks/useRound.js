import { useContractCall } from "@usedapp/core";
import { useSesame } from './useSesame';
export const useRound = (token, index) => {
  const [address, abi, chainId] = useSesame(token, index);
  const [round] = useContractCall({
    abi: abi,
    address: address,
    method: 'round',
    args: [],
  }) ?? [];
  if (round) {
    return round.toNumber();
  }
  return 0;
}