import "@testing-library/jest-dom/vitest";
import "./mocks/window";

import { after, afterEach } from "node:test";

import { beforeAll } from "vitest";

import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
after(() => server.close());
