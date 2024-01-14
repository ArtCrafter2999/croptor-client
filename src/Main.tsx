import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import customRoutes from "./customRoutes";

const router = createBrowserRouter(customRoutes.map(route => {
    if (route.redirectTo) {
        return {
            path: route.path,
            element: <Navigate to={route.redirectTo}/>,
        };
    } else {
        return {
            path: route.path,
            element: route.component,
        };
    }
}));

function Main() {
    return <RouterProvider router={router}/>;
}

export default Main;
