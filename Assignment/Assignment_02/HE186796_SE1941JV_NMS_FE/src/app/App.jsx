
import '@/styles/App.css'
import routes from './routers/routes'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './provider/AuthProvider'

function App() {


  return (
    <>
      <AuthProvider>
        <RouterProvider router={routes}></RouterProvider>
      </AuthProvider>
    </>
  )
}

export default App
