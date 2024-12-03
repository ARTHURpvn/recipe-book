import { clerkClient } from "@clerk/nextjs/server";

export const changeFavourite = async ({ recipeId }: { recipeId: number }) => {
  const clerkUserId = subscription_details?.metadata?.clerk_user_id;
  await clerkClient().user.updateUser(clerkUserId, {
    publicMetadata: {
      subscriptionPlan: "premium",
    },
  });
};
