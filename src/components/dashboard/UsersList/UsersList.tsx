import { UsersListItem } from "./UsersListItem";
import type { UsersListProps } from "../../../types/userProps";

export const UsersList = ({ users }: UsersListProps) => {
  return (
    <section className="users-list" aria-label="Users list">
      {users.map((user, index) => (
        <UsersListItem key={user.id} user={user} index={index} />
      ))}
    </section>
  );
};
