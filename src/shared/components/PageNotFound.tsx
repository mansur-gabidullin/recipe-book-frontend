import {useLocation} from "wouter";

export function PageNotFound() {
    const [location] = useLocation();
    return <>`404, Sorry the page ${location} does not exist!`</>
}
