import React, { useState } from 'react';
import { X, Droplets, Wind, Trash2, Calendar, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { FashionItem } from '../types';

interface ProductDetailModalProps {
  item: FashionItem | null;
  onClose: () => void;
  onAddToBag: (item: FashionItem, mode: 'rent' | 'resale' | 'donate', rentalDays?: 4 | 8 | 14, date?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onAddToBag,
}) => {
  const [selectedRentalDays, setSelectedRentalDays] = useState<4 | 8 | 14>(4);
  const [rentalDate, setRentalDate] = useState<string>('2026-10-01');
  const [added, setAdded] = useState(false);

  if (!item) return null;

  const handleConfirm = () => {
    onAddToBag(item, item.mode, selectedRentalDays, rentalDate);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const calculatedRentalCost = item.rentalPrice4Day
    ? selectedRentalDays === 4
      ? item.rentalPrice4Day
      : selectedRentalDays === 8
      ? Math.round(item.rentalPrice4Day * 1.65)
      : Math.round(item.rentalPrice4Day * 2.3)
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        role="dialog"
        aria-modal="true"
        className="relative bg-[#FBF9F5] border border-[#E3DDD1] rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 rounded-lg text-[#556356] hover:bg-[#EFEAE0] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Image Column */}
            <div className="md:col-span-6 relative aspect-[3/4] bg-[#EDE9E0] rounded-xl overflow-hidden border border-[#E0D9CC]">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold text-[#29362A] border border-[#E3DCD0]">
                {item.mode === 'rent' && 'Rental Archive'}
                {item.mode === 'resale' && 'Verified Pre-Loved'}
                {item.mode === 'donate' && 'Non-Profit Partner'}
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-6 space-y-5">
              
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#5D6D5E] font-medium mb-1">
                  <span>{item.brand}</span>
                  <span aria-hidden="true">·</span>
                  <span>Size {item.size}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.condition}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C251D] leading-tight">
                  {item.title}
                </h2>
              </div>

              {/* Price Row */}
              <div className="bg-[#F3EFE7] p-4 rounded-xl border border-[#E2DBD0] flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#637464] font-semibold">
                    {item.mode === 'rent' && 'Rental Period Price'}
                    {item.mode === 'resale' && 'Pre-Loved Purchase Price'}
                    {item.mode === 'donate' && 'Community Allocation'}
                  </div>
                  <div className="font-display text-2xl font-bold text-[#1F2920] tabular-nums mt-0.5">
                    {item.mode === 'rent' && `$${calculatedRentalCost}`}
                    {item.mode === 'resale' && `$${item.price}`}
                    {item.mode === 'donate' && '$0 (Pledge Covered)'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-[#6E7E6F]">Original Retail</div>
                  <div className="text-xs line-through text-[#8A9A8B] tabular-nums">
                    ${item.originalRetail}
                  </div>
                </div>
              </div>

              {/* Garment Details & Provenance */}
              <div className="space-y-2 text-xs text-[#4F5D51] leading-relaxed">
                <p>{item.description}</p>
                <div className="p-3 bg-[#EFECE4] rounded-lg border border-[#DDD6C8] text-[11px] text-[#39493A]">
                  <strong className="font-semibold block text-[#243125] mb-0.5">Provenance & Care:</strong>
                  {item.provenance}
                </div>
              </div>

              {/* Eco Savings Pill-Free Metric Row */}
              <div className="border-t border-b border-[#E6E0D4] py-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="font-display text-base font-bold text-[#2A372B] tabular-nums">
                    {item.ecoSavings.waterSavedLiters.toLocaleString()}L
                  </div>
                  <div className="text-[10px] text-[#69796A]">Water Conserved</div>
                </div>
                <div>
                  <div className="font-display text-base font-bold text-[#2A372B] tabular-nums">
                    {item.ecoSavings.co2AvoidedKg}kg
                  </div>
                  <div className="text-[10px] text-[#69796A]">CO₂ Avoided</div>
                </div>
                <div>
                  <div className="font-display text-base font-bold text-[#2A372B] tabular-nums">
                    {item.ecoSavings.wasteDivertedKg}kg
                  </div>
                  <div className="text-[10px] text-[#69796A]">Landfill Diverted</div>
                </div>
              </div>

              {/* Mode-Specific Rental Selector */}
              {item.mode === 'rent' && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-[#29362A]">
                    Select Duration:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { days: 4, label: '4 Days' },
                      { days: 8, label: '8 Days' },
                      { days: 14, label: '14 Days' },
                    ].map((slot) => (
                      <button
                        key={slot.days}
                        type="button"
                        onClick={() => setSelectedRentalDays(slot.days as any)}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                          selectedRentalDays === slot.days
                            ? 'bg-[#314132] text-[#FAF8F5] border-[#314132]'
                            : 'bg-white text-[#4A5B4C] border-[#DCD5C8] hover:bg-[#F5F2EB]'
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>

                  <div className="pt-1">
                    <label className="block text-xs font-semibold text-[#29362A] mb-1">
                      Event / Delivery Date:
                    </label>
                    <input
                      type="date"
                      value={rentalDate}
                      onChange={(e) => setRentalDate(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#D5CDC0] rounded-lg text-[#202A21]"
                    />
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={handleConfirm}
                  className={`w-full py-3 px-4 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-[#3A503C] text-[#FAF8F5]'
                      : 'bg-[#29382B] hover:bg-[#1E2B20] text-[#FAF8F5] shadow-sm'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Circular Bag</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>
                        {item.mode === 'rent' && `Reserve Rental ($${calculatedRentalCost})`}
                        {item.mode === 'resale' && `Purchase Pre-Loved ($${item.price})`}
                        {item.mode === 'donate' && 'Claim Free via Community Cause'}
                      </span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
