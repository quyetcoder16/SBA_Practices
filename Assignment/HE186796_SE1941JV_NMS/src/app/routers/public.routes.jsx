import LoginPage from "@/features/auth/pages/LoginPage"
import { RejectedRoute } from "../guards/RouteGuard"


const publicRoutes = [
    {
        element: <RejectedRoute />,
        children: [
            {
                path: "/login",
                element: <LoginPage />
            }
        ]
    },
]

export default publicRoutes