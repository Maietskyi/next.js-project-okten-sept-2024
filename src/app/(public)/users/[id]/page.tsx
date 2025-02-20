import {FC} from "react";
import {Metadata} from "next";
import {IUser} from "@/models/IUser";
import {IRecipes} from "@/models/IRecipes";
import {getAllRecipesUser, getUserById} from "@/service/api.service";
import UserDetailComponent from "@/components/users-components/user-detail-component/UserDetailComponent";

type Props = {
    params: { id: string }
    user: IUser;
    userRecipes: IRecipes[];
}

export const generateMetadata = ({params}: Props): Metadata => {
    return {
        title: `User page title ${params.id}`,
    };
}

const UserPage: FC<Props> = async ({params}) => {
    try {
        const selectedUser: IUser = await getUserById(+params.id);
        const userRecipes: IRecipes[] = await getAllRecipesUser(+params.id);

        return (
            <div>
                    <UserDetailComponent selectedUser={selectedUser} userRecipes={userRecipes}/>
            </div>
        );
    } catch (error) {
        console.error("Error fetching user or recipes:", error);
        return <p>Failed to load user and recipes. Please try again later.</p>;
    }
};

export default UserPage;