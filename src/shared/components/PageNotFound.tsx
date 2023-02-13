import {useLocation} from "react-router-dom";

export function PageNotFound() {
    const location = useLocation();
    return (
        <div>
            404, Sorry the page ${location.pathname} does not exist!
            <button type="button" onClick={() => window.history.back()}>вернуться назад</button>
        </div>
    )
}
