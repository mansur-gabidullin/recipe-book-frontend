import { Route, Routes } from "react-router-dom";

import { PageNotFound } from "@/7-shared/ui/PageNotFound";

import { RecipeList } from "./components/RecipeList";

export default function Recipes() {
    return (
        <Routes>
            <Route index element={<RecipeList />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    );
}
