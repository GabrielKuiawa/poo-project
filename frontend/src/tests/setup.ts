import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";
import {
  installBrowserObserverMocks,
  resetBrowserObserverMocks,
} from "./mocks/browserObservers";

beforeEach(() => {
  resetBrowserObserverMocks();
  installBrowserObserverMocks();
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  resetBrowserObserverMocks();
});
