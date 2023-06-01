import { Link } from "react-router-dom";
import { Grid, View } from "@adobe/react-spectrum";

export function RecipeList() {
    return (
        <Grid
            areas={["header  header", "sidebar content", "footer  footer"]}
            columns={["1fr", "3fr"]}
            rows={["size-1000", "auto", "size-1000"]}
            height="size-6000"
            gap="size-100"
        >
            <View backgroundColor="disabled" gridArea="header">
                <div>
                    recipe list <Link to="/admin-panel">Open Admin Panel</Link>
                </div>
            </View>
            <View backgroundColor="blue-600" gridArea="sidebar" />
            <View backgroundColor="purple-600" gridArea="content" />
            <View backgroundColor="magenta-600" gridArea="footer" />
        </Grid>
    );
}
