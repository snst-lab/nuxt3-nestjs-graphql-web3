import axiosBase from "axios";
import { constants } from "@constants";
import { buildQuery } from "./buildQuery";

const { config, chain } = constants.web3;
const { baseUrl, query } = config[chain].explorer;

const axios = axiosBase.create({
  baseURL: baseUrl + query.price.endpoint,
  headers: query.price.headers,
  responseType: "json",
});

export const getAssetPrice = axios.get(buildQuery(query.price.data));
