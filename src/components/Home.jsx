import '../styles/Home.css';

export default function Home({ onLogin }) {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">QuickServe</span>
          </div>
          <button onClick={onLogin} className="login-nav-btn">
            Login / Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Localized Service Discovery & Booking
          </h1>
          <p className="hero-subtitle">
            Connect with trusted service providers in your area. Book with confidence, 
            get services faster, and support local businesses.
          </p>
          <button onClick={onLogin} className="hero-cta-btn">
            Get Started
          </button>
        </div>
        <div className="hero-illustration">
          <div className="illustration-icon">🚀</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="features-title">Why Choose QuickServe?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-name">Local Services</h3>
            <p className="feature-desc">
              Discover verified service providers right in your neighborhood
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3 className="feature-name">Trusted Reviews</h3>
            <p className="feature-desc">
              Read genuine reviews from real customers to make informed decisions
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3 className="feature-name">Easy Booking</h3>
            <p className="feature-desc">
              Schedule services in minutes with our intuitive booking system
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3 className="feature-name">Direct Communication</h3>
            <p className="feature-desc">
              Chat directly with service providers for quick clarifications
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-name">Secure Payments</h3>
            <p className="feature-desc">
              Safe and secure payment gateway for worry-free transactions
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <h3 className="feature-name">Top Rated</h3>
            <p className="feature-desc">
              Access only the best-rated and verified service providers
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="how-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3 className="step-title">Sign Up</h3>
            <p className="step-desc">Create your account as a customer or service provider</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3 className="step-title">Discover</h3>
            <p className="step-desc">Browse local services in your area</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3 className="step-title">Book & Pay</h3>
            <p className="step-desc">Book and pay securely online</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3 className="step-title">Review</h3>
            <p className="step-desc">Share your experience with reviews</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-subtitle">
            Join thousands of satisfied customers and service providers
          </p>
          <button onClick={onLogin} className="cta-btn">
            Login / Register Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">QuickServe</h4>
            <p className="footer-desc">
              Your trusted local service discovery and booking platform
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#how">How It Works</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 QuickServe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
