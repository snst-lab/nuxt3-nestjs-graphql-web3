import config from "./config";
import chainIds from "./chainIds";
import hosts from "./hosts";
import number from "./number";

require("dotenv").config({
  path: require("path").join(__dirname, "../../../.env"),
});

export default {
  config,
  host: hosts[process.env.EVM_HOST],
  chainIds,
  chain: process.env.CHAIN,
  accounts: {
    admin: {
      address: process.env.EVM_ADMIN_ADDRESS,
      secret: process.env.EVM_ADMIN_SECRET,
    },
    user: {
      address: process.env.EVM_USER_ADDRESS,
      secret: process.env.EVM_USER_SECRET,
    },
  },
  ipfs: {
    nftStorage: {
      key: process.env.NFT_STORAGE_APIKEY,
    },
  },
  number,
};
