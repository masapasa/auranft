import { useChain, useWallet } from "@cosmos-kit/react";
import React, { useEffect } from "react";

import { ChainWalletdiv } from "../components";
import Cw721 from "./cw721";

const chainNames_1 = ["AuraTestnet"];
const chainNames_2 = ["AuraTestnet"];

export default () => {
  const { username, connect, disconnect, wallet } = useChain(chainNames_1[0]);
  const { status: globalStatus, mainWallet } = useWallet(); 
  useEffect(() => {
    const fn = async () => {
      await mainWallet?.connect();
    };
    fn();
  }, []);

  const addressInModal = chainNames_1.map((chainName) => {
    return (
      <ChainWalletdiv
        key={chainName}
        chainName={chainName}
        type="address-in-modal"
      />
    );
  });

  const addressOnPage = chainNames_2.map((chainName) => {
    return (
      <ChainWalletdiv
        key={chainName}
        chainName={chainName}
        type="address-on-page"
      />
    );
  });

  const getGlobalbutton = () => {
    if (globalStatus === "Connecting") {
      return <button>{`Connecting ${wallet?.prettyName}`}</button>;
    }
    if (globalStatus === "Connected") {
      return (
        <div style={{ maxWidth: "60%", margin: "auto" }}>
          <button>{wallet?.prettyName}</button>
          <button>{username}</button>
          <button
            onClick={async () => {
              await disconnect();
              
            }}
          >
            Disconnect
          </button>
          <Cw721 />
        </div>
      );
    }

    return <button onClick={() => connect()}>Connect Wallet</button>;
  };

  return (
    <div>
      <div>
        <h4 style={{ marginBottom: "3px" }}>ChainProvider Test</h4>
        {getGlobalbutton()}
      </div>
      <div>
        <h5>Address div in Modal</h5>
        <div>{addressInModal}</div>
      </div>
      <div>
        <h5>Address div on Page</h5>
        <div>{addressOnPage}</div>
      </div>
    </div>
  );
};
