import {PropsWithChildren} from "react";

export function Layout(props: PropsWithChildren) {
    return (
        <div>
            Layout
            {props.children}
        </div>
    )
}
