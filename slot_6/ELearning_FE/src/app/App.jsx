import { RouterProvider } from "react-router-dom";
import routes from "./routers/routes";

function App() {
  return (
    <RouterProvider router={routes}></RouterProvider>

    // <BrowserRouter>
    //   <AppRoutes />
    //   {/* <Routes>
    //     <Route path="/login" element={<LoginPage />}></Route>
    //     <Route path="/" index={true} element={<PublicHomePage />}></Route>
    //   </Routes> */}
    // </BrowserRouter>
  );
}

export default App;
