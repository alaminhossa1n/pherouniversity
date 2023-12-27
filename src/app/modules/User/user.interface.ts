export type TUser = {
  username: string;
  email: string;
  password: string;
  lastTwoPassword?: string[] | undefined;
  passwordChangedAt?: Date;
  role: "user" | "admin";
};
