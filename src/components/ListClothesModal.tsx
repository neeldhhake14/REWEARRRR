import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, HeartHandshake, Sparkles, RefreshCw, Box, Tag } from 'lucide-react';
import { ListingFormData } from '../types';
import { DONATION_CAUSES } from '../data/mockClothes';

interface ListClothesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'rent' | 'resale' | 'donate';
}

export const ListClothesModal: React.FC<ListClothesModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'resale',
}) => {
  const [activeTab, setActiveTab] = useState<'rent' | 'resale' | 'donate'>(initialMode);
  const [formData, setFormData] = useState<ListingFormData>({
    type: initialMode,
    title: '',
    brand: '',
    category: 'Outerwear',
    size: 'M',
    condition: 'Excellent Pre-Loved',
    material: '',
    originalRetail: '',
    resalePrice: '',
    rentalPrice4Day: '',
    donationCause: DONATION_CAUSES[0].name,
    donorName: '',
    donorEmail: '',
    donorCity: '',
    pickupAddress: '',
    notes: '',
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trackingCode = `RW-${activeTab.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedId(trackingCode);
  };

  const handleReset = () => {
    setSubmittedId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        role="dialog"
        aria-modal="true"
        className="relative bg-[#FBF9F5] border border-[#E3DDD1] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-lg text-[#556356] hover:bg-[#EFEAE0] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedId ? (
          /* Confirmation State */
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#E8EFE8] text-[#345337] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div className="text-xs font-semibold uppercase tracking-wider text-[#586A59]">
              Consignment Confirmed
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C251D]">
              {activeTab === 'donate' ? 'Donation Pickup Scheduled!' : 'Your Garment is Under Review!'}
            </h3>

            <p className="text-sm text-[#4E5C4F] max-w-md mx-auto leading-relaxed">
              {activeTab === 'donate'
                ? `A pre-paid biodegradable donation mailer bag has been dispatched to your address. Reference ID: ${submittedId}`
                : `Our sustainability curation team will review your garment authentication details within 24 hours. Reference ID: ${submittedId}`}
            </p>

            <div className="bg-[#F3EFE7] p-4 rounded-xl max-w-sm mx-auto text-left text-xs space-y-1.5 border border-[#E2DBD0]">
              <div className="flex justify-between">
                <span className="text-[#647465]">Reference Number:</span>
                <span className="font-mono font-bold text-[#232F24]">{submittedId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#647465]">Type:</span>
                <span className="font-medium text-[#232F24] capitalize">{activeTab}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#647465]">Item:</span>
                <span className="font-medium text-[#232F24]">{formData.title || 'Curated Apparel'}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#2E3C2F] hover:bg-[#232F24] rounded-lg transition-colors"
              >
                Back to Circular Wardrobe
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <div className="flex-1 overflow-y-auto pr-1">
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#5C6E5B] mb-1">
                List into the Circular Loop
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1B231C]">
                Extend the Life of Your Garments
              </h2>
              <p className="text-xs text-[#526253] mt-1">
                Select whether you want to rent out, consign for resale, or schedule a free charity pickup.
              </p>
            </div>

            {/* Mode Segmented Switcher */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#EFEBE3] rounded-xl border border-[#DDD6CA] mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('rent')}
                className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'rent'
                    ? 'bg-white text-[#1E2720] shadow-sm'
                    : 'text-[#586859] hover:text-[#212B22]'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Rent Out</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('resale')}
                className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'resale'
                    ? 'bg-white text-[#1E2720] shadow-sm'
                    : 'text-[#586859] hover:text-[#212B22]'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Sell Pre-Loved</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('donate')}
                className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'donate'
                    ? 'bg-white text-[#1E2720] shadow-sm'
                    : 'text-[#586859] hover:text-[#212B22]'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Free Donation</span>
              </button>
            </div>

            {/* Interactive Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#324033] mb-1">
                    Garment / Piece Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Structured Wool Peacoat"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs text-[#1E2620] bg-[#FAF8F5] border border-[#D8D2C5] rounded-lg focus:outline-none focus:border-[#384A39]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#324033] mb-1">
                    Designer or Brand *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Totême, Loro Piana, Marais"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 text-xs text-[#1E2620] bg-[#FAF8F5] border border-[#D8D2C5] rounded-lg focus:outline-none focus:border-[#384A39]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#324033] mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs text-[#1E2620] bg-[#FAF8F5] border border-[#D8D2C5] rounded-lg focus:outline-none focus:border-[#384A39]"
                  >
                    <option>Outerwear</option>
                    <option>Dresses & Gowns</option>
                    <option>Tailoring & Blazers</option>
                    <option>Knitwear & Sweaters</option>
                    <option>Linen & Tops</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#324033] mb-1">
                    Size
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-3 py-2 text-xs text-[#1E2620] bg-[#FAF8F5] border border-[#D8D2C5] rounded-lg focus:outline-none focus:border-[#384A39]"
                  >
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>OS (One Size)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#324033] mb-1">
                    Condition
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full px-3 py-2 text-xs text-[#1E2620] bg-[#FAF8F5] border border-[#D8D2C5] rounded-lg focus:outline-none focus:border-[#384A39]"
                  >
                    <option>Pristine / NWT</option>
                    <option>Excellent Pre-Loved</option>
                    <option>Very Good</option>
                    <option>Curated Vintage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#324033] mb-1">
                  Primary Fabric & Composition
                </label>
                <input
                  type="text"
                  placeholder="e.g. 100% Belgian Flax Linen or Recycled Wool"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full px-3 py-2 text-xs text-[#1E2620] bg-[#FAF8F5] border border-[#D8D2C5] rounded-lg focus:outline-none focus:border-[#384A39]"
                />
              </div>

              {/* Mode-Specific Fields */}
              {activeTab === 'rent' && (
                <div className="bg-[#F3EFE7] p-4 rounded-xl border border-[#E1DBD0] space-y-3">
                  <div className="text-xs font-semibold text-[#28352A]">
                    Rental Pricing & Payout
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-[#556456] mb-1">Original Retail ($)</label>
                      <input
                        type="number"
                        placeholder="650"
                        value={formData.originalRetail}
                        onChange={(e) => setFormData({ ...formData, originalRetail: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#D3CCC0] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#556456] mb-1">Target 4-Day Rent Price ($)</label>
                      <input
                        type="number"
                        placeholder="45"
                        value={formData.rentalPrice4Day}
                        onChange={(e) => setFormData({ ...formData, rentalPrice4Day: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#D3CCC0] rounded-lg"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#617162]">
                    You receive 80% of every completed rental booking. Rewear manages dry cleaning and returns.
                  </p>
                </div>
              )}

              {activeTab === 'resale' && (
                <div className="bg-[#F3EFE7] p-4 rounded-xl border border-[#E1DBD0] space-y-3">
                  <div className="text-xs font-semibold text-[#28352A]">
                    Resale Valuation
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-[#556456] mb-1">Original Retail ($)</label>
                      <input
                        type="number"
                        placeholder="520"
                        value={formData.originalRetail}
                        onChange={(e) => setFormData({ ...formData, originalRetail: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#D3CCC0] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#556456] mb-1">Desired Sale Price ($)</label>
                      <input
                        type="number"
                        placeholder="220"
                        value={formData.resalePrice}
                        onChange={(e) => setFormData({ ...formData, resalePrice: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#D3CCC0] rounded-lg"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#617162]">
                    Consignors receive 85% net payout upon verified buyer acceptance.
                  </p>
                </div>
              )}

              {activeTab === 'donate' && (
                <div className="bg-[#F0EDE5] p-4 rounded-xl border border-[#DDD6CA] space-y-3">
                  <div className="text-xs font-semibold text-[#28352A]">
                    Designated Non-Profit Cause
                  </div>
                  <select
                    value={formData.donationCause}
                    onChange={(e) => setFormData({ ...formData, donationCause: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D3CCC0] rounded-lg"
                  >
                    {DONATION_CAUSES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} — {c.focus}
                      </option>
                    ))}
                  </select>
                  <div>
                    <label className="block text-[11px] text-[#556456] mb-1">
                      Doorstep Pickup Address *
                    </label>
                    <input
                      type="text"
                      required={activeTab === 'donate'}
                      placeholder="Street address, City, Postal Code"
                      value={formData.pickupAddress}
                      onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#D3CCC0] rounded-lg"
                    />
                  </div>
                  <p className="text-[11px] text-[#617162]">
                    We ship a pre-labeled durable cotton collection satchel right to your door with courier pickup scheduled.
                  </p>
                </div>
              )}

              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#324033] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.donorName}
                    onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                    className="w-full px-3 py-2 text-xs text-[#1E2620] bg-[#FAF8F5] border border-[#D8D2C5] rounded-lg focus:outline-none focus:border-[#384A39]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#324033] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.donorEmail}
                    onChange={(e) => setFormData({ ...formData, donorEmail: e.target.value })}
                    className="w-full px-3 py-2 text-xs text-[#1E2620] bg-[#FAF8F5] border border-[#D8D2C5] rounded-lg focus:outline-none focus:border-[#384A39]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-[#566557] hover:text-[#212C22]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#2C3B2E] hover:bg-[#202D21] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>
                    {activeTab === 'rent' && 'Submit for Rental Review'}
                    {activeTab === 'resale' && 'Submit Consignment'}
                    {activeTab === 'donate' && 'Schedule Free Pickup'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
