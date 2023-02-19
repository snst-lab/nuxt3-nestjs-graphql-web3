import axiosBase from "axios";
import { constants } from "@constants";
import { buildQuery } from "./buildQuery";

const { config, chain } = constants.web3;
const { baseUrl, query } = config[chain].explorer;

const axios = axiosBase.create({
  baseURL: baseUrl + query.gasReporter.endpoint,
  headers: query.gasReporter.headers,
  responseType: "json",
});

export const getGasPrice = axios.get(buildQuery(query.gasReporter.data));
