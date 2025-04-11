import { NextRequest, NextResponse } from "next/server";

import { TokenAddress } from "@/lib/common/contracts/tokens";
import { ApiError } from "@/lib/common/utils/Error";
import oneInchApi from "@/lib/server/api/one-inch";

type Response = Promise<NextResponse<Awaited<ReturnType<typeof oneInchApi.getApproveTxData>> | { error: string }>>;

export async function GET(req: NextRequest): Response {
  try {
    const params = req.nextUrl.searchParams;

    const tokenAddress = params.get("tokenAddress") as TokenAddress;
    const amount = params.get("amount");

    if (!tokenAddress || !amount || Number.isNaN(Number(amount))) {
      return NextResponse.json({ error: "missing or bad parameters" }, { status: 400 });
    }

    const response = await oneInchApi.getApproveTxData({ tokenAddress, amount });

    return NextResponse.json(response);
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
