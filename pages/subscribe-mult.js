import { useState } from 'react';
import { useWallet } from '@terra-money/wallet-provider';

const SendNFT = () => {
  const [addresses, setAddresses] = useState('');
  const [status, setStatus] = useState('');
  const wallet = useWallet();

  const handleSendNFT = async () => {
    if (!wallet.connected) {
      setStatus('Please connect your wallet first');
      return;
    }

    const senders = addresses.split(',').map(address => address.trim());
    if (senders.length === 0) {
      setStatus('Please enter at least one address');
      return;
    }

    try {
      setStatus('Sending NFTs...');
      const result = await wallet.post({
        msgs: [
          {
            type: 'wasm/MsgExecuteContract',
            value: {
              sender: wallet.walletAddress,
              contract: '<CONTRACT_ADDRESS>',
              execute_msg: {
                receive: {
                  sender: senders,
                  amount: '<AMOUNT>',
                  msg: '<MSG>',
                },
              },
              coins: [],
            },
          },
        ],
      });
      setStatus(`NFTs sent successfully! TxHash: ${result.result.txhash}`);
    } catch (error) {
      setStatus(`Error sending NFTs: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Send NFT</h2>
      <textarea
        value={addresses}
        onChange={e => setAddresses(e.target.value)}
        placeholder="Enter comma-separated addresses"
        rows={5}
      />
      <button onClick={handleSendNFT}>Send NFT</button>
      <p>{status}</p>
    </div>
  );
};

export default SendNFT;
