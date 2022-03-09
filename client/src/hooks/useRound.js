import { useContractCall } from "@usedapp/core";
import { useSesame } from './useSesame';
export const useRound = () => {
  const [address, abi, chainId] = useSesame();
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