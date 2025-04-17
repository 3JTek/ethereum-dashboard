import { describe, expect, it } from "vitest";

import abbreviateWalletAddress from "./abbreviateWalletAddress";

describe("abbreviatedWalletAddress", () => {
  it("should abbreviate a wallet address correctly", () => {
    const address = "0x1234567890abcdef1234567890abcdef12345678";
    const result = abbreviateWalletAddress(address);
    expect(result).toBe("0x1234...345678");
  });

  it("should return the same address if it is too short to abbreviate", () => {
    const address = "0x1234";
    const result = abbreviateWalletAddress(address);
    expect(result).toBe(address);
  });

  it("should handle empty address", () => {
    const address = "";
    const result = abbreviateWalletAddress(address);
    expect(result).toBe("");
  });
});
