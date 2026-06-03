import React, { useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { PageTransition } from './components/ui/PageTransition'
import { AppContext } from './context/AppContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Upload from './pages/Upload'
import PhotoTips from './pages/PhotoTips'
import Analyzing from './pages/Analyzing'
import Result from './pages/Result'
import History from './pages/History'
import Help from './pages/Help'
import Profile from './pages/Profile'
import AccessibilityPage from './pages/Accessibility'
import { EditAddressPage, EditInformationPage, EditPasswordPage } from './pages/ProfileEditPages'
import { ProfileAddressSuccessPage, ProfileInfoSuccessPage, ProfilePasswordSuccessPage } from './pages/ProfileSuccessPages'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Header from './components/Header'
import Footer from './components/Footer'

/**
 * Wrap every page element so Framer Motion can animate between routes.
 * AnimatePresence(mode="wait") ensures the old page exits before the new one enters.
 */
function wrap(element) {
  return <PageTransition>{element}</PageTransition>
}

export default function App() {
  const location = useLocation()
  const { accessibility } = useContext(AppContext)

  // Scroll to top automatically when navigating to a new page
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <MotionConfig reducedMotion={accessibility?.reduceMotion ? 'always' : 'user'}>
      <div className="flex min-h-screen flex-col bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300">
        <Header />
        <main className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={wrap(<Home />)} />
              <Route path="/login" element={wrap(<Login />)} />
              <Route path="/register" element={wrap(<Register />)} />
              <Route path="/forgot" element={wrap(<ForgotPassword />)} />
              <Route path="/upload" element={wrap(<Upload />)} />
              <Route path="/writing-tips" element={wrap(<PhotoTips />)} />
              <Route path="/analyzing" element={wrap(<Analyzing />)} />
              <Route path="/result" element={wrap(<Result />)} />
              <Route path="/history" element={wrap(<History />)} />
              <Route path="/help" element={wrap(<Help />)} />
              <Route path="/about" element={wrap(<About />)} />
              <Route path="/privacy" element={wrap(<Privacy />)} />
              <Route path="/terms" element={wrap(<Terms />)} />
              <Route path="/profile" element={wrap(<Profile />)} />
              <Route path="/profile/accessibility" element={wrap(<AccessibilityPage />)} />
              <Route path="/profile/edit-info" element={wrap(<EditInformationPage />)} />
              <Route path="/profile/edit-info/success" element={wrap(<ProfileInfoSuccessPage />)} />
              <Route path="/profile/edit-password" element={wrap(<EditPasswordPage />)} />
              <Route path="/profile/edit-password/success" element={wrap(<ProfilePasswordSuccessPage />)} />
              <Route path="/profile/edit-address" element={wrap(<EditAddressPage />)} />
              <Route path="/profile/edit-address/success" element={wrap(<ProfileAddressSuccessPage />)} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
