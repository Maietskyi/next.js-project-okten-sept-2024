import {IUser} from "@/models/IUser";
import {FC} from "react";
import {IRecipes} from "@/models/IRecipes";
import Link from "next/link";

type Props = {
    selectedUser: IUser;
    userRecipes: IRecipes[];
};

const UserDetailComponent: FC<Props> = async ({selectedUser, userRecipes}) => {
    console.log("selectedUser", selectedUser);

    return (
        <div className="details-container">
            <div className="details_result">
                <img src={selectedUser.image} alt={selectedUser.firstName} width="100"/>
                <h2>{selectedUser.firstName} {selectedUser.lastName}</h2>
                <p>Country: {selectedUser.eyeColor}</p>
                <p>Phone: {selectedUser.phone}</p>
                <p>Email: {selectedUser.email}</p>
                <p>Date of birth: {selectedUser.birthDate}</p>
                <p>University: {selectedUser.university}</p>
                <p>Status: {selectedUser.age}</p>
                <p>Role: {selectedUser.role}</p>
                <p>User IP: {selectedUser.ip}</p>
                <h3>User recipes:</h3>
                <div>
                {userRecipes && userRecipes.length > 0 ? (
                    <>
                        <ul>
                            {userRecipes.map((recipe) => (
                                <li key={recipe.id}>
                                    <a className="details-result-tags"
                                                href={`/recipes/${recipe.id}`}>{recipe.name}</a>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p></p>
                )}
                </div>
            </div>
            <Link href={"/users"} className="button-go-back">Go back to users</Link>
        </div>
);
};

export default UserDetailComponent;