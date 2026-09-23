import React from 'react';
import { ArrowDown, Sparkles, Plus, Leaf, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onListClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onListClick }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#E7E2D8] bg-[#F7F4EE]">
      {/* Ambient Organic Texture Layer */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2C382D 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Top Quiet Editorial Kicker - Unboxed */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#576856]">
              <span className="flex items-center gap-1.5 text-[#3E4F3E]">
                <Leaf className="w-3.5 h-3.5 text-[#4E634E]" />
                Circular Wardrobe Ecosystem
              </span>
              <span aria-hidden="true" className="text-[#A2B09F]">·</span>
              <span className="text-[#6B7969]">Zero Virgin Waste</span>
            </div>

            {/* Compelling Headline required by prompt */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#1C251D] leading-[1.08] text-balance">
              Rewear. <br />
              <span className="italic font-normal text-[#384A3A]">Reimagine.</span> <br />
              Repeat.
            </h1>

            {/* Tagline about sustainable fashion required by prompt */}
            <p className="text-base sm:text-lg text-[#475449] max-w-xl leading-relaxed">
              Break free from the disposable fashion cycle. Access designer archives for every occasion, extend the journey of pre-loved pieces, and donate directly to vetted grassroots causes.
            </p>

            {/* CTA Buttons required by prompt */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wide text-[#FAF8F5] bg-[#2E3C2F] hover:bg-[#232F24] rounded-lg transition-all duration-200 shadow-sm hover:shadow"
              >
                <span>Explore Now</span>
                <ArrowDown className="w-4 h-4 text-[#D8E2D7]" />
              </button>

              <button
                onClick={onListClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wide text-[#263327] bg-[#E7E2D8] hover:bg-[#DCD6C9] rounded-lg transition-all duration-200 border border-[#D5CDC0]"
              >
                <Plus className="w-4 h-4 text-[#4A5D4B]" />
                <span>List Your Clothes</span>
              </button>
            </div>

            {/* Claim-to-Proof Quantitative Adjacency Bar */}
            <div className="pt-6 border-t border-[#E5DFD4] grid grid-cols-3 gap-4">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#232F24] tabular-nums">
                  142K+
                </div>
                <div className="text-xs text-[#5D6B5E] mt-0.5 font-medium">
                  Garments in Loop
                </div>
              </div>

              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#232F24] tabular-nums">
                  3.4M L
                </div>
                <div className="text-xs text-[#5D6B5E] mt-0.5 font-medium">
                  Water Preserved
                </div>
              </div>

              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#232F24] tabular-nums">
                  100%
                </div>
                <div className="text-xs text-[#5D6B5E] mt-0.5 font-medium">
                  Verified Circular
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Campaign Focal Point */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E3DDD1] bg-[#EDE9E0] aspect-[4/5] sm:aspect-[4/5] flex flex-col justify-end">
              
              {/* Sustainable Fashion Hero Image with Scrim */}
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
                alt="Sustainable circular wardrobe editorial styling in warm daylight"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.03]"
                onError={(e) => {
                  // Fallback styling if blocked
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* Gradient scrim for readable contrast overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2920]/80 via-[#1F2920]/25 to-transparent pointer-events-none" />

              {/* Editorial Caption Inside Image */}
              <div className="relative z-10 p-5 sm:p-6 text-[#FAF8F5]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D8E2D7] font-medium mb-1">
                  <span>Spring/Summer Circular Capsule</span>
                  <span aria-hidden="true">·</span>
                  <span>Pure Organic Linen</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-normal leading-snug">
                  "Fashion should leave an impression on culture, not on our earth."
                </h3>
                <div className="mt-3 flex items-center justify-between text-xs text-[#E6ECE5]">
                  <span className="font-medium">Curated by Rewear Collective</span>
                  <span className="tabular-nums">Edition 04 / 2026</span>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute top-4 right-4 z-10 bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E2DCD0] shadow-sm text-xs font-medium text-[#29352A] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4D654E]" />
                Eco Certified Clean
              </div>

            </div>

            {/* Decorative Offset Element */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#FAF8F5] border border-[#E0D9CD] rounded-xl p-3.5 shadow-md hidden sm:flex items-center gap-3 max-w-xs">
              <div className="w-9 h-9 rounded-lg bg-[#EBF0EA] flex items-center justify-center text-[#3D523E] shrink-0">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-[#1F2620]">Doorstep Donation Pickup</p>
                <p className="text-[#5F6E60]">Free bag labels for every registered member</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
