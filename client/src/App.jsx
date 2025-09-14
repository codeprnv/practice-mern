import { SnackbarProvider } from 'notistack';
import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Loader from './components/common/Loader';
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

const App = () => {
   return (
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
         <Router>
            <div className='max-w-screen flex min-h-screen flex-col items-center justify-center overflow-x-hidden'>
               <Suspense fallback={<Loader />}>
                  <Routes>
                     <Route path='/' element={<Home />} />
                     <Route path='/login' element={<Login />} />
                     <Route path='/signup' element={<Signup />} />
                  </Routes>
               </Suspense>
            </div>
         </Router>
      </SnackbarProvider>
   );
};

export default App;
