"use server";

export async function verifyPassword(submittedPassword) {
  // Access the secure environment variable
  // Notice there is no NEXT_PUBLIC_ prefix
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword) {
    console.error("ADMIN_PASSWORD environment variable is missing.");
    return { success: false, message: "Server misconfiguration." };
  }

  if (submittedPassword === correctPassword) {
    return { success: true };
  }

  return { success: false, message: "Incorrect password" };
}
