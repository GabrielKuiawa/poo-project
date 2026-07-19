import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import App from "./App";
import { ImageDetailsPage } from "./features/images/components/ImageDetailsPage";

const rootRoute = createRootRoute({
  component: Outlet,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

export const imageDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/images/$imageId",
  component: ImageDetailsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, imageDetailsRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
