/**
 * remark: This is an example config file for a terra testnet chain and it should be deleted before merging.
 */
import type { Chain, AssetList } from "@chain-registry/types";

export const AuraTestnet: Chain = {
  $schema: "../../chain.schema.json",
  chain_name: "AuraTestnet",
  status: "live",
  network_type: "testnet",
  pretty_name: "Aura Testnet",
  chain_id: "euphoria-2",
  bech32_prefix: "aura",
  daemon_name: "aurad",
  node_home: "$HOME/.aurad",
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        denom: "ueaura",
        fixed_min_gas_price: 0,
        low_gas_price: 0.15,
        average_gas_price: 0.15,
        high_gas_price: 0.15,
      },
    ],
  },
  staking: {
    staking_tokens: [
      {
        denom: "ueaura",
      },
    ],
  },
  codebase: {
    git_repo: "https://github.com/terra-money/core",
    recommended_version: "v2.2.0",
    compatible_versions: ["v2.2.0"],
    cosmos_sdk_version: "0.45.10",
    tendermint_version: "0.34.22",
    cosmwasm_version: "0.27",
    cosmwasm_enabled: true,
  },
  apis: {
    rpc: [
      {
        address: "https://rpc.euphoria.aura.network/",
      },
    ],
    rest: [
      {
        address: "https://lcd.euphoria.aura.network/",
      },
    ],
    grpc: [],
  },
  logo_URIs: {
    png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra2/images/luna.png",
  },
  keywords: ["testnet"],
};

export const Auraasset: AssetList = {
  $schema: "../../assetlist.schema.json",
  chain_name: "AuraTestnet",
  assets: [
    {
      description: "The native token of Terra",
      denom_units: [
        {
          denom: "ueaura",
          exponent: 0,
          aliases: [],
        },
        {
          denom: "aura",
          exponent: 6,
          aliases: [],
        },
      ],
      base: "ueaura",
      name: "Aura",
      display: "Aura",
      symbol: "Aura",
      logo_URIs: {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra2/images/luna.png",
      },
      coingecko_id: "terra",
      keywords: ["staking"],
    },
  ],
};
