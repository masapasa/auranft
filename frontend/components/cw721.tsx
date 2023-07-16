import { useChain } from "@cosmos-kit/react";
import { ContractsProvider, useContracts } from '../output/contracts-context';
import { MintNFT } from "./mint-nft";

const chainNames = ["AuraTestnet"];

export const Cw721 = () => {
  const { address, getSigningCosmWasmClient, getCosmWasmClient } = useChain("AuraTestnet");

  return (
    <div>
        <ContractsProvider
      contractsConfig={{
        address:"aura1kxxtjvwgkwfsrxdpy92d64qsy8k4j2e3m2wccmefrqcz9205h2hssq8klh",
        getCosmWasmClient,
        getSigningCosmWasmClient,
      }}
    >
        <MintNFT />
      </ContractsProvider>
    </div>
  );
};