import { useContractFunction, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { constants, utils } from "ethers"
import { useSesame } from './useSesame';
import { parseEther } from "ethers/lib/utils";


export const useEnter = (token, index, pricePerTicket, native) => {
  const [address, abi, chainId] = useSesame(token, index);
  const contract = new Contract(address, abi)
  const { send, state: mintState } = useContractFunction(
    contract, "enter", {
    transactionName: "Enter"
  })
  const enter = (ticket) => {
    if (native) {
      const ether = pricePerTicket.mul(ticket);
      send(ticket, { value: ether.toString() });
    } else {
      send(ticket);
    }
  };
  return { enter, mintState };
}