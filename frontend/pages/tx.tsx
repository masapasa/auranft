/* eslint-disable no-alert */
import { Asset, AssetList } from "@chain-registry/types";
import { StdFee } from "@cosmjs/amino";
import { SigningStargateClient } from "@cosmjs/stargate";
import { useChain, useWalletClient } from "@cosmos-kit/react";
import BigNumber from "bignumber.js";
import { assets } from "chain-registry";
import { cosmos } from "juno-network";
import { useState } from "react";

import { ChainsTXWalletSection, SendTokensdiv } from "../components";
import { ExtendedHttpEndpoint } from "@cosmos-kit/core";

const chainName = "cosmoshub";

const chainassets: AssetList = assets.find(
  (chain) => chain.chain_name === chainName
) as AssetList;

const coin: Asset = chainassets.assets.find(
  (asset) => asset.base === "uatom"
) as Asset;

const sendTokens = (
  getSigningStargateClient: () => Promise<SigningStargateClient>,
  setResp: (resp: string) => any,
  address: string
) => {
  return async () => {
    const stargateClient = await getSigningStargateClient();
    if (!stargateClient || !address) {
      console.error("stargateClient undefined or address undefined.");
      return;
    }

    const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;

    const msg = send({
      amount: [
        {
          denom: coin.base,
          amount: "1",
        },
      ],
      toAddress: address,
      fromAddress: address,
    });

    const fee: StdFee = {
      amount: [
        {
          denom: coin.base,
          amount: "1",
        },
      ],
      gas: "86364",
    };
    try {
      const response = await stargateClient.signAndBroadcast(
        address,
        [msg],
        fee
      );
      setResp(JSON.stringify(response, null, 2));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function Home() {
  const [cosmo_getAccount, setCosmo_getAccount] = useState<
    string | undefined
  >();
  const [cosmos_signAmino, setCosmos_signAmino] = useState<
    string | undefined
  >();

  const { getSigningStargateClient, address, status, getRpcEndpoint } =
    useChain(chainName);

  const { client } = useWalletClient();

  const [balance, setBalance] = useState(new BigNumber(0));
  const [isFetchingBalance, setFetchingBalance] = useState(false);
  const [resp, setResp] = useState("");
  const getBalance = async () => {
    if (!address) {
      setBalance(new BigNumber(0));
      setFetchingBalance(false);
      return;
    }

    let rpcEndpoint = await getRpcEndpoint();

    if (!rpcEndpoint) {
      console.info("no rpc endpoint — using a fallback");
      rpcEndpoint = `https://rpc.euphoria.aura.network`;
    }

    // get RPC client
    const client = await cosmos.ClientFactory.createRPCQueryClient({
      rpcEndpoint:
        typeof rpcEndpoint === "string"
          ? rpcEndpoint
          : (rpcEndpoint as ExtendedHttpEndpoint).url,
    });

    // fetch balance
    const balance = await client.cosmos.bank.v1beta1.balance({
      address,
      denom: chainassets?.assets[0].base as string,
    });

    // Get the display exponent
    // we can get the exponent from chain registry asset denom_units
    const exp = coin.denom_units.find((unit) => unit.denom === coin.display)
      ?.exponent as number;

    // show balance in display values by exponentiating it
    const a = new BigNumber(balance.balance?.amount || 0);
    const amount = a.multipliedBy(10 ** -exp);
    setBalance(amount);
    setFetchingBalance(false);
  };

  const directSignDoc = {
    bodyBytes:
      "0a90010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412700a2d636f736d6f7331706b707472653766646b6c366766727a6c65736a6a766878686c63337234676d6d6b38727336122d636f736d6f7331717970717870713971637273737a673270767871367273307a716733797963356c7a763778751a100a0575636f736d120731323334353637",
    authInfoBytes:
      "0a0a0a0012040a020801180112130a0d0a0575636f736d12043230303010c09a0c",
    chainId: "cosmoshub-4",
    accountNumber: "1",
  };

  const aminoSignDoc = {
    msgs: [],
    fee: { amount: [], gas: "23" },
    chain_id: "cosmoshub-4",
    memo: "hello, world",
    account_number: "7",
    sequence: "54",
  };

  return (
    <div>
      <ChainsTXWalletSection chainName={chainName} />

      <div>
        <SendTokensdiv
          isConnectWallet={status === "Connected"}
          balance={balance.toNumber()}
          isFetchingBalance={isFetchingBalance}
          response={resp}
          sendTokensbuttonText="Send Tokens"
          handleClickSendTokens={sendTokens(
            getSigningStargateClient as () => Promise<SigningStargateClient>,
            setResp as () => any,
            address as string
          )}
          handleClickGetBalance={() => {
            setFetchingBalance(true);
            getBalance();
          }}
        />
        <div>
          <button
            onClick={async () => {
              const r = await (client as any).getAccount("cosmoshub-4");
              setCosmo_getAccount(JSON.stringify(r));
            }}
          >
            cosmos_getAccounts
          </button>
          {cosmo_getAccount && (
            <div>
              <div>
                <span>{cosmo_getAccount}</span>
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={async () => {
              if (address) {
                const r = await client?.signAmino?.(
                  "cosmoshub-4",
                  address,
                  aminoSignDoc
                );
                setCosmos_signAmino(JSON.stringify(r));
              }
            }}
          >
            cosmos_signAmino
          </button>
          {cosmos_signAmino && (
            <div>
              <div>
                <span>{cosmos_signAmino}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
