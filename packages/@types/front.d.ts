export {};
declare global {
  var process: NodeJS.Process;
  var google: {
    accounts: {
      oauth2: {
        initCodeClient: (arg0: {
          client_id: any;
          scope: string;
          ux_mode: string;
          redirect_uri: any;
          state: string;
        }) => any;
      };
    };
  };
  var blockies: {
    create: any;
  };
  var party: {
    confetti: any;
    sparkles: any;
  };
  interface Window {
    ethereum: any;
  }
}
