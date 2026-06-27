import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, Link } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import Lenis from 'lenis'
import "../features/interview/style/landing.scss"

const Layout = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    const handleHomeClick = (e) => {
        setMenuOpen(false)
        if (window.location.pathname === "/") {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const handleLogoClick = () => {
        setMenuOpen(false)
        if (window.location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            navigate('/')
        }
    }

    return (
        <div className="app-layout-wrapper">
            {/* Full-Screen Blur Backdrop */}
            {menuOpen && <div className="menu-backdrop-blur" onClick={() => setMenuOpen(false)} />}
            
            {/* Navigation Header */}
            <header className="landing-header">
                <div className="logo" onClick={handleLogoClick}>
                    PrepLAB
                </div>

                <div className="menu-pill-wrapper">
                    <div className={`menu ${menuOpen ? 'open' : ''}`} id="menu">
                        <div className="top" onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer' }}>
                            <span className="icon-indicator">▼</span>
                            <button id="toggle">
                                {menuOpen ? 'close' : 'menu'}
                            </button>
                        </div>
                        <div className="content">
                            <Link to="/" onClick={handleHomeClick}>home</Link>
                            <Link to="/generate" onClick={() => setMenuOpen(false)}>create</Link>
                            <a href="/#about" onClick={() => setMenuOpen(false)}>about</a>
                            {user ? (
                                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="logout-btn-menu">logout</button>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setMenuOpen(false)}>login</Link>
                                    <Link to="/register" onClick={() => setMenuOpen(false)}>register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="auth-links">
                    {user ? (
                        <>
                            <span className="username-display">Hello, {user.username || user.email}</span>
                            <button onClick={handleLogout} className="nav-link-btn logout-link">logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">login</Link>
                            <Link to="/register" className="nav-link">register</Link>
                        </>
                    )}
                </div>
            </header>

            {/* Main Page Content */}
            <Outlet />
        </div>
    )
}

export default Layout
