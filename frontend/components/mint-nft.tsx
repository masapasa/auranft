import { useChain } from "@cosmos-kit/react";
import { useState } from "react";
import { useContracts } from '../output/contracts-context';

const chainNames = ["AuraTestnet"];

export const MintNFT = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [owner, setOwner] = useState("");
  const [tokenUri, setTokenUri] = useState("");
  const [extension, setExtension] = useState("");

  const { address } = useChain(chainNames[0]);


  const handleMint = async () => {
    if (!address) return;

    try {
      const cwclient =  cw721.getSigningClient(address);
      await cwclient.mint({
        owner: address,
        tokenId,
        tokenUri,
        extension: {},
        });
    } catch (error) {
      console.error(error);
    }
  };
  
  const { cw721 } = useContracts();

  return (

   <div>
      <h4>Interact with CosmWasm Smart Contract</h4>
      <div>
        <label>Contract Address:</label>
        <input
          type="text"
          value={cw721.address}
          onChange={(e) => setContractAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Token ID:</label>
        <input
          type="text"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
      </div>
      <div>
        <label>Owner:</label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </div>
      <div>
        <label>Token URI:</label>
        <input
          type="text"
          value={tokenUri}
          onChange={(e) => setTokenUri(e.target.value)}
        />
      </div>
      <div>
        <label>Extension:</label>
        <input
          type="text"
          value={extension}
          onChange={(e) => setExtension(e.target.value)}
        />
      </div>
      <button onClick={handleMint}>Mint</button>
    </div>
  );
};