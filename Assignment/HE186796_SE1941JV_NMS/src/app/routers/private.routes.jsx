import DashboardPage from "@/features/dashboard/pages/DashboardPage"
import MainLayout from "../layouts/MainLayout"
import { ProtectedRoute } from "../guards/RouteGuard"
import UserPage from "@/features/Users/pages/UserPage"
import CategoryPage from "@/features/category/pages/CategoryPage"
import NewsPage from "@/features/news/pages/NewsPage"


const privateRoutes = [
    {
        element: <ProtectedRoute />,
        children: [{
            path: "/",
            element: <MainLayout />,
            children: [
                { index: true, element: <DashboardPage /> },
                {
                    path: "/users",
                    element: <UserPage />
                },
                {
                    path: "category",
                    element: <CategoryPage />
                },
                {
                    path: "/news",
                    element: <NewsPage />
                }
            ]
        }]
    }
]

export default privateRoutes