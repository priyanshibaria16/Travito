import NextAuth from "next-auth/next";
import { authOptions } from "@/auth";

// Initialize NextAuth with the provided options
const handler = NextAuth(authOptions);

// Export the GET and POST handlers
export { handler as GET, handler as POST };