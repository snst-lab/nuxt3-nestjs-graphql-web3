import { ToolsRandom } from "./random";
import { ToolsString } from "./string";

export const tools = {
  sleep: (delay: number = 0, callback?: () => {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(callback);
      }, delay);
    });
  },
  random: new ToolsRandom(),
  string: new ToolsString(),
};
