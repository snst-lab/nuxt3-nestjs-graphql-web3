export {};
declare module "*.json" {
  const data: any;
  export default data;
}

declare global {
  namespace Guard {
    export type Auth = {
      auth: {
        type: string;
        profile: Record<string, any>;
      };
    };
    export type Ether = {
      ether: {
        message: string;
        address: string;
        signature: string;
      };
    };
  }
}
