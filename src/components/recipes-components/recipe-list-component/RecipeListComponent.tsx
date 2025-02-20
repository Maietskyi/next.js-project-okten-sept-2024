import Link from "next/link";
import "./RecipeListComponent.css";
import {IRecipes} from "@/models/IRecipes";

interface RecipeListProps {
    recipe: IRecipes;
    handleTagRecipe: (tag: string) => void;
}

export const RecipeListComponent = ({ recipe, handleTagRecipe }: RecipeListProps) => {
    return (
        <div className="recipe-list">
            <Link href={`/recipes/${recipe.id}`} className="recipe-title">
                {recipe.name}
            </Link>
            <div className="recipe-tags">
                {recipe.tags?.map((tag, index) => (
                    <span key={index} className="tag" onClick={() => handleTagRecipe(tag)}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};