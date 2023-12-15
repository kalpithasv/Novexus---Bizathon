import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Suspense, lazy } from 'react';
import Preloader from './components/shared/preloader';
import { AnonAadhaarProvider } from 'anon-aadhaar-react';
import Home from './pages/home-r';

const JustForDevHome = lazy(() => import('./pages/just-for-dev'));
const AuthPage = lazy(() => import('./pages/auth'));
const AppHome = lazy(() => import('./pages/home'));
const QRScannerPage = lazy(() => import('./pages/qr-scanner'));
const SendTokensPage = lazy(() => import('./pages/send-tokens'));
const ApproveTxnPage = lazy(() => import('./pages/approve-txn'));
const TxnStatusPage = lazy(() => import('./pages/txn-status'));
const MyAccountPage = lazy(() => import('./pages/my-account'));
const AadharKYCPage = lazy(() => import('./pages/aadhar-kyc'));
const PreferencesPage = lazy(() => import('./pages/preferences'));

function App() {
  const app_id = process.env.REACT_APP_ID || "";
  return (
    <>
      <AnonAadhaarProvider _appId={app_id}>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/home" element={<AppHome />} />
            <Route path="/mobi-scanner" element={<QRScannerPage />} />
            <Route path="/send/:tab?" element={<SendTokensPage />} />
            <Route path="/send/approve-txn" element={<ApproveTxnPage />} />
            <Route path="/send/resp" element={<TxnStatusPage />} />
            <Route path="/myaccount" element={<MyAccountPage />} />
            <Route path="/e-kyc" element={<AadharKYCPage />} />
            <Route path="/preferences" element={<PreferencesPage />} />
          </Routes>
        </Suspense>
      </AnonAadhaarProvider>
    </>
  );
}

export default App;
