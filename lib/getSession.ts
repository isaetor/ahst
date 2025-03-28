import { cache } from "react";

import { auth } from "@/lib/auth";

export const getSession = cache(async () => {
  const session = await auth();
  return session;
});
