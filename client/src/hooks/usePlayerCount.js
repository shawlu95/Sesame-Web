import { useContractCall } from "@usedapp/core";
import { useSesame } from './useSesame';
export const usePlayerCount = (token, index) => {
  const [address, abi, chainId] = useSesame(token, index);
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