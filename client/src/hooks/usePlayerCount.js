import { useContractCall } from "@usedapp/core";
import { useSesame } from './useSesame';
export const usePlayerCount = () => {
  const [address, abi, chainId] = useSesame();
  const [count] = useContractCall({
    abi: abi,
    address: address,
    method: 'getTicketCount',
    args: [],
  }) ?? [];
  if (count) {
    return count.toNumber();
  }
  return 0;
}