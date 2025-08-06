import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes/AppRoutes'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const location = useLocation();

  const hiddenLayoutPaths = ['/auth/login', '/auth/signup'];
  const shouldHideLayout = hiddenLayoutPaths.includes(location.pathname);

  return (
    <>
      <div className='relative min-h-screen flex flex-col items-center'>
        {!shouldHideLayout && <Header/>}
        <main className="flex-grow">
          <AppRoutes/>
        </main>
        {!shouldHideLayout && <Footer/>}
      </div>
    </>
  )
}

export default App
