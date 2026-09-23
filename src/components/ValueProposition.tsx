import React from 'react';
import { RefreshCw, Sparkles, HeartHandshake, Check, ArrowRight } from 'lucide-react';
import { FashionMode } from '../types';

interface ValuePropositionProps {
  onSelectPillar: (mode: FashionMode) => void;
  onOpenDonateModal: () => void;
}

export const ValueProposition: React.FC<ValuePropositionProps> = ({
  onSelectPillar,
  onOpenDonateModal,
}) => {
  return (
    <section id="values" className="py-16 md:py-24 bg-[#FBF9F5] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#5D6F5C] mb-2">
            The Three Circular Pillars
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C241D] tracking-tight text-balance">
            A complete ecosystem designed to keep beautiful garments out of landfills.
          </h2>
          <p className="mt-3 text-base text-[#4F5D51] leading-relaxed">
            Fast fashion created a linear catastrophe: make, wear once, discard. Rewear replaces this with a continuous, joyful loop that respects both craftsmanship and the planet.
          </p>
        </div>

        {/* Three-Column Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Column 1: Rent */}
          <div className="flex flex-col justify-between bg-[#F5F2EB] border border-[#E4DFD5] rounded-2xl p-7 lg:p-8 hover:border-[#D1C9BC] transition-all duration-200">
            <div>
              {/* Header with Icon and Editorial Index */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#E6E0D4] flex items-center justify-center text-[#2A372B]">
                  <RefreshCw className="w-5 h-5 text-[#374838]" />
                </div>
                <span className="font-display text-sm font-semibold tracking-wider text-[#7A8A78]">
                  01. RENT
                </span>
              </div>

              {/* Title & Tagline from prompt */}
              <h3 className="font-display text-2xl font-semibold text-[#1C251D] mb-2">
                Rent
              </h3>
              <p className="text-sm font-medium text-[#465647] mb-4">
                Unlimited styles without the guilt
              </p>

              {/* Descriptive Details */}
              <p className="text-sm text-[#556457] leading-relaxed mb-6">
                Wear runway-grade outerwear, evening silks, and seasonal capsules for 4, 8, or 30 days. Never repeat an outfit while never generating textile waste.
              </p>

              {/* Feature Points */}
              <ul className="space-y-2.5 mb-8 text-xs text-[#3E4C40]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4A624C] shrink-0 mt-0.5" />
                  <span>Free eco-friendly ozone dry cleaning included</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4A624C] shrink-0 mt-0.5" />
                  <span>Comprehensive minor wear & spill protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4A624C] shrink-0 mt-0.5" />
                  <span>Pre-paid return satchel with home courier pickup</span>
                </li>
              </ul>
            </div>

            {/* Pillar Action */}
            <button
              onClick={() => onSelectPillar('rent')}
              className="w-full inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-[#212C22] bg-[#FAF8F5] hover:bg-[#EAE4D9] rounded-lg transition-colors border border-[#DDD6CA]"
            >
              <span>Explore Wardrobe for Rent</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Column 2: Resale */}
          <div className="flex flex-col justify-between bg-[#F2EFE8] border border-[#DFDAD0] rounded-2xl p-7 lg:p-8 hover:border-[#CDC6B8] transition-all duration-200">
            <div>
              {/* Header with Icon and Editorial Index */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#E2DDCF] flex items-center justify-center text-[#2A372B]">
                  <Sparkles className="w-5 h-5 text-[#374838]" />
                </div>
                <span className="font-display text-sm font-semibold tracking-wider text-[#7A8A78]">
                  02. RESALE
                </span>
              </div>

              {/* Title & Tagline from prompt */}
              <h3 className="font-display text-2xl font-semibold text-[#1C251D] mb-2">
                Resale
              </h3>
              <p className="text-sm font-medium text-[#465647] mb-4">
                Give clothes a second life
              </p>

              {/* Descriptive Details */}
              <p className="text-sm text-[#556457] leading-relaxed mb-6">
                Invest in verified pre-loved pieces at up to 70% below original retail. Each item is authenticated for material purity, condition, and origin.
              </p>

              {/* Feature Points */}
              <ul className="space-y-2.5 mb-8 text-xs text-[#3E4C40]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4A624C] shrink-0 mt-0.5" />
                  <span>100% verified material purity & provenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4A624C] shrink-0 mt-0.5" />
                  <span>Fair 85% payout to consignors upon delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4A624C] shrink-0 mt-0.5" />
                  <span>Full return guarantee if item does not match description</span>
                </li>
              </ul>
            </div>

            {/* Pillar Action */}
            <button
              onClick={() => onSelectPillar('resale')}
              className="w-full inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-[#212C22] bg-[#FAF8F5] hover:bg-[#EAE4D9] rounded-lg transition-colors border border-[#DDD6CA]"
            >
              <span>Shop Curated Pre-Loved</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Column 3: Donate */}
          <div className="flex flex-col justify-between bg-[#EFECE4] border border-[#DCD6C9] rounded-2xl p-7 lg:p-8 hover:border-[#CAC2B3] transition-all duration-200">
            <div>
              {/* Header with Icon and Editorial Index */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#DDD7C9] flex items-center justify-center text-[#2A372B]">
                  <HeartHandshake className="w-5 h-5 text-[#374838]" />
                </div>
                <span className="font-display text-sm font-semibold tracking-wider text-[#7A8A78]">
                  03. DONATE
                </span>
              </div>

              {/* Title & Tagline from prompt */}
              <h3 className="font-display text-2xl font-semibold text-[#1C251D] mb-2">
                Donate
              </h3>
              <p className="text-sm font-medium text-[#465647] mb-4">
                Support causes you care about
              </p>

              {/* Descriptive Details */}
              <p className="text-sm text-[#556457] leading-relaxed mb-6">
                Turn dormant wardrobe assets into tangible community good. Send your unneeded garments directly to verified career dressing charities and textile fiber recyclers.
              </p>

              {/* Feature Points */}
              <ul className="space-y-2.5 mb-8 text-xs text-[#3E4C40]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4A624C] shrink-0 mt-0.5" />
                  <span>Free doorstep collection box mailed to your home</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4A624C] shrink-0 mt-0.5" />
                  <span>Zero landfill guarantee — 100% diverted or re-spun</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4A624C] shrink-0 mt-0.5" />
                  <span>Instant tax-deductible digital contribution receipt</span>
                </li>
              </ul>
            </div>

            {/* Pillar Action */}
            <button
              onClick={onOpenDonateModal}
              className="w-full inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-[#212C22] bg-[#FAF8F5] hover:bg-[#EAE4D9] rounded-lg transition-colors border border-[#DDD6CA]"
            >
              <span>Schedule Free Donation Pickup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
