import React, { useState, useEffect } from 'react';

// Custom CSS styles embedded
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;700&display=swap');

  :root {
    --coral: #E07B5B;
    --coral-dark: #C56A4D;
    --sage: #7A9E7E;
    --sage-light: #A8C5AB;
    --cream: #FDF8F3;
    --warm-white: #FFFCF9;
    --charcoal: #2D3436;
    --charcoal-light: #4A5568;
    --gold: #D4A574;
    --navy: #1E3A5F;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--charcoal);
    line-height: 1.7;
    overflow-x: hidden;
  }

  .app-container {
    min-height: 100vh;
    background: var(--cream);
  }

  .noise-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0.03;
    z-index: 1000;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 1.5rem 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: transparent;
  }

  .nav.scrolled {
    background: rgba(253, 248, 243, 0.95);
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    padding: 1rem 4rem;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: var(--charcoal);
  }

  .logo-symbol {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--coral) 0%, var(--gold) 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    transform: rotate(-3deg);
    transition: transform 0.3s ease;
  }

  .nav-logo:hover .logo-symbol {
    transform: rotate(0deg) scale(1.05);
  }

  .logo-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }

  .nav-link {
    text-decoration: none;
    color: var(--charcoal);
    font-size: 0.95rem;
    font-weight: 500;
    position: relative;
    padding: 0.25rem 0;
    transition: color 0.3s ease;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--coral);
    transition: width 0.3s ease;
  }

  .nav-link:hover::after,
  .nav-link.active::after {
    width: 100%;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--coral);
  }

  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .mobile-menu-btn span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--charcoal);
    margin: 6px 0;
    transition: all 0.3s ease;
  }

  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 6rem 4rem;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .hero-gradient {
    position: absolute;
    width: 800px;
    height: 800px;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.4;
    animation: float 20s ease-in-out infinite;
  }

  .hero-gradient-1 {
    top: -200px;
    right: -200px;
    background: linear-gradient(135deg, var(--coral) 0%, var(--gold) 100%);
  }

  .hero-gradient-2 {
    bottom: -300px;
    left: -200px;
    background: linear-gradient(135deg, var(--sage-light) 0%, var(--sage) 100%);
    animation-delay: -10s;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(50px, -30px) scale(1.05); }
    50% { transform: translate(20px, 40px) scale(0.95); }
    75% { transform: translate(-30px, 20px) scale(1.02); }
  }

  .hero-content {
    max-width: 900px;
    text-align: center;
    animation: fadeInUp 1s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-badge {
    display: inline-block;
    padding: 0.5rem 1.25rem;
    background: rgba(224, 123, 91, 0.12);
    border: 1px solid rgba(224, 123, 91, 0.3);
    border-radius: 100px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--coral-dark);
    margin-bottom: 2rem;
    animation: fadeInUp 1s ease-out 0.2s both;
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
    animation: fadeInUp 1s ease-out 0.3s both;
  }

  .hero-title .highlight {
    color: var(--coral);
    font-style: italic;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: var(--charcoal-light);
    max-width: 600px;
    margin: 0 auto 2.5rem;
    animation: fadeInUp 1s ease-out 0.4s both;
  }

  .hero-cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    animation: fadeInUp 1s ease-out 0.5s both;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border-radius: 100px;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    border: none;
  }

  .btn-primary {
    background: var(--coral);
    color: white;
    box-shadow: 0 4px 20px rgba(224, 123, 91, 0.3);
  }

  .btn-primary:hover {
    background: var(--coral-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(224, 123, 91, 0.4);
  }

  .btn-secondary {
    background: white;
    color: var(--charcoal);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .btn-secondary:hover {
    background: var(--charcoal);
    color: white;
    transform: translateY(-2px);
  }

  .section {
    padding: 8rem 4rem;
    position: relative;
  }

  .section-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 4rem;
  }

  .section-label {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--coral);
    margin-bottom: 1rem;
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .values-section {
    background: white;
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .value-card {
    padding: 2.5rem;
    background: var(--cream);
    border-radius: 24px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .value-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 0;
    background: var(--coral);
    transition: height 0.4s ease;
  }

  .value-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  }

  .value-card:hover::before {
    height: 100%;
  }

  .value-icon {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, var(--coral) 0%, var(--gold) 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .value-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .value-desc {
    color: var(--charcoal-light);
    font-size: 0.95rem;
  }

  .membership-section {
    background: linear-gradient(180deg, var(--cream) 0%, white 100%);
  }

  .membership-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .membership-card {
    background: white;
    border-radius: 24px;
    padding: 2.5rem;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.06);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .membership-card.featured {
    background: var(--charcoal);
    color: white;
    transform: scale(1.05);
    z-index: 1;
  }

  .membership-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.1);
  }

  .membership-card.featured:hover {
    transform: scale(1.05) translateY(-8px);
  }

  .membership-badge {
    position: absolute;
    top: -12px;
    right: 24px;
    background: var(--coral);
    color: white;
    padding: 0.35rem 1rem;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .membership-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .membership-price {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .membership-price span {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.7;
  }

  .membership-period {
    font-size: 0.9rem;
    opacity: 0.7;
    margin-bottom: 2rem;
  }

  .membership-features {
    list-style: none;
    margin-bottom: 2rem;
  }

  .membership-features li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }

  .membership-features li::before {
    content: '✓';
    color: var(--sage);
    font-weight: 700;
    flex-shrink: 0;
  }

  .membership-card.featured .membership-features li::before {
    color: var(--sage-light);
  }

  .membership-cta {
    width: 100%;
    justify-content: center;
  }

  .membership-card.featured .btn-primary {
    background: white;
    color: var(--charcoal);
  }

  .membership-card.featured .btn-primary:hover {
    background: var(--cream);
  }

  .about-section {
    background: white;
    position: relative;
  }

  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
  }

  .about-visual {
    position: relative;
  }

  .about-image-placeholder {
    aspect-ratio: 4/5;
    background: linear-gradient(135deg, var(--sage-light) 0%, var(--sage) 100%);
    border-radius: 24px;
    position: relative;
    overflow: hidden;
  }

  .about-image-placeholder::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🏢%3C/text%3E%3C/svg%3E") center/contain no-repeat;
    opacity: 0.3;
  }

  .about-floating-card {
    position: absolute;
    bottom: -30px;
    right: -30px;
    background: white;
    padding: 1.5rem 2rem;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .about-floating-icon {
    width: 48px;
    height: 48px;
    background: var(--coral);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .about-floating-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .about-floating-subtext {
    font-size: 0.85rem;
    color: var(--charcoal-light);
  }

  .about-text h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }

  .about-text p {
    color: var(--charcoal-light);
    margin-bottom: 1.5rem;
    font-size: 1.05rem;
  }

  .about-stats {
    display: flex;
    gap: 3rem;
    margin-top: 2.5rem;
  }

  .stat-item {
    text-align: left;
  }

  .stat-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--coral);
    line-height: 1;
  }

  .stat-label {
    font-size: 0.9rem;
    color: var(--charcoal-light);
    margin-top: 0.25rem;
  }

  .location-section {
    background: var(--charcoal);
    color: white;
    position: relative;
    overflow: hidden;
  }

  .location-section::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: linear-gradient(135deg, var(--coral) 0%, var(--gold) 100%);
    border-radius: 50%;
    opacity: 0.1;
  }

  .location-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .location-info h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .location-info p {
    opacity: 0.8;
    margin-bottom: 2rem;
    font-size: 1.05rem;
  }

  .location-details {
    list-style: none;
  }

  .location-details li {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .location-details li span {
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }

  .location-map {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    aspect-ratio: 16/12;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .map-placeholder {
    text-align: center;
    opacity: 0.5;
  }

  .map-placeholder span {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
  }

  .newsletter-section {
    background: linear-gradient(135deg, var(--coral) 0%, var(--gold) 100%);
    color: white;
    text-align: center;
  }

  .newsletter-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .newsletter-content h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .newsletter-content p {
    opacity: 0.9;
    margin-bottom: 2rem;
  }

  .newsletter-form {
    display: flex;
    gap: 1rem;
    max-width: 450px;
    margin: 0 auto;
  }

  .newsletter-input {
    flex: 1;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 100px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.9);
    color: var(--charcoal);
  }

  .newsletter-input::placeholder {
    color: var(--charcoal-light);
  }

  .newsletter-btn {
    background: var(--charcoal);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 100px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .newsletter-btn:hover {
    background: var(--navy);
    transform: translateY(-2px);
  }

  .footer {
    background: var(--charcoal);
    color: white;
    padding: 4rem 4rem 2rem;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .footer-brand {
    max-width: 300px;
  }

  .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .footer-logo .logo-symbol {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }

  .footer-logo .logo-text {
    font-size: 1.25rem;
    color: white;
  }

  .footer-brand p {
    opacity: 0.7;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .footer-links h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }

  .footer-links ul {
    list-style: none;
  }

  .footer-links li {
    margin-bottom: 0.75rem;
  }

  .footer-links a {
    color: white;
    opacity: 0.7;
    text-decoration: none;
    font-size: 0.9rem;
    transition: opacity 0.3s ease;
  }

  .footer-links a:hover {
    opacity: 1;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2rem;
    font-size: 0.85rem;
    opacity: 0.6;
  }

  .footer-social {
    display: flex;
    gap: 1rem;
  }

  .footer-social a {
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .footer-social a:hover {
    background: var(--coral);
    transform: translateY(-2px);
  }

  .page-content {
    padding-top: 100px;
    min-height: 100vh;
  }

  .page-hero {
    padding: 6rem 4rem 4rem;
    text-align: center;
    background: white;
  }

  .page-hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .page-hero p {
    color: var(--charcoal-light);
    max-width: 600px;
    margin: 0 auto;
    font-size: 1.1rem;
  }

  .team-section {
    background: var(--cream);
    padding: 6rem 4rem;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .team-card {
    text-align: center;
  }

  .team-avatar {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, var(--sage-light) 0%, var(--sage) 100%);
    border-radius: 50%;
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
  }

  .team-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .team-role {
    font-size: 0.9rem;
    color: var(--charcoal-light);
  }

  .contact-section {
    padding: 6rem 4rem;
    background: white;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .contact-info h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .contact-info p {
    color: var(--charcoal-light);
    margin-bottom: 2rem;
  }

  .contact-methods {
    list-style: none;
  }

  .contact-methods li {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
    font-size: 1rem;
  }

  .contact-methods li span {
    width: 44px;
    height: 44px;
    background: var(--cream);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
  }

  .contact-form {
    background: var(--cream);
    padding: 3rem;
    border-radius: 24px;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 1rem 1.25rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    font-size: 1rem;
    font-family: inherit;
    background: white;
    transition: all 0.3s ease;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--coral);
    box-shadow: 0 0 0 3px rgba(224, 123, 91, 0.1);
  }

  .form-group textarea {
    min-height: 150px;
    resize: vertical;
  }

  @media (max-width: 1024px) {
    .values-grid,
    .membership-grid {
      grid-template-columns: 1fr;
    }

    .membership-card.featured {
      transform: none;
    }

    .membership-card.featured:hover {
      transform: translateY(-8px);
    }

    .about-content,
    .location-content,
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .footer-content {
      grid-template-columns: 1fr 1fr;
    }

    .team-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .nav {
      padding: 1rem 1.5rem;
    }

    .nav-links {
      display: none;
    }

    .mobile-menu-btn {
      display: block;
    }

    .section {
      padding: 4rem 1.5rem;
    }

    .hero {
      padding: 6rem 1.5rem;
    }

    .about-floating-card {
      position: relative;
      bottom: auto;
      right: auto;
      margin-top: 1rem;
    }

    .newsletter-form {
      flex-direction: column;
    }

    .footer-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .footer-bottom {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    .team-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const Navigation = ({ currentPage, setCurrentPage, scrolled }) => (
  <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
    <a href="#" className="nav-logo" onClick={() => setCurrentPage('home')}>
      <div className="logo-symbol">888</div>
      <span className="logo-text">Causeway</span>
    </a>
    <ul className="nav-links">
      {['Home', 'About', 'Membership', 'Contact'].map((item) => (
        <li key={item}>
          <a
            href="#"
            className={`nav-link ${currentPage === item.toLowerCase() ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(item.toLowerCase());
            }}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
    <button className="mobile-menu-btn">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>
);

const HomePage = () => (
  <>
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-gradient hero-gradient-1"></div>
        <div className="hero-gradient hero-gradient-2"></div>
      </div>
      <div className="hero-content">
        <span className="hero-badge">Est. 2018 • Melbourne CBD</span>
        <h1 className="hero-title">
          Independent,<br />
          <span className="highlight">member-run</span><br />
          co-working
        </h1>
        <p className="hero-subtitle">
          A co-operative network supporting businesses and organisations 
          in Melbourne that embody a co-operative spirit.
        </p>
        <div className="hero-cta">
          <a href="#" className="btn btn-primary">Become a Member</a>
          <a href="#" className="btn btn-secondary">Learn More</a>
        </div>
      </div>
    </section>

    <section className="section values-section">
      <div className="section-header">
        <p className="section-label">What We Do</p>
        <h2 className="section-title">Supporting the social economy through community and connection</h2>
      </div>
      <div className="values-grid">
        <div className="value-card">
          <div className="value-icon">🏗️</div>
          <h3 className="value-title">Enabling Infrastructure</h3>
          <p className="value-desc">
            We provide affordable workspace and resources for small businesses 
            and organisations in the social economy.
          </p>
        </div>
        <div className="value-card">
          <div className="value-icon">🤝</div>
          <h3 className="value-title">Strong Community</h3>
          <p className="value-desc">
            Foster meaningful connections with like-minded co-operators 
            through events, workshops, and daily collaboration.
          </p>
        </div>
        <div className="value-card">
          <div className="value-icon">🌐</div>
          <h3 className="value-title">Valuable Networks</h3>
          <p className="value-desc">
            Access our extensive network of co-operatives, mutuals, and 
            social enterprises across Australia.
          </p>
        </div>
      </div>
    </section>

    <section className="section about-section">
      <div className="about-content">
        <div className="about-visual">
          <div className="about-image-placeholder"></div>
          <div className="about-floating-card">
            <div className="about-floating-icon">📍</div>
            <div>
              <div className="about-floating-text">Melbourne CBD</div>
              <div className="about-floating-subtext">Level 5, 306 Little Collins St</div>
            </div>
          </div>
        </div>
        <div className="about-text">
          <h2>A co-operative built by and for the social economy</h2>
          <p>
            Formed in 2018, 888 Co-operative Causeway is an affordable, member-run 
            co-working network for small businesses and organisations in the social economy.
          </p>
          <p>
            We are located in the Causeway Building in the heart of the Melbourne CBD. 
            Alongside co-working we organise a range of events and publish a podcast 
            focused on co-operative and broader social economy topics.
          </p>
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">2018</div>
              <div className="stat-label">Founded</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Member Organisations</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Events Hosted</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section location-section">
      <div className="location-content">
        <div className="location-info">
          <h2>Located in the heart of Melbourne</h2>
          <p>
            Our co-working space is situated in the iconic Causeway Building, 
            offering easy access to public transport, restaurants, and all 
            the amenities of the Melbourne CBD.
          </p>
          <ul className="location-details">
            <li><span>📍</span> Level 5, 306 Little Collins St, Melbourne</li>
            <li><span>🚇</span> Close to trains, trams, and buses</li>
            <li><span>☕</span> Near cafes, restaurants, and bars</li>
            <li><span>🏛️</span> Historic Causeway Building</li>
          </ul>
        </div>
        <div className="location-map">
          <div className="map-placeholder">
            <span>🗺️</span>
            <p>Melbourne CBD</p>
          </div>
        </div>
      </div>
    </section>
  </>
);

const AboutPage = () => (
  <div className="page-content">
    <div className="page-hero">
      <h1>About 888 Causeway</h1>
      <p>Supporting businesses and organisations in Melbourne that embody a co-operative spirit</p>
    </div>

    <section className="section about-section">
      <div className="about-content">
        <div className="about-visual">
          <div className="about-image-placeholder"></div>
        </div>
        <div className="about-text">
          <h2>Our Purpose</h2>
          <p>
            <em>To support businesses and organisations in Melbourne that embody a co-operative spirit.</em>
          </p>
          <p>
            We accomplish this by providing enabling infrastructure, fostering a strong 
            sense of community, and creating valuable networks for members.
          </p>
          <p>
            Formed in 2018, 888 Co-operative Causeway is an affordable, member-run 
            co-working network for small businesses and organisations in the social economy. 
            We are guided by the international co-operative values and principles.
          </p>
        </div>
      </div>
    </section>

    <section className="team-section">
      <div className="section-header">
        <p className="section-label">Governance</p>
        <h2 className="section-title">Board of Directors</h2>
      </div>
      <div className="team-grid">
        <div className="team-card">
          <div className="team-avatar">👤</div>
          <h3 className="team-name">Antony McMullen</h3>
          <p className="team-role">Chair • Co-operative Bonds</p>
        </div>
        <div className="team-card">
          <div className="team-avatar">👤</div>
          <h3 className="team-name">Sonja Schulze</h3>
          <p className="team-role">Director</p>
        </div>
        <div className="team-card">
          <div className="team-avatar">👤</div>
          <h3 className="team-name">Sarah Howe</h3>
          <p className="team-role">Director</p>
        </div>
        <div className="team-card">
          <div className="team-avatar">👤</div>
          <h3 className="team-name">Andrew Fleming</h3>
          <p className="team-role">Director</p>
        </div>
      </div>
    </section>

    <section className="section values-section">
      <div className="section-header">
        <p className="section-label">Our Patrons</p>
        <h2 className="section-title">Leadership & Support</h2>
      </div>
      <div className="values-grid">
        <div className="value-card">
          <h3 className="value-title">Basil Varghese</h3>
          <p className="value-desc">Patron of 888 Causeway Co-operative</p>
        </div>
        <div className="value-card">
          <h3 className="value-title">Margaret Feeney</h3>
          <p className="value-desc">Patron of 888 Causeway Co-operative</p>
        </div>
        <div className="value-card">
          <h3 className="value-title">Georgina de Beajeu</h3>
          <p className="value-desc">Patron of 888 Causeway Co-operative</p>
        </div>
      </div>
    </section>
  </div>
);

const MembershipPage = () => (
  <div className="page-content">
    <div className="page-hero">
      <h1>Membership</h1>
      <p>Join our community of like-minded co-operators and social enterprises</p>
    </div>

    <section className="section membership-section">
      <div className="membership-grid">
        <div className="membership-card">
          <h3 className="membership-name">Keep in Touch</h3>
          <div className="membership-price">Free</div>
          <div className="membership-period">Newsletter subscription</div>
          <ul className="membership-features">
            <li>Invitation to 888 events</li>
            <li>Keep up to date with co-operative community news</li>
            <li>New developments in the Victorian co-operative sector</li>
            <li>No access to co-working space</li>
          </ul>
          <a href="#" className="btn btn-secondary membership-cta">Join Mailing List</a>
        </div>

        <div className="membership-card featured">
          <span className="membership-badge">Popular</span>
          <h3 className="membership-name">888 Networker</h3>
          <div className="membership-price">$150 <span>AUD</span></div>
          <div className="membership-period">per 12 months</div>
          <ul className="membership-features">
            <li>Access to four 888 events per calendar year</li>
            <li>Access to four podcast episodes per calendar year</li>
            <li>Vote in co-op general meetings</li>
            <li>Concession rates available</li>
            <li>No access to co-working space</li>
          </ul>
          <a href="#" className="btn btn-primary membership-cta">Become a Networker</a>
        </div>

        <div className="membership-card">
          <h3 className="membership-name">888 Collaborator</h3>
          <div className="membership-price">$1,250 <span>AUD</span></div>
          <div className="membership-period">per 6 months</div>
          <ul className="membership-features">
            <li>Deskspace starting at $1,250 (fixed/office space available)</li>
            <li>Free tickets to all 888 events</li>
            <li>Access to Kelvin Club membership benefits</li>
            <li>Open access to co-working space in Melbourne CBD</li>
            <li>Vote in co-op general meetings</li>
          </ul>
          <a href="#" className="btn btn-primary membership-cta">Become a Collaborator</a>
        </div>
      </div>
    </section>

    <section className="section values-section">
      <div className="section-header">
        <p className="section-label">The Space</p>
        <h2 className="section-title">What's Included</h2>
      </div>
      <div className="values-grid">
        <div className="value-card">
          <div className="value-icon">📶</div>
          <h3 className="value-title">Fast WiFi</h3>
          <p className="value-desc">High-speed internet connection for all your work needs</p>
        </div>
        <div className="value-card">
          <div className="value-icon">📝</div>
          <h3 className="value-title">Whiteboard</h3>
          <p className="value-desc">Perfect for brainstorming and strategy sessions</p>
        </div>
        <div className="value-card">
          <div className="value-icon">☕</div>
          <h3 className="value-title">Kitchenette</h3>
          <p className="value-desc">Tea, coffee, and kitchen facilities available</p>
        </div>
      </div>
    </section>
  </div>
);

const ContactPage = () => (
  <div className="page-content">
    <div className="page-hero">
      <h1>Contact Us</h1>
      <p>Get in touch with the 888 Causeway team</p>
    </div>

    <section className="contact-section">
      <div className="contact-grid">
        <div className="contact-info">
          <h2>Let's connect</h2>
          <p>
            Whether you're interested in membership, hosting an event, or just 
            want to learn more about our co-operative community, we'd love to 
            hear from you.
          </p>
          <ul className="contact-methods">
            <li>
              <span>📧</span>
              <div>
                <strong>Email</strong><br />
                coopcauseway@gmail.com
              </div>
            </li>
            <li>
              <span>📍</span>
              <div>
                <strong>Address</strong><br />
                Level 5, 306 Little Collins St, Melbourne
              </div>
            </li>
            <li>
              <span>🏢</span>
              <div>
                <strong>Organisation</strong><br />
                888 Causeway Co-operative Limited
              </div>
            </li>
          </ul>
        </div>
        <div className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" placeholder="How can we help?" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="Tell us more..."></textarea>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Send Message
          </button>
        </div>
      </div>
    </section>
  </div>
);

const NewsletterSection = () => (
  <section className="section newsletter-section">
    <div className="newsletter-content">
      <h2>Join our newsletter</h2>
      <p>Stay updated with the latest news from the co-operative community</p>
      <div className="newsletter-form">
        <input type="email" className="newsletter-input" placeholder="Enter your email" />
        <button className="newsletter-btn">Subscribe</button>
      </div>
    </div>
  </section>
);

const Footer = ({ setCurrentPage }) => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-brand">
        <div className="footer-logo">
          <div className="logo-symbol">888</div>
          <span className="logo-text">Causeway</span>
        </div>
        <p>
          A co-operative network supporting businesses and organisations 
          in Melbourne that embody a co-operative spirit.
        </p>
      </div>
      <div className="footer-links">
        <h4>Navigate</h4>
        <ul>
          <li><a href="#" onClick={() => setCurrentPage('home')}>Home</a></li>
          <li><a href="#" onClick={() => setCurrentPage('about')}>About</a></li>
          <li><a href="#" onClick={() => setCurrentPage('membership')}>Membership</a></li>
          <li><a href="#" onClick={() => setCurrentPage('contact')}>Contact</a></li>
        </ul>
      </div>
      <div className="footer-links">
        <h4>Members</h4>
        <ul>
          <li><a href="#">Co-operative Bonds</a></li>
          <li><a href="#">BCCM</a></li>
          <li><a href="#">Cooperative Power</a></li>
          <li><a href="#">SILC</a></li>
        </ul>
      </div>
      <div className="footer-links">
        <h4>Resources</h4>
        <ul>
          <li><a href="#">Events</a></li>
          <li><a href="#">Podcast</a></li>
          <li><a href="#">Co-op Principles</a></li>
          <li><a href="#">RSS Feed</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2024 888 Causeway Co-operative Limited. All rights reserved.</p>
      <div className="footer-social">
        <a href="#">📧</a>
        <a href="#">📰</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'membership':
        return <MembershipPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-container">
        <div className="noise-overlay"></div>
        <Navigation 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          scrolled={scrolled} 
        />
        {renderPage()}
        <NewsletterSection />
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </>
  );
}
