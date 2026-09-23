import React, { useState } from 'react';
import { Droplets, Wind, Trash2, TreePine, Sparkles, Info } from 'lucide-react';

export const ImpactCalculator: React.FC = () => {
  const [garmentsPerYear, setGarmentsPerYear] = useState<number>(12);
  const [rentRatio, setRentRatio] = useState<number>(50); // percentage rented
  const [prelovedRatio, setPrelovedRatio] = useState<number>(35); // percentage bought resale
  // remainder is donated / extended

  // Calculation parameters based on Ellen MacArthur Foundation & WRAP average benchmarks
  // 1 new fast fashion garment averages: 2,700 liters water, 18 kg CO2e, 1.2 kg landfill potential
  const waterSavedLiters = Math.round(garmentsPerYear * 2450 * ((rentRatio + prelovedRatio) / 100));
  const co2ReducedKg = Math.round(garmentsPerYear * 17.2 * ((rentRatio + prelovedRatio) / 100));
  const wasteDivertedKg = (garmentsPerYear * 1.15 * ((rentRatio + prelovedRatio) / 100)).toFixed(1);

  // Equivalents
  const treesEquivalent = (co2ReducedKg / 21).toFixed(1);
  const showerDaysEquivalent = Math.round(waterSavedLiters / 65);

  return (
    <section id="calculator" className="py-16 md:py-24 bg-[#F5F2EC] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#556954] mb-2">
                Empirical Environmental Intelligence
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C251D] tracking-tight">
                Calculate Your Personal Circular Impact
              </h2>
              <p className="mt-2 text-sm text-[#4E5E50] leading-relaxed">
                By rotating your wardrobe through renting, verified resale, and cause donation, you divert resource-intensive raw manufacturing and eliminate virgin landfill dumping.
              </p>
            </div>

            {/* Slider 1: Garments rotated per year */}
            <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E3DDD1]">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="garments-slider" className="text-xs font-semibold uppercase tracking-wider text-[#354336]">
                  Annual Wardrobe Rotation
                </label>
                <span className="font-display text-2xl font-bold text-[#1F2920] tabular-nums">
                  {garmentsPerYear} <span className="text-xs font-normal text-[#607161]">pieces/year</span>
                </span>
              </div>
              
              <input
                id="garments-slider"
                type="range"
                min="4"
                max="36"
                step="2"
                value={garmentsPerYear}
                onChange={(e) => setGarmentsPerYear(Number(e.target.value))}
                className="w-full h-2 bg-[#E1DBD0] rounded-lg appearance-none cursor-pointer accent-[#364937]"
              />
              
              <div className="flex justify-between text-[11px] text-[#718272] mt-2">
                <span>Minimalist Capsule (4)</span>
                <span>Seasonal Rotation (16)</span>
                <span>Active Wardrobe (36)</span>
              </div>
            </div>

            {/* Habit Distribution Controls */}
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#384839]">
                Your Circular Habits
              </div>

              {/* Habit 1: Renting */}
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E5DFD4] flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-[#222E23]">Rented for Occasions & Seasons</div>
                  <div className="text-[11px] text-[#5F7060]">Gowns, vacation linen, structured coats</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={rentRatio}
                    onChange={(e) => setRentRatio(Number(e.target.value))}
                    className="w-24 sm:w-32 h-1.5 bg-[#E1DBD0] rounded-lg appearance-none cursor-pointer accent-[#364937]"
                  />
                  <span className="text-xs font-bold text-[#2A372B] w-9 text-right tabular-nums">
                    {rentRatio}%
                  </span>
                </div>
              </div>

              {/* Habit 2: Pre-Loved Resale */}
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E5DFD4] flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-[#222E23]">Purchased or Sold Pre-Loved</div>
                  <div className="text-[11px] text-[#5F7060]">Invested in vintage & verified second-hand</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={prelovedRatio}
                    onChange={(e) => setPrelovedRatio(Number(e.target.value))}
                    className="w-24 sm:w-32 h-1.5 bg-[#E1DBD0] rounded-lg appearance-none cursor-pointer accent-[#364937]"
                  />
                  <span className="text-xs font-bold text-[#2A372B] w-9 text-right tabular-nums">
                    {prelovedRatio}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-[#697969] leading-snug">
              <Info className="w-3.5 h-3.5 text-[#546A55] shrink-0 mt-0.5" />
              <span>
                Calculations referenced against verified lifecycle assessments of virgin vs. extended-life apparel from the WRAP Valuing Our Clothes framework.
              </span>
            </div>

          </div>

          {/* Right Column: Dynamic Impact Scoreboard */}
          <div className="lg:col-span-6 bg-[#2B382D] text-[#FAF8F5] rounded-3xl p-7 sm:p-10 shadow-xl border border-[#3E4F40] relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A624C]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-8">
              
              <div className="flex items-center justify-between pb-5 border-b border-[#3E4E40]">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#A2B6A3] font-medium">
                    Estimated Annual Conservation
                  </div>
                  <h3 className="font-display text-2xl font-semibold mt-1">
                    Your Circular Footprint
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#394B3B] flex items-center justify-center text-[#BED1BF]">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Three Big Quant Metrics */}
              <div className="space-y-6">
                
                {/* Metric 1: Water */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#38493A] flex items-center justify-center text-[#86CD8F] shrink-0">
                    <Droplets className="w-6 h-6 text-[#9EC5A0]" />
                  </div>
                  <div>
                    <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF8F5] tabular-nums">
                      {waterSavedLiters.toLocaleString()} <span className="text-sm font-normal text-[#C5D7C6]">Liters</span>
                    </div>
                    <div className="text-xs text-[#A8BAA9]">
                      Clean fresh water conserved from virgin cotton and pesticide runoff
                    </div>
                  </div>
                </div>

                {/* Metric 2: Carbon */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#38493A] flex items-center justify-center text-[#9EC5A0] shrink-0">
                    <Wind className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF8F5] tabular-nums">
                      {co2ReducedKg} <span className="text-sm font-normal text-[#C5D7C6]">kg CO₂e</span>
                    </div>
                    <div className="text-xs text-[#A8BAA9]">
                      Avoided synthetic petrochemical processing and factory freight
                    </div>
                  </div>
                </div>

                {/* Metric 3: Landfill */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#38493A] flex items-center justify-center text-[#9EC5A0] shrink-0">
                    <Trash2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF8F5] tabular-nums">
                      {wasteDivertedKg} <span className="text-sm font-normal text-[#C5D7C6]">Kilograms</span>
                    </div>
                    <div className="text-xs text-[#A8BAA9]">
                      Textiles kept circulating in premium condition rather than incineration
                    </div>
                  </div>
                </div>

              </div>

              {/* Equivalence Context Card */}
              <div className="pt-6 border-t border-[#3E4E40] bg-[#222E24]/60 rounded-xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#314333] flex items-center justify-center text-[#B1CBB3] shrink-0">
                  <TreePine className="w-4 h-4" />
                </div>
                <div className="text-xs leading-relaxed text-[#D2E0D3]">
                  Equivalent to the carbon absorption of <strong className="text-[#FAF8F5] tabular-nums">{treesEquivalent} mature pine trees</strong> for an entire year, or <strong className="text-[#FAF8F5] tabular-nums">{showerDaysEquivalent} days</strong> of standard residential showers.
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
