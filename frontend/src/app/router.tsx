import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AppLayout } from "@/app/layouts/AppLayout";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import {
  redirectAuthenticatedSession,
  requireAuthenticatedSession,
} from "@/features/auth/routeGuards";
import { ImageDetailsPage } from "@/features/images/pages/ImageDetailsPage";
import { ImageFeedPage } from "@/features/images/pages/ImageFeedPage";

const rootRoute = createRootRoute({
  component: Outlet,
});

const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "authenticated",
  beforeLoad: requireAuthenticatedSession,
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/",
  component: ImageFeedPage,
});

export const imageDetailsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/images/$imageId",
  component: ImageDetailsPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  beforeLoad: redirectAuthenticatedSession,
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  beforeLoad: redirectAuthenticatedSession,
  component: RegisterPage,
});

const routeTree = rootRoute.addChildren([
  authenticatedRoute.addChildren([indexRoute, imageDetailsRoute]),
  loginRoute,
  registerRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
