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

      {/* Services Section */}
      <section className="services">
        <h2 className="services-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🔧</div>
            <h3 className="service-name">Plumbing</h3>
            <p className="service-desc">Pipe repairs, installations & maintenance</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🏠</div>
            <h3 className="service-name">Cleaning</h3>
            <p className="service-desc">Home & office cleaning services</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🔌</div>
            <h3 className="service-name">Electrical</h3>
            <p className="service-desc">Electrical repairs & installations</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💇</div>
            <h3 className="service-name">Salon</h3>
            <p className="service-desc">Hair cutting & beauty services</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🍕</div>
            <h3 className="service-name">Food Delivery</h3>
            <p className="service-desc">Quick & fresh food delivery</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🚗</div>
            <h3 className="service-name">Transportation</h3>
            <p className="service-desc">Ride & delivery services</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🎓</div>
            <h3 className="service-name">Tutoring</h3>
            <p className="service-desc">Educational & skill training</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💪</div>
            <h3 className="service-name">Fitness</h3>
            <p className="service-desc">Gym & personal training services</p>
          </div>
          <div className="service-card">
            <div className="service-icon">📦</div>
            <h3 className="service-name">Packers & Movers</h3>
            <p className="service-desc">Professional moving & packing services</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🎉</div>
            <h3 className="service-name">Event Organizers</h3>
            <p className="service-desc">Plan your perfect event</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🏋️</div>
            <h3 className="service-name">Gym</h3>
            <p className="service-desc">Fitness facilities & training</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🏢</div>
            <h3 className="service-name">Estate Agents</h3>
            <p className="service-desc">Property & real estate services</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🚘</div>
            <h3 className="service-name">Car Rental</h3>
            <p className="service-desc">Vehicle rental & travel services</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🍽️</div>
            <h3 className="service-name">Catering</h3>
            <p className="service-desc">Professional catering & meal prep</p>
          </div>
          <div className="service-card">
            <div className="service-icon">📷</div>
            <h3 className="service-name">Photography</h3>
            <p className="service-desc">Professional photo & video services</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💄</div>
            <h3 className="service-name">Beauty & Makeup</h3>
            <p className="service-desc">Professional makeup & beauty treatments</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🔨</div>
            <h3 className="service-name">Carpentry</h3>
            <p className="service-desc">Furniture & woodwork services</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🌳</div>
            <h3 className="service-name">Gardening</h3>
            <p className="service-desc">Landscaping & garden maintenance</p>
          </div>
        </div>
      </section>

      {/* For Service Providers Section */}
      <section className="for-providers">
        <h2 className="providers-title">Grow Your Business with QuickServe</h2>
        <p className="providers-subtitle">Join our platform and reach thousands of potential customers</p>
        <div className="providers-grid">
          <div className="provider-card">
            <div className="provider-icon">📈</div>
            <h3 className="provider-name">Increase Revenue</h3>
            <p className="provider-desc">
              Access a large customer base and increase your service bookings and revenue
            </p>
          </div>
          <div className="provider-card">
            <div className="provider-icon">⭐</div>
            <h3 className="provider-name">Build Reputation</h3>
            <p className="provider-desc">
              Grow your online presence and build credibility through verified reviews and ratings
            </p>
          </div>
          <div className="provider-card">
            <div className="provider-icon">📊</div>
            <h3 className="provider-name">Analytics Dashboard</h3>
            <p className="provider-desc">
              Track your performance and get insights to improve your service quality
            </p>
          </div>
          <div className="provider-card">
            <div className="provider-icon">🛡️</div>
            <h3 className="provider-name">Secure Payments</h3>
            <p className="provider-desc">
              Get paid securely and on time for every service completed
            </p>
          </div>
          <div className="provider-card">
            <div className="provider-icon">🎯</div>
            <h3 className="provider-name">Easy Management</h3>
            <p className="provider-desc">
              Manage bookings, schedules, and customer communication in one place
            </p>
          </div>
          <div className="provider-card">
            <div className="provider-icon">🌐</div>
            <h3 className="provider-name">Wide Reach</h3>
            <p className="provider-desc">
              Expand your business beyond your current network and locality
            </p>
          </div>
        </div>
        <button onClick={onLogin} className="provider-cta-btn">
          Register as Service Provider
        </button>
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

      {/* About Us Section */}
      <section className="about-us">
        <div className="about-container">
          <div className="about-content">
            <h2 className="about-title">About QuickServe</h2>
            <p className="about-text">
              QuickServe is a revolutionary platform designed to bridge the gap between customers and service providers. 
              Our mission is to make quality services accessible to everyone while providing opportunities for service 
              providers to grow their business.
            </p>
            <p className="about-text">
              We leverage modern technology to create a seamless experience - from discovering services to booking and payment. 
              With a focus on transparency, safety, and customer satisfaction, QuickServe has become a trusted name in local 
              service delivery.
            </p>
            <p className="about-text">
              Whether you're looking for a plumber, event organizer, or any other service, QuickServe connects you with verified, 
              top-rated professionals in your area. Join thousands of customers who trust QuickServe for their service needs.
            </p>
          </div>
            <div className="about-image">
              <div className="image-container">
                <div className="image-placeholder">👨‍🔧</div>
              </div>
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
