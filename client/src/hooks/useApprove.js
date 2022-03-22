import { useContractFunction, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { useSesameToken } from './useSesameToken';
import { parseEther } from "ethers/lib/utils";

export const useApprove = (token, index, pricePerTicket) => {
  const [address, abi, chainId] = useSesameToken(token, index);
  const contract = new Contract(address, abi)
  const { send, state: mintState } = useContractFunction(
    contract, "approve", {
    transactionName: "Enter"
  });

  const approve = (spender, ticket) => {
    const ether = pricePerTicket.mul(ticket);
    return send(spender, ether.toString());
  };
  return { approve, mintState };
}