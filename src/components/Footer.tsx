import React, { useState } from 'react';
import { ArrowRight, Check, Heart, Leaf } from 'lucide-react';
import { FashionMode } from '../types';

interface FooterProps {
  onSelectMode: (mode: FashionMode) => void;
  onOpenListModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectMode, onOpenListModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#242E25] text-[#FAF8F5] pt-16 pb-12 border-t border-[#374438]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#374739]">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-4 space-y-4">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="font-display text-3xl font-semibold tracking-tight text-[#FAF8F5] inline-block"
            >
              Rewear
            </a>
            <p className="text-xs text-[#A9BBAA] leading-relaxed max-w-sm">
              Rewear. Reimagine. Repeat. The circular fashion platform turning textile waste into community enrichment through designer renting, verified resale, and zero-landfill donations.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#BED2BF] pt-2">
              <Leaf className="w-3.5 h-3.5 text-[#86AF89]" />
              <span>Certified Sustainable Wardrobe Protocol</span>
            </div>
          </div>

          {/* Quick Links: Circular Pillars */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A1B3A2]">
              Pillars
            </h4>
            <ul className="space-y-2 text-xs text-[#D8E4D9]">
              <li>
                <button 
                  onClick={() => onSelectMode('rent')} 
                  className="hover:text-white transition-colors"
                >
                  Rent Archives
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectMode('resale')} 
                  className="hover:text-white transition-colors"
                >
                  Pre-Loved Resale
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectMode('donate')} 
                  className="hover:text-white transition-colors"
                >
                  Charity Donation
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenListModal} 
                  className="hover:text-white transition-colors"
                >
                  List a Garment
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links: Initiatives */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A1B3A2]">
              Initiatives
            </h4>
            <ul className="space-y-2 text-xs text-[#D8E4D9]">
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Impact Calculator
                </a>
              </li>
              <li>
                <a href="#values" className="hover:text-white transition-colors">
                  Circular Standards
                </a>
              </li>
              <li>
                <span className="text-[#889B89]">Ozone Dry Cleaning</span>
              </li>
              <li>
                <span className="text-[#889B89]">Donation Tracking</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Circular Dispatch */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A1B3A2]">
              The Circular Dispatch
            </h4>
            <p className="text-xs text-[#A9BBAA] leading-relaxed">
              Curated seasonal capsule guides, textile provenance reports, and first access to archival drops.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#324334] rounded-lg text-xs text-[#CFE4D1] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#82C386]" />
                <span>You are subscribed to The Circular Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#1A221B] border border-[#3A4B3C] rounded-lg text-[#FAF8F5] placeholder-[#738474] focus:outline-none focus:border-[#7A9E7D]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3.5 py-2 text-xs font-semibold bg-[#445846] hover:bg-[#526A54] text-[#FAF8F5] rounded-lg transition-colors shrink-0 flex items-center gap-1"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-[#7E9080]">
              No spam. Unsubscribe at any time with one click.
            </p>
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#829583] gap-4">
          <p>© 2026 Rewear Circular Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Material Transparency</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
