export class ToolsRandom {
  private numberBase = "1234567890";
  private base36Base = "1234567890abcdefghijklmnopqrstuvwxyz";
  private stringBase =
    "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  constructor() {}

  guid(length?: number): string {
    // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
    // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    const chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
      switch (chars[i]) {
        case "x":
          chars[i] = Math.floor(Math.random() * 16)
            .toString(16)
            .toUpperCase();
          break;
        case "y":
          chars[i] = (Math.floor(Math.random() * 4) + 8)
            .toString(16)
            .toUpperCase();
          break;
      }
    }
    return chars.join("");
  }

  base36(length: number = 12): string {
    let value = "";
    const prefix = new Date().getTime().toString(36);
    length = length - prefix.length;
    for (let i = 0; i < length; i++) {
      value += this.base36Base.charAt(
        Math.floor(Math.random() * this.base36Base.length)
      );
    }
    return prefix + value;
  }

  string(length: number = 16): string {
    let value = "";
    const prefix = new Date().getTime().toString(36);
    length = length - prefix.length;
    for (let i = 0; i < length; i++) {
      value += this.stringBase.charAt(
        Math.floor(Math.random() * this.stringBase.length)
      );
    }
    return prefix + value;
  }

  number(length: number = 12): number {
    let value = "";
    for (let i = 0; i < length; i++) {
      value += this.numberBase.charAt(
        Math.floor(Math.random() * this.numberBase.length)
      );
    }
    return +value;
  }

  password(length: number = 12): string {
    let value = "";
    for (let i = 0; i < length; i++) {
      value += this.stringBase.charAt(
        Math.floor(Math.random() * this.stringBase.length)
      );
    }
    return value;
  }
}
