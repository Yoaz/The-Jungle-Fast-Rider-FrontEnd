import "./App.scss";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { Mainnet, DAppProvider, Goerli } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

export const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider("mainnet"),
    [Goerli.chainId]: getDefaultProvider("goerli"),
  },
};

function App() {
  return (
    <div className="app">
      <DAppProvider config={config}>
        <Header></Header>
        <Shop></Shop>
      </DAppProvider>
    </div>
  );
}

export default App;
