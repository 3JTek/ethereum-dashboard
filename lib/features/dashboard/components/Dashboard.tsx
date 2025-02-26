import BalanceList from "./BalanceList";
import EthereumPrice from "./EthPrice";
import Header from "./Header";
import WalletConnect from "./WalletConnect";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-10">
      <Header />
      <WalletConnect />
      <EthereumPrice />
      <BalanceList />
    </div>
  );
};

export default Dashboard;
