import 'react-native-gesture-handler';
import React from 'react';
import {useDeviceContext} from 'twrnc';

import {RootNavigation} from './navigation';
import tw from './lib/tailwind';
import ReduxProvider from './redux';

function App(): React.JSX.Element {
  useDeviceContext(tw);

  return (
    <ReduxProvider>
      <RootNavigation />
    </ReduxProvider>
  );
}

export default App;
