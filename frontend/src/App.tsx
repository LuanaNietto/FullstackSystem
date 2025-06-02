import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { GlobalStyle } from './styles/global';
import Background from './components/Background';

const GOOGLE_CLIENT_ID = 'SEU_CLIENT_ID_GOOGLE';

const App = () => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <AppRoutes />
      <GlobalStyle />
      <Background />
    </AuthProvider>
  </GoogleOAuthProvider>
);

export default App;