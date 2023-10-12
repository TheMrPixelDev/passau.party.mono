import "bun";

export const adminCredentials = {
  username: Bun.env.ADMIN_USERNAME ?? "admin",
  password: Bun.env.ADMIN_PASSWORD ?? "admin",
};
