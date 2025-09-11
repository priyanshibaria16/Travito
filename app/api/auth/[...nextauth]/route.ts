// Export the handlers for the API route
export { handlers as GET } from "@/auth";
export { handlers as POST } from "@/auth";

// This is a catch-all route for NextAuth.js
// All auth routes (/api/auth/*) will be handled by these handlers