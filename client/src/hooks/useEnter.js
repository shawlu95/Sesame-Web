import { useContractFunction, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { constants, utils } from "ethers"
import { useSesame } from './useSesame';


export const useEnter = (pricePerTicket) => {
  const [address, abi, chainId] = useSesame();
  const contract = new Contract(address, abi)
  const { send, state: mintState } = useContractFunction(
    contract, "enter", {
    transactionName: "Enter"
  })
  const enter = (tickets) => {
    const ether = tickets * pricePerTicket;
    return send(tickets, {
      value: utils.parseEther(ether.toString())
    });
  };
  return { enter, mintState };
}