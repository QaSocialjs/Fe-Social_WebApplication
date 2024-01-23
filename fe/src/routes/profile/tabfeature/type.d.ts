import { User } from "@lib/models/User";

export type UserProps = {
  isCurrentUser: boolean;
  user: User;
};
