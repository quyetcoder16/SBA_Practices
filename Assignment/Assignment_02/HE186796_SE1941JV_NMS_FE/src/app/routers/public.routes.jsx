import LoginPage from "@/features/auth/pages/LoginPage"
import RegisterPage from "@/features/auth/pages/RegisterPage"
import { RejectedRoute } from "../guards/RouteGuard"

const publicRoutes = [
    {
        element: <RejectedRoute />,
        children: [
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            }
        ]
    },
]

export default publicRoutes