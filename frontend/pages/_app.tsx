/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */

import { Chain } from "@chain-registry/types";
import { Decimal } from "@cosmjs/math";
import { GasPrice } from "@cosmjs/stargate";
import { ThemeProvider } from "@cosmology-ui/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { assets, chains } from "chain-registry";
import type { AppProps } from "next/app";

import { terra2testnet, terra2testnetAssets } from "../config/terra2testnet";
import { ChainProvider } from "@cosmos-kit/react";
import { AuraTestnet, Auraasset } from "../config/auratestnet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ChainProvider
        chains={[...chains, AuraTestnet]}
        assetLists={[...assets, Auraasset]}
        wallets={[
          ...keplrWallets,
          // ...web3authWallets,
          // ...cosmostationWallets,
          // ...exodusWallets,
          // ...shellWallets,
          // ...leapWallets,
          // ...vectisWallets,
          // ...xdefiWallets,
          // ...omniWallets,
          // ...trustWallets,
          // ...frontierWallets,
          // ...stationWallets,
          // ...ExtensionWallets,
          // ...coin98Wallets,
        ]}
        throwErrors={false}
        defaultNameService={"stargaze"}
        walletConnectOptions={{
          signClient: {
            projectId: "a8510432ebb71e6948cfd6cde54b70f7",
            relayUrl: "wss://relay.walletconnect.org",
            metadata: {
              name: "CosmosKit Example",
              description: "CosmosKit test dapp",
              url: "https://test.cosmoskit.com/",
              icons: [
                "https://raw.githubusercontent.com/cosmology-tech/cosmos-kit/main/packages/docs/public/favicon-96x96.png",
              ],
            },
          },
        }}
        signerOptions={{
          signingStargate: (chain: Chain) => {
            switch (chain.chain_name) {
              case "osmosis":
                return {
                  gasPrice: new GasPrice(Decimal.zero(1), "uosmo"),
                };
              default:
                return void 0;
            }
          },
        }}
        logLevel={"DEBUG"}
        wrappedWithChakra={true} // required if `ChainProvider` is imported from `@cosmos-kit/react`
        endpointOptions={{
          isLazy: true,
          endpoints: {
            // cosmoshub: {
            //   isLazy: false,
            //   rpc: [
            //     {
            //       isLazy: true,
            //       url: "https://rpc.cosmos.directory/cosmoshub",
            //       headers: {},
            //     },
            //   ],
            // },
            AuraTestnet: {
              isLazy: true,
              rpc: [
                {
                  isLazy: true,
                  url: "https://rpc.euphoria.aura.network",
                  headers: {},
                },
              ],
            },
            terra2: {
              rpc: ["https://terra-rpc.lavenderfive.com/"],
              rest: ["https://phoenix-lcd.terra.dev/"],
            },
            terra2testnet: {
              rpc: ["https://terra-testnet-rpc.polkachu.com/"],
              rest: ["https://pisco-lcd.terra.dev/"],
            },
          },
        }}
      >

        <Component {...pageProps} />
      </ChainProvider>

    </ThemeProvider>
  );
}

export default MyApp;
