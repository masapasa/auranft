import { useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } else {
      alert('Please install MetaMask to use this feature');
    }
  };

  const subscribe = async () => {
    // Here you can add the logic to mint and send the NFT to the user's wallet address
    alert(`Subscribed! An NFT will be sent to ${walletAddress}`);
  };

  return (
    <div>
      <h1>Connect your wallet and subscribe to receive an NFT</h1>
      {walletAddress ? (
        <>
          <p>Connected with: {walletAddress}</p>
          <button onClick={subscribe}>Subscribe</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
