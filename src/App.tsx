<<<<<<< HEAD

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home.tsx'
import { About } from './Pages/About.tsx'
import { Contact } from './Pages/Contact.tsx'
import { Team } from './Pages/Team.tsx'
import Services from './Pages/Services.tsx'
=======
/**
 * @file App.tsx
 * @description Main entry point for the application, handles routing and conditional layout rendering
 * @author Quadups Dev Team
 * @last_modified 2025
 */
>>>>>>> 9cacdf90670e7f01f4f98cb64c06463fa495978c

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './Pages/Home.tsx';
import { About } from './Pages/About.tsx';
import { Team } from './Pages/Team.tsx';
import Services from './Pages/Services.tsx';
import AppLayout from './components/Layout/AppLayout.tsx';
import StartProject from './Pages/StartProject.tsx';

/**
 * App component, serves as the root of the application
 * Responsible for defining the routing structure and managing layout conditionally
 * 
 * @component
 * @returns {JSX.Element} Rendered App component with routing logic
 */
function App() {
  return (
<<<<<<< HEAD
   <BrowserRouter>
   <Routes>
 
      <Route index element={<Home />} />
      <Route path='/aboutus' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/team' element={<Team />} />
      <Route path='/services' element={<Services />} />
   </Routes>
</BrowserRouter>
  )
=======
    <BrowserRouter>
      {/* Main routing structure for the application */}
      <Routes>
        {/* Wrapper for conditional layout rendering */}
        <Route element={<LayoutWrapper />}>
          {/* Define individual routes for different pages */}
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/team' element={<Team />} />
          <Route path='/services' element={<Services />} />
          <Route path='/startaproject' element={<StartProject />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

/**
 * LayoutWrapper component, responsible for conditionally rendering the AppLayout
 * or directly rendering specific components based on the current route
 * 
 * @component
 * @returns {JSX.Element} Either AppLayout or a specific page component based on pathname
 */
function LayoutWrapper() {
  const location = useLocation(); // Get the current location object, which contains the pathname

  /**
   * Conditionally render the layout
   * If the current pathname matches '/startaproject', do not render AppLayout
   * Otherwise, render AppLayout as the layout wrapper for the child components
   */
  if (location.pathname === '/startaproject') {
    return <StartProject />;
  }

  // Render the default layout for all other pages
  return <AppLayout />;
>>>>>>> 9cacdf90670e7f01f4f98cb64c06463fa495978c
}

export default App;
