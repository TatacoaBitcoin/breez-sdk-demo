import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {
  addEventListener,
  mnemonicToSeed,
  NodeConfigType,
  defaultConfig,
  EnvironmentType,
  connect,
} from '@breeztech/react-native-breez-sdk';
import {generateMnemonic} from '@dreson4/react-native-quick-bip39';

import {BREEZ_API_KEY, BREEZ_INVITE_CODE, MNEMONIC_WORDS} from '@env';

const App = () => {
  useEffect(() => {
    // createConfig();
    getWords();
  }, []);

  const getWords = () => {
    const words = generateMnemonic();
    console.log(words);
  };

  // SDK events listener
  addEventListener((type, data) => {
    console.log(`received event ${type}`);
  });

  // Create the default config
  const createConfig = async () => {
    const seed = await mnemonicToSeed(MNEMONIC_WORDS);
    console.log(seed);
    // const nodeConfig = {
    //   type: NodeConfigType.GREENLIGHT,
    //   config: {
    //     inviteCode: BREEZ_INVITE_CODE,
    //   },
    // };
    // let config = defaultConfig(
    //   EnvironmentType.PRODUCTION,
    //   BREEZ_API_KEY,
    //   nodeConfig,
    // );
    // try {
    //   // Connect to the Breez SDK make it ready for use
    //   const sdkServices = await connect(config, seed);
    //   console.log(sdkServices);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;
