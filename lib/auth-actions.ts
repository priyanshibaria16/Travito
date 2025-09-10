"use server";

export const login = async () => {
  // The actual sign-in is handled by NextAuth's built-in signIn function
  // This is just a placeholder that will be handled by the client-side
  return { redirect: "/api/auth/signin" };
};

export const logout = async () => {
  // The actual sign-out is handled by NextAuth's built-in signOut function
  // This is just a placeholder that will be handled by the client-side
  return { redirect: "/api/auth/signout" };
};