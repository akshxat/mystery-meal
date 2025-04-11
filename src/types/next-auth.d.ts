import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the `id` property
      name?: string;
      email?: string;
      image?: string;
      isPremium: boolean; // Add the `isPremium` property
    };
  }

  interface User {
    id: string; // Add the `id` property
    isPremium: boolean; // Add the `isPremium` property
  }
}