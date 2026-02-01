import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/inter";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@/styles/index.css"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
