import React from 'react';
import { Star, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

export const CommunityProof: React.FC = () => {
  const testimonials = [
    {
      quote: "Before Rewear, I bought 15 fast-fashion dresses a year for events that just sat idle. Now I rent runway-grade tailoring for galas and rotate pre-loved linen for work. My closet is 70% smaller, yet my style has never felt more intentional.",
      name: "Camille Laurent",
      role: "Creative Director & Architecture Critic",
      city: "Paris / New York",
      impact: "Saved 48,000L water across 22 rentals",
    },
    {
      quote: "As a conscious designer, letting garments die in the back of wardrobes was heartbreaking. Rewear allows us to keep archival pieces cycling through real people with full peer insurance and zero solvent dry-cleaning.",
      name: "Mateo Lindqvist",
      role: "Founder, Studio Lindqvist Heritage",
      city: "Stockholm",
      impact: "110+ archive pieces in permanent circulation",
    },
    {
      quote: "The direct donation pipeline provided our job training graduates with top-tier professional attire. Women walk into high-stakes interviews with dignity, wearing tailored suits that would otherwise have been incinerated.",
      name: "Dr. Evelyn Vance",
      role: "Executive Director, The Working Wardrobe Network",
      city: "Chicago",
      impact: "3,200+ interview outfits received in 2025",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#596B58] mb-2">
            Community Evidence &amp; Accountability
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C251D] tracking-tight">
            Voices from the Circular Wardrobe Movement
          </h2>
          <p className="mt-2 text-sm text-[#4E5D50]">
            Every metric and story is substantiated by verified parcel tracking, life cycle assessments, and non-profit partner acknowledgments.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#F5F2EC] border border-[#E3DDD2] rounded-2xl p-7 flex flex-col justify-between"
            >
              <div>
                {/* 5 quiet stars */}
                <div className="flex items-center gap-1 text-[#4F6A51] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#4F6A51]" />
                  ))}
                </div>

                <p className="font-display text-base text-[#222E23] leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4DDD1]">
                <div className="font-semibold text-xs text-[#1E2620]">{t.name}</div>
                <div className="text-[11px] text-[#5A695B]">{t.role} · {t.city}</div>
                <div className="mt-2 text-[11px] font-medium text-[#465E47] bg-[#EAE5DC] px-2.5 py-1 rounded inline-block">
                  {t.impact}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Standards & Certifications Bar */}
        <div className="bg-[#EFECE4] border border-[#DCD6C9] rounded-2xl p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#586957] text-center mb-6">
            Rigorous Environmental Benchmarks &amp; Affiliations
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="font-display text-lg font-bold text-[#232F24]">GOTS Certified</div>
              <div className="text-xs text-[#5D6D5E]">Zero toxic chemical pesticides</div>
            </div>

            <div className="space-y-1">
              <div className="font-display text-lg font-bold text-[#232F24]">B-Corp Certified</div>
              <div className="text-xs text-[#5D6D5E]">Verified social &amp; environmental score</div>
            </div>

            <div className="space-y-1">
              <div className="font-display text-lg font-bold text-[#232F24]">1% For The Planet</div>
              <div className="text-xs text-[#5D6D5E]">1% of rental fees to reforestation</div>
            </div>

            <div className="space-y-1">
              <div className="font-display text-lg font-bold text-[#232F24]">Zero-Landfill Guarantee</div>
              <div className="text-xs text-[#5D6D5E]">100% garments re-worn or re-spun</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
