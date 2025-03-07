import { NextRequest, NextResponse } from "next/server";

import oneInchApi from "@/lib/shared/api/server/one-inch-api";

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
    console.error(error);

    let errorMessage;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "An error occurred";
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
