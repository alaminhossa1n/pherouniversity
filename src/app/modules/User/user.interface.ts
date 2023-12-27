export type TUser = {
  username: string;
  email: string;
  password: string;
  lastThreePassword?: string[] | undefined;
  passwordChangedAt?: Date;
  role: "user" | "admin";
};
