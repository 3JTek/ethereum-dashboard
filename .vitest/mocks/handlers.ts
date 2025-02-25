import { http, HttpResponse } from "msw";

const handlers = [
  http.get("https://api.coingecko.com/api/v3/simple/price", () => {
    return HttpResponse.json({ ethereum: { usd: 2000 } });
  }),
];

export default handlers;
