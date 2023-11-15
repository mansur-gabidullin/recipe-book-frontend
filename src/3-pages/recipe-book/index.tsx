import { Route, Routes } from "react-router-dom";

import { PageNotFound } from "@/7-shared/ui/PageNotFound";

import { RecipeList } from "@/3-pages/recipe-book/ui/RecipeList";

export default function Recipes() {
    return (
        <Routes>
            <Route index element={<RecipeList />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    );
}
