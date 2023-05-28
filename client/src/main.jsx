import { BrowserRouter, } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID_GOOGLE_ENV}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </GoogleOAuthProvider>
)
