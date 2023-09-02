import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {
  addEventListener,
  mnemonicToSeed,
  NodeConfigType,
  defaultConfig,
  EnvironmentType,
  connect,
  nodeInfo,
  receivePayment,
  sendPayment,
} from '@breeztech/react-native-breez-sdk';

import {BREEZ_API_KEY, BREEZ_INVITE_CODE, MNEMONIC_WORDS} from '@env';

const App = () => {
  const [balance, setBalance] = useState({});

  useEffect(() => {
    createConfig();
  }, []);

  // SDK events listener
  addEventListener((type, data) => {
    console.log(`received event ${type}`);
  });

  // Create the default config
  const createConfig = async () => {
    const seed = await mnemonicToSeed(MNEMONIC_WORDS);

    const nodeConfig = {
      type: NodeConfigType.GREENLIGHT,
      config: {
        inviteCode: BREEZ_INVITE_CODE,
      },
    };

    let config = await defaultConfig(
      EnvironmentType.PRODUCTION,
      BREEZ_API_KEY,
      nodeConfig,
    );

    try {
      // Connect to the Breez SDK make it ready for use
      await connect(config, seed);
    } catch (error) {
      console.log(error);
    }
  };

  const checkBalance = async () => {
    try {
      const nodeInformation = await nodeInfo();
      const lnBalance = nodeInformation.channelsBalanceMsat;
      const onchainBalance = nodeInformation.onchainBalanceMsat;
      setBalance({
        lightning: lnBalance,
        btc: onchainBalance,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const receiveLNPayment = async () => {
    try {
      const invoice = await receivePayment(100, 'Invoice for 100 sats');
      console.log(invoice);
    } catch (error) {
      console.log(error);
    }
  };

  const sendLNPayment = async () => {
    const bolt11 =
      'lnbc500n1pj09qdfpp52fg7hjf327j65ukvfa8fqwaas9m0ggx5zt3nqe5emy3hs77qd78qdqqcqzzsxqyz5vqsp5l303att3urq929l9tzm0heknhrfnegks6pkkv89y8ytv59gtn4gs9qyyssq54qakegz9va5dfjv7gh5zvyqsu7zv56jvn35ps3mxp45mxpu7eek3462qwjuleejqpwxu0tx0s3e8pf2la0vm60nplh46wfxnt42srcqrky2th';
    try {
      const payment = await sendPayment(bolt11);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Lightning {balance.lightning ?? '0'} msat</Text>
      <Text>BTC {balance.btc ?? '0'}</Text>
      <Button onPress={checkBalance} title="Check Balance" />
      <Button onPress={receiveLNPayment} title="Receive LN Payment" />
      <Button onPress={sendLNPayment} title="Send LN Payment" />
    </View>
  );
};

export default App;
