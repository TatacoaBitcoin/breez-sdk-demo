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

  return (
    <View>
      <Text>Lightning {balance.lightning ?? '0'}</Text>
      <Text>BTC {balance.btc ?? '0'}</Text>
      <Button onPress={checkBalance} title="Check Balance" />
    </View>
  );
};

export default App;
