import React from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { FashionMode } from '../types';

interface NavbarProps {
  onOpenListModal: (initialMode?: 'rent' | 'resale' | 'donate') => void;
  onOpenBag: () => void;
  bagCount: number;
  onSelectMode: (mode: FashionMode) => void;
  activeMode: FashionMode;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenListModal,
  onOpenBag,
  bagCount,
  onSelectMode,
  activeMode,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E7E2D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#1F2620] hover:text-[#384639] transition-colors"
        >
          Rewear
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A554C]">
          <button 
            onClick={() => {
              onSelectMode('rent');
              scrollToSection('catalog');
            }}
            className={`transition-colors hover:text-[#1E2620] pb-0.5 ${
              activeMode === 'rent' ? 'text-[#1E2620] border-b-2 border-[#384639] font-semibold' : ''
            }`}
          >
            Rent
          </button>

          <button 
            onClick={() => {
              onSelectMode('resale');
              scrollToSection('catalog');
            }}
            className={`transition-colors hover:text-[#1E2620] pb-0.5 ${
              activeMode === 'resale' ? 'text-[#1E2620] border-b-2 border-[#384639] font-semibold' : ''
            }`}
          >
            Resale
          </button>

          <button 
            onClick={() => {
              onSelectMode('donate');
              scrollToSection('catalog');
            }}
            className={`transition-colors hover:text-[#1E2620] pb-0.5 ${
              activeMode === 'donate' ? 'text-[#1E2620] border-b-2 border-[#384639] font-semibold' : ''
            }`}
          >
            Donate
          </button>

          <button 
            onClick={() => scrollToSection('values')} 
            className="hover:text-[#1E2620] transition-colors"
          >
            How It Works
          </button>

          <button 
            onClick={() => scrollToSection('calculator')} 
            className="hover:text-[#1E2620] transition-colors"
          >
            Impact Calculator
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenListModal('resale')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold tracking-wide text-[#283329] bg-[#EAE5DC] hover:bg-[#E0DAD0] rounded-lg transition-colors border border-[#DDD6CB] whitespace-nowrap"
          >
            List Clothes
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </button>

          <button
            onClick={onOpenBag}
            aria-label="View Circular Wardrobe Bag"
            className="relative flex items-center justify-center p-2.5 rounded-lg text-[#253026] hover:bg-[#EFEBE3] transition-colors border border-transparent hover:border-[#E2DCCE]"
          >
            <ShoppingBag className="w-5 h-5" />
            {bagCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-[#3B4A3C] text-[#FAF8F5] text-[11px] font-bold rounded-full tabular-nums">
                {bagCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
