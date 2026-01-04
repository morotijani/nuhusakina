import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Heart, Camera, Gift, Phone, Menu, X } from 'lucide-react';
import heroBg from './assets/hero-bg.png';

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const sections = [
        { id: 'hero', name: 'Home' },
        { id: 'events', name: 'Events' },
        { id: 'gallery', name: 'Gallery' },
        { id: 'palette', name: 'Colors' },
        { id: 'rsvp', name: 'RSVP' },
    ];

    return (
        <div className="app">
            {/* Navigation */}
            <nav className={`glass fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
                <div className="container flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl serif font-bold tracking-widest text-[#2E7D32]"
                    >
                        N & S
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8">
                        {sections.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className="text-sm font-medium hover:text-[#2E7D32] transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden glass absolute top-full left-0 w-full py-4 flex flex-col items-center gap-4 border-t"
                    >
                        {sections.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className="text-lg font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="hero" className="h-screen relative flex items-center justify-center text-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBg})`, opacity: 0.8 }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/20 to-white/60" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-20 px-4"
                >
                    <p className="text-[#4A148C] font-medium tracking-[0.2em] mb-4 uppercase text-sm">Marriage Ceremony</p>
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 text-[#2E7D32]">Nuhu & Sakina</h1>
                    <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto italic">
                        "And We created you in pairs" — Surah An-Naba
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <div className="bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full border border-[#FCE4EC] shadow-sm">
                            <span className="serif text-xl font-medium">May 24th, 2026</span>
                        </div>
                        <a
                            href="#rsvp"
                            className="bg-[#2E7D32] text-white px-10 py-3 rounded-full hover:bg-[#1B5E20] transition-colors shadow-lg"
                        >
                            RSVP Now
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Events Section */}
            <section id="events" className="bg-[#FCE4EC]/30">
                <div className="container">
                    <div className="text-center mb-16">
                        <Heart className="mx-auto text-[#4A148C] mb-4" />
                        <h2 className="text-4xl font-bold text-[#2E7D32]">Event Details</h2>
                        <div className="w-24 h-1 bg-[#2E7D32] mx-auto mt-4 rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass p-8 rounded-3xl shadow-sm flex flex-col md:flex-row gap-8 items-center"
                        >
                            <div className="w-full md:w-1/3">
                                <img
                                    src="https://images.unsplash.com/photo-1519225495810-75178319a11b?q=80&w=800"
                                    className="rounded-2xl w-full h-48 object-cover"
                                    alt="Ceremony"
                                />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold mb-4 text-[#4A148C]">Engagement & Reception</h3>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-center md:justify-start gap-3 text-[#2E7D32]">
                                        <Calendar size={18} />
                                        <span>May 24, 2026</span>
                                    </div>
                                    <div className="flex items-center justify-center md:justify-start gap-3 text-[#2E7D32]">
                                        <Clock size={18} />
                                        <span>10:00 AM Sharp</span>
                                    </div>
                                    <div className="flex items-center justify-center md:justify-start gap-3 text-[#2E7D32]">
                                        <MapPin size={18} />
                                        <span>Mr. & Mrs. S. Al-Hassan's Residence, Airport Residential Area</span>
                                    </div>
                                </div>
                                <button className="mt-6 border border-[#2E7D32] text-[#2E7D32] px-6 py-2 rounded-full hover:bg-[#2E7D32] hover:text-white transition-all text-sm">
                                    View Directions
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery">
                <div className="container">
                    <div className="text-center mb-16">
                        <Camera className="mx-auto text-[#4A148C] mb-4" />
                        <h2 className="text-4xl font-bold text-[#2E7D32]">Our Moments</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-md"
                            >
                                <img
                                    src={`https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop&sig=${i}`}
                                    className="w-full h-full object-cover"
                                    alt={`Gallery ${i}`}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Color Palette Section */}
            <section id="palette" className="bg-[#4A148C] text-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Our Colors</h2>
                        <p className="max-w-xl mx-auto opacity-80">
                            We've chosen a palette that reflects our style. We invite you to coordinate your attire with these elegant shades.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12">
                        {[
                            { name: 'Emerald Green', hex: '#2E7D32', desc: 'Primary Theme' },
                            { name: 'Blushing Rose', hex: '#FCE4EC', desc: 'Elegant Accent' },
                            { name: 'Pure White', hex: '#FFFFFF', desc: 'Modern Base' },
                            { name: 'Royal Purple', hex: '#4A148C', desc: 'Sophisticated Touch' }
                        ].map((color) => (
                            <div key={color.name} className="flex flex-col items-center">
                                <div
                                    className="w-24 h-24 rounded-full border-4 border-white/20 mb-4 shadow-xl"
                                    style={{ backgroundColor: color.hex }}
                                />
                                <p className="font-bold">{color.name}</p>
                                <p className="text-sm opacity-60 uppercase tracking-tighter">{color.hex}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RSVP Section */}
            <section id="rsvp">
                <div className="container max-w-2xl text-center">
                    <div className="mb-12">
                        <Phone className="mx-auto text-[#4A148C] mb-4" />
                        <h2 className="text-4xl font-bold text-[#2E7D32]">Kindly RSVP</h2>
                        <p className="mt-4 text-gray-600">Please let us know if you can join our celebration by May 15th, 2026.</p>
                    </div>

                    <div className="glass p-8 rounded-3xl shadow-lg border border-[#FCE4EC]">
                        <div className="flex flex-col gap-6">
                            <div className="p-4 border-b border-[#FCE4EC] last:border-0">
                                <p className="text-sm text-gray-500 uppercase mb-1">Contact for RSVP</p>
                                <p className="text-xl font-bold text-[#4A148C]">Sister Fatima</p>
                                <a href="tel:+233240000000" className="text-[#2E7D32] hover:underline flex items-center justify-center gap-2 mt-1">
                                    <Phone size={14} /> +233 (0) 24 000 0000
                                </a>
                            </div>
                            <div className="p-4 border-b border-[#FCE4EC] last:border-0">
                                <p className="text-xl font-bold text-[#4A148C]">Brother Omar</p>
                                <a href="tel:+233260000000" className="text-[#2E7D32] hover:underline flex items-center justify-center gap-2 mt-1">
                                    <Phone size={14} /> +233 (0) 26 000 0000
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 bg-[#FCE4EC]/50 p-8 rounded-3xl">
                        <Gift className="mx-auto text-[#4A148C] mb-4" />
                        <h3 className="text-2xl font-bold text-[#2E7D32] mb-4">Gift Support</h3>
                        <p className="text-gray-600 mb-8 italic">
                            "Your presence is our greatest gift. However, if you wish to honor us with a gift, a contribution towards our new home would be deeply appreciated."
                        </p>
                        <div className="bg-white p-4 rounded-2xl shadow-sm inline-block px-12">
                            <p className="text-sm text-gray-500 mb-1">MoMo Details</p>
                            <p className="font-bold text-lg">Nuhu Al-Hassan</p>
                            <p className="text-2xl font-black text-[#2E7D32]">024 123 4567</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t text-center">
                <div className="container">
                    <p className="serif text-2xl font-bold text-[#2E7D32] mb-4">Nuhu & Sakina</p>
                    <p className="text-sm text-gray-500">
                        © 2026 Crafted with love for Nuhu & Sakina's special day.
                    </p>
                </div>
            </footer>

            {/* Floating Action Button */}
            <motion.a
                href="#rsvp"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-8 right-8 bg-[#4A148C] text-white p-4 rounded-full shadow-2xl z-40 md:hidden"
            >
                RSVP
            </motion.a>
        </div>
    );
};

export default App;
