import { useWeb3React } from '@web3-react/core';
import { injected } from '../../components/connectors/injected';
import {FaConnectdevelop} from 'react-icons/fa'
import Web3 from 'web3';
import { useState, useEffect } from 'react';

const Home = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    function checkConnectedWallet() {
      const userData = JSON.parse(localStorage.getItem('userAccount'));
      if (userData != null) {
        setUserInfo(userData);
        setIsConnected(true);
      }
    }
    checkConnectedWallet();
  }, []);

  const { active, account, activate, deactivate } = useWeb3React();

  const onDisconnect = () => {
    window.localStorage.removeItem('userAccount');
    setUserInfo({});
    setIsConnected(false);
  };

  const saveUserInfo = (ethBalance, account, chainId) => {
    const userAccount = {
      account: account,
      balance: ethBalance,
      connectionid: chainId,
    };
    window.localStorage.setItem('userAccount', JSON.stringify(userAccount)); //user persisted data
    const userData = JSON.parse(localStorage.getItem('userAccount'));
    setUserInfo(userData);
    setIsConnected(true);
  };

  
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      // eslint-disable-next-line
      provider = window.web3.currentProvider;
    } else {
      console.log(
        alert("Please Download Metamask")
      );
    }
    return provider;
  };

  const connect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      await activate(injected);
      const web3 = new Web3(currentProvider);
      let ethBalance = await web3.eth.getBalance(account); // Get wallet balance
      ethBalance = web3.utils.fromWei(ethBalance, 'ether');
      saveUserInfo(ethBalance);
     

    } catch (ex) {
      console.log(ex)
    }
  };
  const disconnect = () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex)
    }
  };
  return (
    <div>
      <button
        onClick={connect}
        style={{   
          fontSize: 50,
          color: 'orange',       
          marginTop: 200,
          marginLeft:200,                      
        }}>        
        <a href='#' className='flex items-center gap-x-2'> <FaConnectdevelop/> {active ? 'Connected' : 'Connect a Wallet' } </a>
        
      </button> <h4  style={{
        padding: 6,
        fontSize: 50,
        color: 'white',
        marginTop: 35,
        marginLeft:285
      }}> {account}  {active ?  <div >
        <span>Balance:</span>
        {userInfo.balance}
      </div> :'' }</h4>  {' '}
      <br />
      <br />
      {active ? <button onClick={disconnect} style={{
        padding: 6,
        fontSize: 50,
        color: 'red',
        marginTop: 300,
        marginLeft:1480
      }}>Deactivate</button> : '' }
      

     
    </div>
  );
};

export default Home;
