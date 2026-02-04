import { createBrowserRouter } from "react-router-dom";
import privateRoutes from "./private.routes";
import publicRoutes from "./public.routes";


const routes = createBrowserRouter([...privateRoutes, ...publicRoutes]);

export default routes;