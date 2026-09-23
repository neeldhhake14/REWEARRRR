import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Droplets, Wind, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onClearBag: () => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearBag,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  // Subtotal calculation
  const subtotal = items.reduce((acc, cartItem) => {
    if (cartItem.mode === 'rent') {
      const base = cartItem.item.rentalPrice4Day || 40;
      const multiplier = cartItem.rentalDays === 14 ? 2.3 : cartItem.rentalDays === 8 ? 1.65 : 1;
      return acc + Math.round(base * multiplier);
    }
    if (cartItem.mode === 'resale') {
      return acc + cartItem.item.price;
    }
    return acc; // donate items are free
  }, 0);

  // Environmental tally
  const totalWaterSaved = items.reduce((acc, ci) => acc + ci.item.ecoSavings.waterSavedLiters, 0);
  const totalCo2Saved = items.reduce((acc, ci) => acc + ci.item.ecoSavings.co2AvoidedKg, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(id);
    setCheckoutStep('success');
  };

  const handleFinish = () => {
    onClearBag();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div 
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md bg-[#FBF9F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E2DBD0] animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E7E1D6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#354837]" />
            <h2 className="font-display text-xl font-semibold text-[#1F2720]">
              Circular Wardrobe Bag
            </h2>
            <span className="text-xs text-[#637364] tabular-nums">
              ({items.length} {items.length === 1 ? 'piece' : 'pieces'})
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close bag"
            className="p-1.5 rounded-lg text-[#556457] hover:bg-[#EFEAE0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content based on step */}
        {checkoutStep === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#EFEBE2] flex items-center justify-center mx-auto text-[#627263]">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <p className="font-display text-lg text-[#263127]">Your circular bag is empty</p>
                  <p className="text-xs text-[#5D6B5E] max-w-xs mx-auto">
                    Explore our curated rental archive, pre-loved resale pieces, or request community items.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-4 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#314132] rounded-lg hover:bg-[#253326]"
                  >
                    Start Exploring
                  </button>
                </div>
              ) : (
                <>
                  {/* Environmental Footprint Banner */}
                  <div className="bg-[#EBF0EA] border border-[#D5E0D4] rounded-xl p-3.5 flex items-center justify-between text-xs text-[#2A3B2C]">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Droplets className="w-4 h-4 text-[#4E6850]" />
                      <span>Saves <strong className="tabular-nums font-bold">{totalWaterSaved.toLocaleString()}L</strong> water &amp; <strong className="tabular-nums font-bold">{totalCo2Saved.toFixed(1)}kg</strong> CO₂</span>
                    </div>
                  </div>

                  {/* Itemized List */}
                  <div className="space-y-3">
                    {items.map((cartItem, idx) => {
                      const itemPrice =
                        cartItem.mode === 'rent'
                          ? Math.round(
                              (cartItem.item.rentalPrice4Day || 40) *
                                (cartItem.rentalDays === 14 ? 2.3 : cartItem.rentalDays === 8 ? 1.65 : 1)
                            )
                          : cartItem.mode === 'resale'
                          ? cartItem.item.price
                          : 0;

                      return (
                        <div
                          key={`${cartItem.item.id}-${idx}`}
                          className="bg-[#F5F2EC] border border-[#E4DFD6] rounded-xl p-3.5 flex items-start justify-between gap-3"
                        >
                          <img
                            src={cartItem.item.image}
                            alt={cartItem.item.title}
                            referrerPolicy="no-referrer"
                            className="w-14 h-16 object-cover rounded-lg bg-[#E2DBD0] shrink-0"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />

                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] text-[#637264] font-medium">
                              {cartItem.item.brand} · Size {cartItem.item.size}
                            </div>
                            <h4 className="text-xs font-semibold text-[#1E2620] truncate">
                              {cartItem.item.title}
                            </h4>
                            <div className="text-[11px] text-[#475748] mt-0.5">
                              {cartItem.mode === 'rent' && `${cartItem.rentalDays || 4}-Day Rental`}
                              {cartItem.mode === 'resale' && 'Pre-Loved Purchase'}
                              {cartItem.mode === 'donate' && 'Community Cause Claim ($0)'}
                            </div>
                            <div className="text-xs font-bold text-[#1C241D] mt-1 tabular-nums">
                              {itemPrice === 0 ? 'Free' : `$${itemPrice}`}
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(idx)}
                            aria-label="Remove item"
                            className="text-[#7F8F80] hover:text-[#B33939] p-1 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Footer / Subtotal */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#E7E1D6] bg-[#F8F5EE] space-y-3">
                <div className="space-y-1.5 text-xs text-[#526153]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#202921] tabular-nums">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Circular Carbon-Neutral Shipping</span>
                    <span className="font-medium text-[#466548]">Complimentary</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Eco Dry Cleaning &amp; Insurance</span>
                    <span className="font-medium text-[#466548]">Included</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5DFD4] flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-[#1C251D]">Total Amount</span>
                  <span className="font-display text-2xl font-bold text-[#1C251D] tabular-nums">
                    ${subtotal}
                  </span>
                </div>

                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-3 px-4 text-xs font-semibold rounded-lg bg-[#2E3C2F] hover:bg-[#222E23] text-[#FAF8F5] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Proceed to Eco-Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Step: Checkout Form */}
        {checkoutStep === 'checkout' && (
          <div className="flex-1 overflow-y-auto p-5">
            <h3 className="font-display text-xl font-semibold text-[#1F2720] mb-1">
              Delivery &amp; Fitting Address
            </h3>
            <p className="text-xs text-[#5A695B] mb-5">
              Reusable zero-waste mailers are provided for all deliveries and returns.
            </p>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#324133] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Eleanor Vance"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5CDC1] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#324133] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="eleanor@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5CDC1] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#324133] mb-1">Shipping &amp; Return Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Street address, Apartment, City, Zip"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5CDC1] rounded-lg"
                />
              </div>

              <div className="bg-[#EFEAE1] p-3 rounded-lg text-[11px] text-[#49594A] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#273428]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4D664F]" />
                  Rewear Circular Guarantee
                </div>
                <p>
                  Includes pre-paid prepaid return envelope. No plastic wrapping used.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="text-xs text-[#5D6D5E] hover:underline"
                >
                  Back to Bag
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#2E3C2F] hover:bg-[#202C21] rounded-lg"
                >
                  Complete Order (${subtotal})
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step: Success Confirmation */}
        {checkoutStep === 'success' && (
          <div className="flex-1 overflow-y-auto p-6 text-center flex flex-col justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E5ECE5] text-[#345337] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-[#536554]">
              Circular Order Confirmed
            </div>

            <h3 className="font-display text-2xl font-semibold text-[#1C251D]">
              Thank You, {customerName || 'Wardrobe Steward'}
            </h3>

            <p className="text-xs text-[#4F5E51] leading-relaxed max-w-xs mx-auto">
              Your garments are being steam-refreshed in our zero-emission atelier. Order Reference: <strong className="font-mono">{orderId}</strong>
            </p>

            <div className="bg-[#F3EFE7] p-4 rounded-xl text-left text-xs space-y-1.5 max-w-xs mx-auto border border-[#E0D9CD]">
              <div className="flex justify-between">
                <span className="text-[#657666]">Water Conserved:</span>
                <span className="font-bold text-[#232F24] tabular-nums">{totalWaterSaved.toLocaleString()} L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#657666]">CO₂e Avoided:</span>
                <span className="font-bold text-[#232F24] tabular-nums">{totalCo2Saved.toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#657666]">Return Window:</span>
                <span className="font-medium text-[#232F24]">Pre-paid satchel enclosed</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#2E3C2F] hover:bg-[#232F24] rounded-lg"
              >
                Back to Homepage
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
