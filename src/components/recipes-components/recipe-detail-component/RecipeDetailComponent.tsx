import {FC} from "react";
import Link from "next/link";
import {IRecipes} from "@/models/IRecipes";
import "./RecipeDetailComponent.css"

type RecipeDetailProps = {
    selectedRecipe: IRecipes;
};

const RecipeDetailComponent: FC<RecipeDetailProps> = ({ selectedRecipe }) => {
    if (!selectedRecipe) return <p>No recipe details available.</p>;

    return (
        <div className="details-container">
            <div className="details_result">
                <h1>{selectedRecipe.name}</h1>
                <img src={selectedRecipe.image} alt={selectedRecipe.name}/>
                <div className="time-calories"><p><strong>Cooking time:</strong> {selectedRecipe.prepTimeMinutes} min.
                </p>
                    <p><strong>Calories per serving:</strong> {selectedRecipe.caloriesPerServing}</p></div>
                <p><strong>Ingredients:</strong></p>
                <ul>
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>

                <p><strong>Instruction:</strong></p>
                <ol>
                    {selectedRecipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
                <p><strong>Kitchen:</strong> {selectedRecipe.cuisine}</p>
                <p>This recipe was created by: <strong><Link className="details-result-tags"
                                                             href={`/users/${selectedRecipe.userId}`}>View
                    profile</Link></strong></p>
            </div>
            <Link href={"/recipes"} className="button-go-back">Go back to recipes</Link>
        </div>
    );
};

export default RecipeDetailComponent;