import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.join(__dirname, "../../../.env"),
});

export default {
  auth_id: process.env.JIRA_ID,
  auth_token: process.env.JIRA_TOKEN,
  host: process.env.JIRA_HOST,
};
