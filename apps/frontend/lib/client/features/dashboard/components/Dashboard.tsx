import BalanceList from "./BalanceList";
import EthereumPrice from "./EthPrice";
import Header from "./Title";
import WalletConnect from "./WalletConnect";

const Dashboard = () => {
  return (
    <div className="flex  flex-1 flex-col gap-10">
      <Header />
      <WalletConnect />
      <EthereumPrice />
      <BalanceList />
    </div>
  );
};

export default Dashboard;
