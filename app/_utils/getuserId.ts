"use server";

import { auth } from "@clerk/nextjs/server";

export const getUserId = async () => {
  const { userId } = await auth();
  return userId;
};

export const getUserNameById = async ({ userId }: { userId: string }) => {
  try {
    const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    const user = await response.json();
    return [user.first_name, user.image_url];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
