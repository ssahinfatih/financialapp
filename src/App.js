import Home from './pages/home';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

import Header from "./components/headers/Header"
import './style.css' ;



const getLibrary = (provider) => {
  return new Web3(provider);
};

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div>   
            <Header />
            <Home />
                                   
      </div>
    </Web3ReactProvider>
    
  );
};

export default App;
