import { LoginPage } from '@/features/auth/pages/LoginPage';
import PublicHomePage from '@/features/public-site/pages/PublicHomePage';
import React from 'react'
import PublicLayout from '../layouts/PublicLayout';
import PublicCoursePage from '@/features/courses/pages/PublicCoursePage';
import courseService from '@/features/courses/services/course.service';
import PublicCourseDetail from '@/features/courses/pages/PublicCourseDetail';
import CartPage from '@/features/Cart/pages/CartPage';

const publicRoutes = [
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <LoginPage /> },
    {
        path: "/", element: <PublicLayout />,
        children: [
            { index: true, element: <PublicHomePage /> },
            {
                path: "/courses", element: <PublicCoursePage />,
                loader: courseService.findAll
            },
            {
                path: "/courses/:courseId", element: <PublicCourseDetail />,
                loader: ({ params }) => courseService.findById(params.courseId)
            },
            {
                path: "/cart", element: <CartPage />
            }
        ]

    },
];
export default publicRoutes;