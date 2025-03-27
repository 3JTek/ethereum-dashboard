const abbreviateWalletAddress = (address: string, length = 6) => {
  if (typeof address !== "string") {
    return "";
  } else if (address.length < length * 2) {
    return address;
  } else {
    return `${address.slice(0, length)}...${address.slice(-length)}`;
  }
};

export default abbreviateWalletAddress;
