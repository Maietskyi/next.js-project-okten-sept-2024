import {FC} from "react";
import {Metadata} from "next";
import {getRecipeById} from "@/service/api.service";
import {IRecipes} from "@/models/IRecipes";
import RecipeDetailComponent from "@/components/recipes-components/recipe-detail-component/RecipeDetailComponent";

type Props = {
    params: { id: string },
    recipes: IRecipes
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const selectedRecipe = await getRecipeById(+params.id);

    return {
        title: selectedRecipe ? `Recipe: ${selectedRecipe.name}` : "Recipe Not Found",
        description: selectedRecipe
            ? `Learn how to cook ${selectedRecipe.name}, a delicious ${selectedRecipe.cuisine} recipe!`
            : "Recipe details not found."
    };
};

const RecipePage: FC<Props> = async ({params}) => {
    try {
        const selectedRecipe:IRecipes = await getRecipeById(+params.id);

        console.log('selectedRecipe', selectedRecipe)
        return (
            <div>
                {selectedRecipe ? (
                    <RecipeDetailComponent selectedRecipe={selectedRecipe} />
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error fetching recipe:", error);
        return <p>Failed to load the recipe. Please try again later.</p>;
    }
};

export default RecipePage;