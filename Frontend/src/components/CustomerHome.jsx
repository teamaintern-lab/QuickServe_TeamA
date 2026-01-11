import { useMemo, useState, useRef, useEffect } from "react";
import "../styles/CustomerHome.css";
import { getProviders } from "../services/api";

export default function CustomerHome({ onBook }) {
  const [query, setQuery] = useState("");

  const inputRef = useRef(null);

  // Dummy predefined services
  const dummyServices = [
    {
      id: "d1",
      serviceLabel: "Electrical Repair",
      providerName: "Certified Technician",
      serviceType: "electrical",
      description: "Switches, wiring, lighting installation & repair.",
      location: "Local",
      price: 299,
      rating: 4.8,
    },
    {
      id: "d2",
      serviceLabel: "Home Cleaning",
      providerName: "Cleaning Experts",
      serviceType: "cleaning",
      description: "Full home cleaning, sofa, bathroom & kitchen cleanup.",
      location: "Nearby",
      price: 499,
      rating: 4.7,
    },
    {
      id: "d3",
      serviceLabel: "AC Servicing",
      providerName: "CoolTech",
      serviceType: "ac-maintenance",
      description: "AC gas refill, cooling issues, annual services.",
      location: "Citywide",
      price: 699,
      rating: 4.9,
    }
  ];
const [services, setServices] = useState(dummyServices);
  // Load Providers from backend and convert them
  useEffect(() => {
  // Always show dummy services first
  

  getProviders()
    .then((res) => {
      if (!Array.isArray(res.data)) return;

      const providerServices = res.data.map((p) => ({
        id: p.id,
        serviceLabel: p.customService || p.category,
        providerName: p.fullName,
        serviceType: p.category || "general",
        description:
          p.customService ||
          `Expert ${p.category} provider with ${p.experience || 1} years experience.`,
        location: "Nearby",
        price: 499,
        rating: 4.5,
      }));

      setServices([...dummyServices, ...providerServices]);
    })
    .catch(() => {
      console.warn("Providers API failed, showing default services only");
    });
}, []);


  const filtered = useMemo(() => {
    if (!query.trim()) return services;

    const q = query.toLowerCase();

    return services.filter(
      (s) =>
        s.serviceLabel.toLowerCase().includes(q) ||
        s.providerName.toLowerCase().includes(q) ||
        s.serviceType.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [query, services]);

  const clearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="customer-home">
      <header className="customer-home-header">
        <h2>Available Services</h2>
        <p>Browse providers, check ratings and start a booking.</p>

        <div className="service-search">
          <div className="search-wrapper">
            <input
              ref={inputRef}
              type="search"
              value={query}
              placeholder="Search services, providers, locations..."
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            {query && (
              <button className="search-clear" onClick={clearQuery}>
                ✕
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="services-grid">
        {filtered.length === 0 ? (
          <div className="empty-state">No services match your search.</div>
        ) : (
          filtered.map((s) => (
            <div key={s.id} className="service-card">
              <div className="service-head">
                <div className="service-icon">🧰</div>
                <div className="service-meta">
                  <h3 className="service-label">{s.serviceLabel}</h3>
                  <p className="provider-name">
                    {s.providerName} • {s.location}
                  </p>
                </div>
              </div>

              <p className="service-desc">{s.description}</p>

              <div className="service-footer">
                <div className="price-rating">
                  <strong>₹{s.price}</strong>
                  <span className="rating">
                    ⭐ {s.rating.toFixed(1)}
                  </span>
                </div>

                <button
                  className="action-btn primary"
                  onClick={() => onBook(s.serviceType)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
