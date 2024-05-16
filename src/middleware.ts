import {
  clerkMiddleware,
  createRouteMatcher,
  authMiddleware,
} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/(.*)"]);
const isPublicRoute = createRouteMatcher([
  // "/sign-in/(.*)",
  // "/sign-up/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/submit/(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req) && !isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
