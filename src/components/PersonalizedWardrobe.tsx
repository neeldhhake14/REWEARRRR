import React, { useState, useMemo } from 'react';
import { FashionItem, FashionMode, FashionCategory } from '../types';
import { Search, SlidersHorizontal, Eye, Plus, Check, Sparkles, Droplets, Wind } from 'lucide-react';

interface PersonalizedWardrobeProps {
  items: FashionItem[];
  activeMode: FashionMode;
  onSelectMode: (mode: FashionMode) => void;
  onQuickView: (item: FashionItem) => void;
  onAddToBag: (item: FashionItem, mode: 'rent' | 'resale' | 'donate') => void;
}

export const PersonalizedWardrobe: React.FC<PersonalizedWardrobeProps> = ({
  items,
  activeMode,
  onSelectMode,
  onQuickView,
  onAddToBag,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FashionCategory>('all');
  const [selectedVibe, setSelectedVibe] = useState<'all' | 'minimalist' | 'tailored' | 'relaxed' | 'vintage'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Mode filter
      if (activeMode !== 'all' && item.mode !== activeMode) return false;
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      // Style vibe filter
      if (selectedVibe !== 'all' && item.styleVibe !== selectedVibe) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesMaterial = item.material.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesMaterial) return false;
      }
      return true;
    });
  }, [items, activeMode, selectedCategory, selectedVibe, searchQuery]);

  const handleAction = (item: FashionItem) => {
    onAddToBag(item, item.mode);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  return (
    <section id="catalog" className="py-16 md:py-24 bg-[#FAF8F5] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#576956] mb-1.5">
              Curated Circular Archive
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1B231C] tracking-tight">
              Personalized Wardrobe Studio
            </h2>
            <p className="mt-2 text-sm text-[#4E5D50] max-w-xl">
              Filter by circular mode, architectural silhouette, or natural fiber composition. Every piece comes with verified provenance and lifecycle impact metrics.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#738374] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search designer, silk, linen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs text-[#222B23] bg-[#EFECE5] hover:bg-[#EAE6DE] focus:bg-white rounded-lg border border-[#D9D3C8] focus:border-[#3E4F3F] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Filter Controls Row 1: Circular Mode Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-4 pb-2 border-b border-[#E6E1D6]">
          <span className="text-xs font-semibold text-[#5A6A59] mr-2">Mode:</span>
          
          <button
            onClick={() => onSelectMode('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeMode === 'all'
                ? 'bg-[#2F3E30] text-[#FAF8F5]'
                : 'text-[#475748] hover:bg-[#EFEBE3]'
            }`}
          >
            All Pieces ({items.length})
          </button>

          <button
            onClick={() => onSelectMode('rent')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeMode === 'rent'
                ? 'bg-[#2F3E30] text-[#FAF8F5]'
                : 'text-[#475748] hover:bg-[#EFEBE3]'
            }`}
          >
            For Rent (4-Day)
          </button>

          <button
            onClick={() => onSelectMode('resale')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeMode === 'resale'
                ? 'bg-[#2F3E30] text-[#FAF8F5]'
                : 'text-[#475748] hover:bg-[#EFEBE3]'
            }`}
          >
            Pre-Loved Resale
          </button>

          <button
            onClick={() => onSelectMode('donate')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeMode === 'donate'
                ? 'bg-[#2F3E30] text-[#FAF8F5]'
                : 'text-[#475748] hover:bg-[#EFEBE3]'
            }`}
          >
            Community Donation ($0)
          </button>
        </div>

        {/* Filter Controls Row 2: Category & Style Vibe */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-[#637362] mr-1 hidden sm:inline">Category:</span>
            {[
              { id: 'all', label: 'All Silhouettes' },
              { id: 'outerwear', label: 'Outerwear' },
              { id: 'dresses', label: 'Dresses & Slips' },
              { id: 'tailoring', label: 'Tailoring' },
              { id: 'knitwear', label: 'Knitwear' },
              { id: 'linen', label: 'Flax & Linen' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as FashionCategory)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#E3DCD1] text-[#1E271F] font-semibold border border-[#D0C7B9]'
                    : 'text-[#506051] hover:bg-[#EFEBE3]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Style Vibe Persona */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#637362] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#506651]" />
              Vibe:
            </span>
            <select
              value={selectedVibe}
              onChange={(e) => setSelectedVibe(e.target.value as any)}
              className="text-xs font-medium text-[#29352A] bg-[#EFECE5] border border-[#DDD7CD] rounded-md px-2.5 py-1 focus:outline-none focus:border-[#3E4F3F]"
            >
              <option value="all">All Aesthetics</option>
              <option value="minimalist">Minimalist Earth</option>
              <option value="tailored">Tailored Structure</option>
              <option value="relaxed">Relaxed Drape</option>
              <option value="vintage">Vintage Archive</option>
            </select>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#F5F2EB] rounded-2xl border border-[#E5DFD4]">
            <p className="font-display text-xl text-[#2B352C] mb-2">No garments found in this curation</p>
            <p className="text-xs text-[#5C6B5E] max-w-sm mx-auto mb-5">
              Try adjusting your category or style vibe filter to discover other circular pieces.
            </p>
            <button
              onClick={() => {
                onSelectMode('all');
                setSelectedCategory('all');
                setSelectedVibe('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium text-[#FAF8F5] bg-[#324133] rounded-lg hover:bg-[#253226]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => {
              const isAdded = !!addedIds[item.id];

              return (
                <div
                  key={item.id}
                  className="group bg-[#F7F4EE] border border-[#E5DFD5] rounded-2xl overflow-hidden hover:border-[#D1C9BC] transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Top Image Showcase */}
                  <div className="relative aspect-[4/3] bg-[#EBE7DF] overflow-hidden">
                    
                    {/* Fallback Container always rendered underneath for Zero-Broken-Image compliance */}
                    <div 
                      className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                      style={{ backgroundColor: `${item.colorHex}22` }}
                    >
                      <div 
                        className="w-12 h-12 rounded-full mb-2 border border-[#C5BCAD]"
                        style={{ backgroundColor: item.colorHex }}
                      />
                      <span className="font-display text-base font-semibold text-[#29342A]">
                        {item.title}
                      </span>
                      <span className="text-xs text-[#5A6A5B] mt-1">{item.material}</span>
                    </div>

                    {/* Product Photo */}
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    {/* Mode Tag - Unboxed clean indicator in upper left */}
                    <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold text-[#29362A] border border-[#E3DCD0]">
                      {item.mode === 'rent' && 'For Rent · 4-Day'}
                      {item.mode === 'resale' && 'Pre-Loved Resale'}
                      {item.mode === 'donate' && 'Community Cause'}
                    </div>

                    {/* Quick View Button on Hover */}
                    <button
                      onClick={() => onQuickView(item)}
                      className="absolute bottom-3 right-3 bg-[#FAF8F5]/90 hover:bg-[#FAF8F5] text-[#243025] px-3 py-1.5 rounded-lg text-xs font-medium border border-[#DDD6C9] shadow-sm opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#4D634F]" />
                      Quick View
                    </button>
                  </div>

                  {/* Card Content & Zero-Pill Metadata */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet Unboxed Metadata Line with separators */}
                      <div className="flex items-center gap-1.5 text-xs text-[#5D6D5E] mb-1 font-medium">
                        <span>{item.brand}</span>
                        <span aria-hidden="true">·</span>
                        <span>Size {item.size}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.condition}</span>
                      </div>

                      {/* Product Title */}
                      <h3 className="font-display text-lg font-semibold text-[#1F2720] leading-snug line-clamp-1 mb-2">
                        {item.title}
                      </h3>

                      {/* Material provenance snippet */}
                      <p className="text-xs text-[#4F5E51] line-clamp-2 leading-relaxed mb-4">
                        {item.material}
                      </p>

                      {/* Eco Savings Line */}
                      <div className="flex items-center gap-3 text-xs text-[#4E614F] pb-3 mb-4 border-b border-[#EAE4D9]">
                        <span className="flex items-center gap-1">
                          <Droplets className="w-3.5 h-3.5 text-[#5F7861]" />
                          <span className="tabular-nums font-semibold">{item.ecoSavings.waterSavedLiters.toLocaleString()}L</span> water saved
                        </span>
                        <span aria-hidden="true" className="text-[#C5D0C3]">·</span>
                        <span className="flex items-center gap-1">
                          <Wind className="w-3.5 h-3.5 text-[#5F7861]" />
                          <span className="tabular-nums font-semibold">{item.ecoSavings.co2AvoidedKg}kg</span> CO₂ avoided
                        </span>
                      </div>
                    </div>

                    {/* Price and Action Row */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        {item.mode === 'rent' && (
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-display text-xl font-bold text-[#1C251D] tabular-nums">
                                ${item.rentalPrice4Day}
                              </span>
                              <span className="text-xs text-[#5F6E60]">/ 4 days</span>
                            </div>
                            <div className="text-[11px] text-[#788879]">
                              Retail: <span className="line-through tabular-nums">${item.originalRetail}</span>
                            </div>
                          </div>
                        )}

                        {item.mode === 'resale' && (
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-display text-xl font-bold text-[#1C251D] tabular-nums">
                                ${item.price}
                              </span>
                              <span className="text-xs text-[#4F6A51] font-semibold">
                                {Math.round((1 - item.price / item.originalRetail) * 100)}% off
                              </span>
                            </div>
                            <div className="text-[11px] text-[#788879]">
                              Retail: <span className="line-through tabular-nums">${item.originalRetail}</span>
                            </div>
                          </div>
                        )}

                        {item.mode === 'donate' && (
                          <div>
                            <div className="font-display text-xl font-bold text-[#355237]">
                              Free Claim
                            </div>
                            <div className="text-[11px] text-[#647565]">
                              Community initiative
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Functional Action Button */}
                      <button
                        onClick={() => handleAction(item)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                          isAdded
                            ? 'bg-[#3E523F] text-[#FAF8F5]'
                            : 'bg-[#E7E2D8] hover:bg-[#DDD7CC] text-[#222E23] border border-[#D5CDC0]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>
                              {item.mode === 'rent' && 'Rent Piece'}
                              {item.mode === 'resale' && 'Buy Pre-Loved'}
                              {item.mode === 'donate' && 'Request Piece'}
                            </span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
