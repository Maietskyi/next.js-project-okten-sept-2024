import Link from "next/link";
import "./UserListComponent.css";
import {FC} from "react";
import {IUser} from "@/models/IUser";

interface UserCardProps {
    user: IUser;
}

export const UserListComponent: FC<UserCardProps> = ({ user }) => {
    return (
        <div className="user-card">
            <Link className="user-card-flex" href={`/users/${user.id}`}>
                <img src={user.image} alt={user.firstName} width="50"/>
                <h3>{user.firstName} {user.lastName}</h3>
                <p>Phone: {user.phone}</p>
                <p>Email: {user.email}</p>
            </Link>
        </div>
    );
};