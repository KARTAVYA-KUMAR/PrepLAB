import React, { useState, useRef, useEffect } from 'react'
import "../style/landing.scss"
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import { useMouseTail } from '../../../hooks/useMouseTail'

const Home = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const handleMouseMove = useMouseTail()

    const outerTrackRef = useRef(null)
    const innerTrackRef = useRef(null)
    const positionRef = useRef(0)
    const speedRef = useRef(1.8)
    const targetSpeedRef = useRef(1.8)

    useEffect(() => {
        let animationFrameId;

        const animate = () => {
            // Interpolate speed smoothly to targetSpeed (0.05 rate gives a premium drift feel)
            speedRef.current = speedRef.current + (targetSpeedRef.current - speedRef.current) * 0.05;

            positionRef.current -= speedRef.current;

            if (outerTrackRef.current) {
                const halfWidth = outerTrackRef.current.scrollWidth / 2;
                if (positionRef.current <= -halfWidth) {
                    positionRef.current += halfWidth;
                }

                const transformStr = `translate3d(${positionRef.current}px, 0, 0)`;
                outerTrackRef.current.style.transform = transformStr;
                if (innerTrackRef.current) {
                    innerTrackRef.current.style.transform = transformStr;
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleMouseEnter = () => {
        targetSpeedRef.current = 0;
    }

    const handleMouseLeave = () => {
        targetSpeedRef.current = 3.0;
    }

    const handleCreateClick = () => {
        if (user) {
            navigate('/generate')
        } else {
            navigate('/login')
        }
    }

    return (
        <div className="landing-page-container">

            {/* Main Hero Section */}
            <main className="landing-hero">

                <div className="ticker-container">
                    {/* Outer Ticker - Dark text */}
                    <div className="ticker black">
                        <div className="track" ref={outerTrackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <span>interview • resume • preperation • roadmap • insights •</span>
                            <span>interview • resume • preperation • roadmap • insights •</span>
                            <span>interview • resume • preperation • roadmap • insights •</span>
                            <span>interview • resume • preperation • roadmap • insights •</span>
                        </div>
                    </div>

                    {/* Center Mask Box with Video Background */}
                    <div className="mask">
                        <video
                            src="/interviewvideo.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="mask-video"
                        />

                        {/* Inner Ticker - White text overlay */}
                        <div className="ticker">
                            <div className="track" ref={innerTrackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <span>interview • resume • preperation • roadmap • insights •</span>
                                <span>interview • resume • preperation • roadmap • insights •</span>
                                <span>interview • resume • preperation • roadmap • insights •</span>
                                <span>interview • resume • preperation • roadmap • insights •</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Left CTA */}
                <div className="bottom-left-cta">
                    <p className="cta-text">Create Your Custom Interview Plan</p>
                    <button className="create-pill-btn" onClick={handleCreateClick}>
                        create
                    </button>
                </div>
            </main>

            {/* About Section */}
            <section className="about-section" id="about" onMouseMove={handleMouseMove}>
                <div className="about-content">
                    <h2 className="about-title">about</h2>

                    <div className="about-grid">
                        <div className="vertical-line left-line"></div>

                        <div className="about-text-wrapper">
                            <p className="about-highlight">
                                PrepLab turns your resume and job description into a personalized interview plan
                            </p>

                            <div className="about-details">
                                <div className="about-details-left">
                                    <p>
                                        Using AI, it analyzes your profile, identifies skill gaps,
                                        generates role-specific technical and behavioral questions,
                                        and creates a structured preparation roadmap. Instead of
                                        practicing generic interviews.
                                    </p>
                                </div>

                                <div className="vertical-line mid-line"></div>

                                <div className="about-details-right">
                                    <p>
                                        PrepLab helps you focus on what matters most—so you can
                                        prepare smarter, build confidence, and maximize your chances
                                        of landing the role.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="vertical-line right-line"></div>
                    </div>

                    <hr className="about-divider" />
                </div>
            </section>

            {/* Footer Section */}
            <footer className="landing-footer" onMouseMove={handleMouseMove}>
                <div className="footer-brand">
                    PrepLAB
                </div>
                <div className="footer-links">
                    <Link to="/">-home</Link>
                    <Link to="/generate">-resume</Link>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">-github</a>
                </div>
            </footer>
        </div>
    )
}

export default Home