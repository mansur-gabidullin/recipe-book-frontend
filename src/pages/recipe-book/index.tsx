import { Route, Routes } from "react-router-dom";
import { RecipeList } from "./components/RecipeList";
import { PageNotFound } from "@/shared/components/PageNotFound";

export default function Recipes() {
    return (
        <Routes>
            <Route index element={<RecipeList />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    );
}
