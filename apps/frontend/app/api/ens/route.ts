import { NextRequest, NextResponse } from "next/server";

import { EnsName } from "@/lib/common/types/ensName";
import { Wallet } from "@/lib/common/types/wallet";
import alchemyApi from "@/lib/server/api/alchemy";

export async function GET(req: NextRequest): Promise<NextResponse<string | null | { error: string }>> {
  const params = req.nextUrl.searchParams;

  const searchInput = params.get("searchInput");
  const searchType = params.get("searchType");

  if (!searchInput) {
    return NextResponse.json({ error: "searchInput is required" }, { status: 400 });
  }

  if (!searchType || !["lookup", "reverse"].includes(searchType)) {
    return NextResponse.json({ error: "type is required and must be either 'lookup' or 'reverse'" }, { status: 400 });
  }

  let response;

  try {
    if (searchType === "lookup") {
      response = await alchemyApi.getAddressFromEns(searchInput as EnsName);
    } else {
      response = await alchemyApi.getEnsFromAddress(searchInput as Wallet);
    }

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch ENS data" }, { status: 500 });
  }
}
