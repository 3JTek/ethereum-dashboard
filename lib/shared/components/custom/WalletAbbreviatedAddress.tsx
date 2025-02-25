const WalletAbbreviatedAddress = ({ address }: { address: `0x${string}` }) => {
  return <p data-testid="wallet-address">{address ? `${address.slice(0, 7)}...${address?.slice(-5)}` : ""}</p>;
};

export default WalletAbbreviatedAddress;
