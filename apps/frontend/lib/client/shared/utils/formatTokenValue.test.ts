import { describe, expect, it } from "vitest";

import { convertTokenUnits, formatNumberForDisplay, roundTokenBalance } from "./formatTokenValue";

describe("convertTokenUnits", () => {
  it("should convert token units correctly", () => {
    const value = BigInt(1000000000000000000);
    const decimals = 18;
    const result = convertTokenUnits(value, decimals);
    expect(result).toBe("1");
  });

  it("should handle zero value correctly", () => {
    const value = BigInt(0);
    const decimals = 18;
    const result = convertTokenUnits(value, decimals);
    expect(result).toBe("0");
  });
});

// describe("formatTokenValue", () => {
//   it("should return '0' when the balance is 0", () => {
//     expect(formatTokenValue(0)).toBe("0");
//   });

//   it("should format and round down a balance less than 1 with 4 decimal places", () => {
//     expect(formatTokenValue(0.123456)).toBe("0.1234");
//   });

//   it("should keep 4 non null decimals with very small number", () => {
//     expect(formatTokenValue(0.0000567890123)).toBe("0.00005678");
//   });

//   it("should format and round down balance greater than or equal to 1 with 4 decimal places", () => {
//     expect(formatTokenValue(1234.56789)).toBe("1,234.5678");
//   });

//   it("should not add trailing 0 for number with less than 4 decimals ", () => {
//     expect(formatTokenValue(1234567.89)).toBe("1,234,567.89");
//   });

//   it("should handle very large balances correctly", () => {
//     expect(formatTokenValue(9876543210.12345)).toBe("9,876,543,210.1234");
//   });
// });

describe("roundTokenBalance", () => {
  it("should round down a balance with more than 4 decimal places", () => {
    expect(roundTokenBalance(1234.56789)).toBe(1234.5678);
  });

  it("should round down a balance with less than 4 decimal places", () => {
    expect(roundTokenBalance(1234.5)).toBe(1234.5);
  });

  it("should round down a balance equal to 0", () => {
    expect(roundTokenBalance(0)).toBe(0);
  });

  it("should round down a very small balance", () => {
    expect(roundTokenBalance(0.0000567890123)).toBe(0.00005678);
  });
});

describe("formatNumberForDisplay", () => {
  it("should format a number with commas for thousands", () => {
    const value = 1234567.89;
    const result = formatNumberForDisplay(value);
    expect(result).toBe("1,234,567.89");
  });

  it("should format a number with no decimal places", () => {
    const value = 1000;
    const result = formatNumberForDisplay(value);
    expect(result).toBe("1,000");
  });

  it("should format a number with max decimal places for an integer (15 significant digits)", () => {
    const value = 1234.56789012345;
    const result = formatNumberForDisplay(value);
    expect(result).toBe("1,234.56789012345");
  });
});
