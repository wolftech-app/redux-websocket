declare const process : {
  env: {
    REDUX_WEBSOCKET_VERSION: string
    NODE_ENV: 'development' | 'production'
  }
};

interface Window {
  _StatHat: {
    push: (args: [string, string, number]) => void;
  }
}
