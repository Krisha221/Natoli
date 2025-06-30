import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// ============================================================================
// DATA STORE
// All content is stored here. To change text, numbers, or image paths,
// simply edit this object.
// ============================================================================
const appData = {
    // NOTE: For images to work, they must be placed in a public directory
    // accessible by the browser. The paths here are examples.
    hero: {
        title: "Precision Engineering Excellence",
        subtitle: "50+ years of innovation in tablet compression tooling and pharmaceutical manufacturing solutions.",
        ctaText: "Get Started Today",
        ctaLink: "#contact",
        backgroundImage: "./natoli_hero.jpg", // <-- CHANGE HERO IMAGE HERE
    },
    navLinks: [
        { href: "#home", label: "Home" },
        { href: "#services", label: "Services" },
        { href: "#products", label: "Products" },
        { href: "#about", label: "About" },
        { href: "#contact", label: "Contact" },
    ],
    services: {
        title: "Our Expertise",
        items: [
            { icon: '🔧', title: "Tablet Compression Tooling", description: "High-quality punches and dies crafted with precision for all shapes and sizes. Our half-century of experience ensures superior performance and durability." },
            { icon: '⚙️', title: "Tablet Presses", description: "U.S.-manufactured tablet presses designed for R&D and production needs. Built on decades of industry expertise and engineered for efficiency." },
            { icon: '🔩', title: "Replacement Parts", description: "Premium tablet press parts including die locks, cam tracks, turrets, pressure rollers, and feeder assemblies that exceed OEM standards." },
            { icon: '💊', title: "Capsule Filling", description: "The innovative NCF-45 Capsule Filling Machine. Our encapsulation parts meet and exceed OEM functionality and longevity." },
            { icon: '🎓', title: "Training Programs", description: "Comprehensive training focused on maximizing operator and equipment effectiveness to boost productivity and product quality." },
            { icon: '🔬', title: "Formulation & Lab Services", description: "Leading publications, research contributions, and lab services in tablet design, formulation, and process optimization." },
        ]
    },
    stats: {
        title: "Natoli by the Numbers",
        items: [
            { target: 50, label: "Years of Excellence", suffix: "" },
            { target: 7, label: "Global Locations", suffix: "" },
            { target: 15000, label: "Happy Clients", suffix: "+" },
            { target: 99.8, label: "Quality Rating", suffix: "%" },
        ]
    },
    products: {
        title: "Product Categories",
        categories: {
            tooling: {
                label: "Tooling",
                items: [
                    { title: "Standard & Custom Punches", description: "Engineered from the highest quality steel for optimal performance and longevity. Available in all standard and custom shapes." },
                    { title: "Precision Dies", description: "Crafted to exacting specifications, our dies ensure tablet uniformity and consistency, reducing wear and extending tool life." },
                    { title: "Multi-Tip Tooling", description: "Increase your production output without new machinery. Our multi-tip tooling is a cost-effective solution for higher yields." },
                ]
            },
            presses: {
                label: "Presses",
                items: [
                    { title: "NP-RD30 Rotary Press", description: "A robust, instrumentation-ready R&D press that simulates production-scale conditions, perfect for research and development." },
                    { title: "NP-401 Series", description: "A versatile production press known for its reliability and efficiency, supporting a wide range of tablet manufacturing needs." },
                    { title: "NP-500 Series", description: "Our high-performance production tablet press, designed for maximum output, control, and compliance with cGMP standards." },
                ]
            },
            parts: {
                label: "Parts",
                items: [
                    { title: "Turrets & Segments", description: "Precision-machined turrets and die table segments made from high-strength materials to enhance durability and performance." },
                    { title: "Feeder Assemblies", description: "Optimize your material flow with our high-efficiency feeder assemblies, designed to reduce waste and improve tablet consistency." },
                    { title: "Cams & Pressure Rolls", description: "Exceed OEM standards with our replacement cams and pressure rollers, built for smooth operation and extended service life." },
                ]
            },
            capsules: {
                label: "Capsule Filling",
                items: [
                    { title: "NCF-45 Capsule Filler", description: "The state-of-the-art capsule filling machine engineered for precision, speed, and reliability in your encapsulation process." },
                    { title: "Dosing Discs & Tamping Pins", description: "High-precision dosing components for accurate fills and consistent product weight, crucial for quality control." },
                    { title: "Encapsulation Change Parts", description: "A full range of high-quality change parts for our NCF-45 and other OEM machines, ensuring minimal downtime and peak performance." },
                ]
            }
        }
    },
    about: {
        title: "The Global Leader in Tablet Compression",
        heading: "50 Years of American-Made Excellence",
        paragraphs: [
            "Since 1973, Natoli Engineering has been the global leader in tablet compression technology. We are not just a manufacturer; we are your partner in success. Our commitment to quality, innovation, and customer service is unmatched in the industry.",
            "Headquartered in St. Charles, Missouri, USA, our state-of-the-art facilities produce the highest quality tooling, tablet presses, and replacement parts. We serve the pharmaceutical, nutraceutical, confectionery, industrial, and veterinary industries with pride and precision."
        ],
        ctaText: "Partner With Us",
        ctaLink: "#contact",
        imageUrl: "https://placehold.co/500x400/1a1a2e/00d4ff?text=Natoli+Innovation", // <-- CHANGE ABOUT IMAGE HERE
    },
    contact: {
        title: "Get in Touch",
        heading: "Start a Project",
        description: "Ready to enhance your production? Have a question about our products or services? Reach out to our team of experts today. We're here to provide the solutions you need.",
        locations: [
            { title: "📍 Global Headquarters", lines: ["28 Research Park Circle", "Saint Charles, MO 63304, USA"] },
            { title: "📞 Phone & Email", lines: ["Phone: +1 636-926-8900", "Email: info@natoli.com"] }
        ]
    },
    footer: {
        links: [
            { href: "#home", label: "Home" },
            { href: "#services", label: "Services" },
            { href: "#products", label: "Products" },
            { href: "#about", label: "About" },
            { href: "#contact", label: "Contact" },
            { href: "#", label: "Privacy Policy" },
        ],
        copyright: "© 2025 Natoli Engineering Company, Inc. All Rights Reserved."
    }
};

// ============================================================================
// REUSABLE COMPONENTS & HOOKS
// ============================================================================

/**
 * A component that adds a class when it becomes visible in the viewport.
 */
const AnimateOnScroll = ({ children, className = '', style = {}, delay = 0 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const combinedClassName = `animate-on-scroll ${className} ${isVisible ? 'animated' : ''}`.trim();
    const transitionDelay = isVisible && delay > 0 ? `${delay}s` : undefined;

    return <div ref={ref} className={combinedClassName} style={{ ...style, transitionDelay }}>{children}</div>;
};

/**
 * A custom hook to animate a number counting up when it becomes visible.
 */
const useCounter = (target, isVisible, suffix = '') => {
    const [count, setCount] = useState('0' + suffix);

    useEffect(() => {
        if (!isVisible) return;

        const isFloat = target % 1 !== 0;
        const duration = 2000;
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let currentValue = progress * target;

            if (isFloat) {
                setCount(currentValue.toFixed(1) + suffix);
            } else {
                 setCount(Math.floor(currentValue).toLocaleString() + suffix);
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                 setCount(isFloat ? target.toFixed(1) + suffix : target.toLocaleString() + suffix);
            }
        };

        requestAnimationFrame(step);

    }, [target, isVisible, suffix]);

    return count;
};


// ============================================================================
// SECTIONAL COMPONENTS
// ============================================================================

const Header = ({ navLinks }) => (
    <header>
        <nav>
            <div className="logo">NATOLI</div>
            <ul className="nav-links">
                {navLinks.map(link => (
                    <li key={link.href}><a href={link.href}>{link.label}</a></li>
                ))}
            </ul>
        </nav>
    </header>
);

const Hero = ({ data }) => {
    const heroStyle = {
        backgroundImage: `linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 50%, rgba(15, 52, 96, 0.9) 100%), url('${data.backgroundImage}')`,
    };

    return (
        <section id="home" className="hero" style={heroStyle}>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="hero-content">
                <h1>{data.title}</h1>
                <p>{data.subtitle}</p>
                <a href={data.ctaLink} className="cta-button">{data.ctaText}</a>
            </div>
        </section>
    );
};

const Services = ({ data }) => (
    <section id="services" className="services">
        <div className="container">
            <AnimateOnScroll>
                <h2 className="section-title">{data.title}</h2>
            </AnimateOnScroll>
            <div className="services-grid">
                {data.items.map((service, index) => (
                    <AnimateOnScroll key={index} className="service-card" delay={index * 0.1}>
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </AnimateOnScroll>
                ))}
            </div>
        </div>
    </section>
);

const StatItem = ({ item, delay }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const animatedCount = useCounter(item.target, isVisible, item.suffix);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef) };
    }, []);

    return (
        <div ref={ref}>
            <AnimateOnScroll className="stat-item" delay={delay}>
                <div className="stat-number">{animatedCount}</div>
                <div className="stat-label">{item.label}</div>
            </AnimateOnScroll>
        </div>
    );
};


const Stats = ({ data }) => (
    <section className="stats">
        <div className="container">
            <AnimateOnScroll>
                 <h2 className="section-title">{data.title}</h2>
            </AnimateOnScroll>
            <div className="stats-grid">
                {data.items.map((stat, index) => (
                    <StatItem key={index} item={stat} delay={index * 0.1} />
                ))}
            </div>
        </div>
    </section>
);

const Products = ({ data }) => {
    const categoryKeys = Object.keys(data.categories);
    const [activeTab, setActiveTab] = useState(categoryKeys[0]);

    return (
        <section id="products" className="products">
            <div className="container">
                 <AnimateOnScroll>
                    <h2 className="section-title">{data.title}</h2>
                 </AnimateOnScroll>
                <AnimateOnScroll className="product-tabs">
                    {categoryKeys.map(key => (
                        <button
                            key={key}
                            className={`tab-button ${activeTab === key ? 'active' : ''}`}
                            onClick={() => setActiveTab(key)}
                        >
                            {data.categories[key].label}
                        </button>
                    ))}
                </AnimateOnScroll>

                {categoryKeys.map(key => (
                    <div key={key} id={key} className={`product-content ${activeTab === key ? 'active' : ''}`}>
                        <div className="product-grid">
                            {data.categories[key].items.map((product, index) => (
                                <div key={index} className="product-card">
                                    <h3>{product.title}</h3>
                                    <p>{product.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const About = ({ data }) => (
    <section id="about" className="about">
        <div className="container">
             <AnimateOnScroll>
                <h2 className="section-title">{data.title}</h2>
             </AnimateOnScroll>
            <div className="about-grid">
                <AnimateOnScroll className="about-image">
                    <img src={data.imageUrl} alt="Natoli Innovation" />
                </AnimateOnScroll>
                <AnimateOnScroll className="about-content" delay={0.2}>
                    <h3>{data.heading}</h3>
                    {data.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    <a href={data.ctaLink} className="cta-button">{data.ctaText}</a>
                </AnimateOnScroll>
            </div>
        </div>
    </section>
);

const Contact = ({ data }) => (
    <section id="contact" className="contact">
        <div className="container">
            <AnimateOnScroll>
                 <h2 className="section-title">{data.title}</h2>
            </AnimateOnScroll>
            <div className="contact-grid">
                <AnimateOnScroll className="contact-info">
                    <h3>{data.heading}</h3>
                    <p>{data.description}</p>
                    {data.locations.map((loc, i) => (
                        <div key={i} className="location-card">
                            <h4>{loc.title}</h4>
                            {loc.lines.map((line, j) => <p key={j} style={{marginBottom: 0, opacity: 1}}>{line}</p>)}
                        </div>
                    ))}
                </AnimateOnScroll>
                <AnimateOnScroll className="contact-form" delay={0.2} >
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="name" placeholder="John Doe" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" placeholder="you@company.com" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows={5} placeholder="How can we help you today?" required></textarea>
                        </div>
                        <button type="submit" className="submit-btn">Send Inquiry</button>
                    </form>
                </AnimateOnScroll>
            </div>
        </div>
    </section>
);

const Footer = ({ data }) => (
    <footer>
        <div className="footer-content">
            <div className="footer-logo">NATOLI</div>
            <ul className="footer-links">
                 {data.links.map(link => (
                    <li key={link.label}><a href={link.href}>{link.label}</a></li>
                ))}
            </ul>
            <p className="footer-copyright">{data.copyright}</p>
        </div>
    </footer>
);

// ============================================================================
// ROOT APP COMPONENT
// ============================================================================

const App = () => {
    return (
        <React.Fragment>
            <Header navLinks={appData.navLinks} />
            <main>
                <Hero data={appData.hero} />
                <Services data={appData.services} />
                <Stats data={appData.stats} />
                <Products data={appData.products} />
                <About data={appData.about} />
                <Contact data={appData.contact} />
            </main>
            <Footer data={appData.footer} />
        </React.Fragment>
    );
};

// ============================================================================
// RENDER THE APP
// ============================================================================

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error('Failed to find the root element');
}
