import oneInchApi from "@lib/server/api/one-inch";
import { NextRequest, NextResponse } from "next/server";

import { ApiError } from "@/lib/server/utils/Error";

export async function GET(req: NextRequest): Promise<NextResponse<{ data: { dstAmount: string } } | { error: string }>> {
  try {
    const params = req.nextUrl.searchParams;

    const srcToken = params.get("srcToken");
    const dstToken = params.get("dstToken");
    const amount = params.get("amount");
    const amountNb = Number(amount);

    if (!srcToken || !dstToken || !amount || Number.isNaN(amountNb)) {
      return NextResponse.json({ error: "missing parameters" }, { status: 400 });
    }

    const response = await oneInchApi.getQuote(srcToken, dstToken, amountNb);

    return NextResponse.json({ data: { dstAmount: response.dstAmount } });
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
