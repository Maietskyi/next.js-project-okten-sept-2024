// "use client";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {IRecipes} from "@/models/IRecipes";
import {getAllRecipes, getRecipesByTagApi} from "@/service/api.service";
import "./RecipesComponent.css"
import {SearchComponent} from "@/components/search-component/SearchComponent";
import {RecipeListComponent} from "@/components/recipes-components/recipe-list-component/RecipeListComponent";
import {PaginationComponent} from "@/components/pagination-component/PaginationComponent";

const RecipesContainer = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [recipes, setRecipes] = useState<IRecipes[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const page = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("q") || "";
    const tag = searchParams.get("tag") || "";

    useEffect(() => {
        fetchRecipes(page, query, tag).catch((error) =>
            console.error("Помилка отримання рецептів:", error)
        );
    }, [page, query, tag]);

    const fetchRecipes = async (page: number, query: string, tag: string) => {
        if (loading) return;
        setLoading(true);
        try {
            let response;
            if (tag) {
                response = await getRecipesByTagApi(tag, page);
            } else {
                response = await getAllRecipes(page, query);
            }
            setRecipes(response.recipes);
            setTotal(response.total);
        } catch (error) {
            console.error("Помилка отримання рецептів:", error);
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(total / 30);

    const updateParams = (params: Record<string, string>) => {
        const newParams = new URLSearchParams(searchParams.toString());
        Object.entries(params).forEach(([key, value]) => {
            if (value) newParams.set(key, value);
            else newParams.delete(key);
        });

        router.push(`/recipes?${newParams.toString()}`);
    };

    const handlePageRecipe = (newPage: number) => {
        updateParams({page: newPage.toString()});
    };

    const handleSearchRecipe = (query: string) => {
        updateParams({page: "1", q: query, tag: ""});
    };

    const handleTagRecipe = (tag: string) => {
        updateParams({page: "1", tag, q: ""});
    };

    return (
        <div className="recipe-container">
            <h1>Recipe list</h1>
            <div className="search-bar">
                <SearchComponent searchType="recipes" onSearch={handleSearchRecipe} search={query}/>
            </div>

            <ul className="recipe-list">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <li key={recipe.id} className="recipe">
                            <RecipeListComponent recipe={recipe} handleTagRecipe={handleTagRecipe}/>
                        </li>
                    ))
                ) : (
                    <p>No recipes</p>
                )}
            </ul>
            <PaginationComponent totalPages={totalPages} currentPage={page} onPageChange={handlePageRecipe}/>
        </div>
    )
        ;
    }
;

export default RecipesContainer;