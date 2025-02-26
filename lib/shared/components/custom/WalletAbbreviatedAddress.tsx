import abbreviateWalletAddress from "../../wallet/helpers/abbreviateWalletAddress";

const WalletAbbreviatedAddress = ({ address }: { address: `0x${string}` }) => {
  const abbreviatedWalletAddress = abbreviateWalletAddress(address);

  return <p data-testid="wallet-address">{abbreviatedWalletAddress}</p>;
};

export default WalletAbbreviatedAddress;
