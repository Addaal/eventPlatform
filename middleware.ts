import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes:[
        '/',
        '/events/:id',
        '/api/webhook/clerk',
        '/api/webhook/stripe',
        '/api/uploadthing',
        "/api/webhook(.*)",
        "/api/webhook/clerk(.*)"
    ],
    // ignoredRoutes:[
    //     '/api/webhook/clerk',
    //     '/api/webhook/stripe',
    //     '/api/uploadthing'
    // ]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};