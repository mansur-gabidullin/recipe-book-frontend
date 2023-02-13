import {useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";

import {LOGIN_PAGE_ROUTE} from "../../shared/constants";
import {setAuthRedirectLocation, setAccessToken} from "../../shared/api";

export default function LogoutButton() {
    const location = useLocation()
    const [isLoggingOut, setIsLoggingOut] = useState(false)


    useEffect(() => {
        if (!isLoggingOut) {
            return
        }

        setAuthRedirectLocation(location.pathname)
        setAccessToken('')
    }, [isLoggingOut, location.pathname])

    return isLoggingOut
        ? (<Navigate to={LOGIN_PAGE_ROUTE}/>)
        : (<button type="button" onClick={() => setIsLoggingOut(true)}>Разлогиниться</button>)
}
