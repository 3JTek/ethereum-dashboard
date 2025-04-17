import { NextRequest, NextResponse } from "next/server";

import oneInchApi from "@/lib/server/api/one-inch";
import { OneInchGetSwapDataResponse } from "@/lib/server/api/one-inch/getSwapData";
import { ApiError } from "@/lib/server/utils/Error";

export async function GET(req: NextRequest): Promise<NextResponse<{ data: OneInchGetSwapDataResponse } | { error: string }>> {
  try {
    const params = req.nextUrl.searchParams;

    const srcToken = params.get("srcToken");
    const dstToken = params.get("dstToken");
    const amount = params.get("amount");
    const amountNb = Number(amount);
    const wallet = params.get("wallet");

    if (!srcToken || !dstToken || !amount || Number.isNaN(amountNb) || !wallet) {
      return NextResponse.json({ error: "missing parameters" }, { status: 400 });
    }

    const response = await oneInchApi.getSwapData({ srcToken, dstToken, amount: amountNb, wallet });

    return NextResponse.json({ data: response });
  } catch (error) {
    let errorMessage;
    let errorStatus;

    if (error instanceof ApiError) {
      errorMessage = error.message;
      errorStatus = error.getCode();
    } else {
      errorMessage = "An error occurred";
      errorStatus = 500;
    }
    return NextResponse.json({ error: errorMessage }, { status: errorStatus });
  }
}
