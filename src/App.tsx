/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueProposition } from './components/ValueProposition';
import { PersonalizedWardrobe } from './components/PersonalizedWardrobe';
import { ImpactCalculator } from './components/ImpactCalculator';
import { CommunityProof } from './components/CommunityProof';
import { Footer } from './components/Footer';
import { ListClothesModal } from './components/ListClothesModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BagDrawer } from './components/BagDrawer';
import { MOCK_CLOTHES } from './data/mockClothes';
import { FashionItem, FashionMode, CartItem } from './types';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [items] = useState<FashionItem[]>(MOCK_CLOTHES);
  const [activeMode, setActiveMode] = useState<FashionMode>('all');
  const [bagItems, setBagItems] = useState<CartItem[]>([
    // Provide 1 initial pre-configured circular item so the cart isn't completely empty on first test
    {
      item: MOCK_CLOTHES[0],
      mode: 'rent',
      rentalDays: 4,
      rentalStartDate: '2026-10-04',
    }
  ]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState<FashionItem | null>(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [listModalMode, setListModalMode] = useState<'rent' | 'resale' | 'donate'>('resale');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleOpenListModal = (initialMode: 'rent' | 'resale' | 'donate' = 'resale') => {
    setListModalMode(initialMode);
    setIsListModalOpen(true);
  };

  const handleSelectModeAndScroll = (mode: FashionMode) => {
    setActiveMode(mode);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToBag = (
    item: FashionItem,
    mode: 'rent' | 'resale' | 'donate',
    rentalDays: 4 | 8 | 14 = 4,
    rentalStartDate?: string
  ) => {
    setBagItems((prev) => [
      ...prev,
      {
        item,
        mode,
        rentalDays: mode === 'rent' ? rentalDays : undefined,
        rentalStartDate: mode === 'rent' ? rentalStartDate || '2026-10-01' : undefined,
      },
    ]);
    const actionLabel = mode === 'rent' ? 'Added 4-day rental for' : mode === 'resale' ? 'Added pre-loved' : 'Added donation pledge for';
    showToast(`${actionLabel} "${item.title}"`);
  };

  const handleRemoveCartItem = (index: number) => {
    setBagItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearBag = () => {
    setBagItems([]);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#242A25] flex flex-col font-body selection:bg-[#7D8F78]/25 selection:text-[#1E2620]">
      
      {/* Top Navigation */}
      <Navbar
        onOpenListModal={handleOpenListModal}
        onOpenBag={() => setIsBagOpen(true)}
        bagCount={bagItems.length}
        onSelectMode={handleSelectModeAndScroll}
        activeMode={activeMode}
      />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onListClick={() => handleOpenListModal('resale')}
        />

        {/* 2. MAIN VALUE PROPOSITION (Rent, Resale, Donate) */}
        <ValueProposition
          onSelectPillar={handleSelectModeAndScroll}
          onOpenDonateModal={() => handleOpenListModal('donate')}
        />

        {/* 3. PERSONALIZED / CURATED CIRCULAR CLOTHING BROWSER */}
        <PersonalizedWardrobe
          items={items}
          activeMode={activeMode}
          onSelectMode={setActiveMode}
          onQuickView={(item) => setQuickViewItem(item)}
          onAddToBag={handleAddToBag}
        />

        {/* 4. ENVIRONMENTAL IMPACT CALCULATOR */}
        <ImpactCalculator />

        {/* 5. COMMUNITY PROOF & CERTIFICATIONS */}
        <CommunityProof />
      </main>

      {/* Footer */}
      <Footer
        onSelectMode={handleSelectModeAndScroll}
        onOpenListModal={() => handleOpenListModal('resale')}
      />

      {/* Quick View / Detail Modal */}
      <ProductDetailModal
        item={quickViewItem}
        onClose={() => setQuickViewItem(null)}
        onAddToBag={handleAddToBag}
      />

      {/* "List Your Clothes" Modal */}
      <ListClothesModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        initialMode={listModalMode}
      />

      {/* Slide-Over Bag Drawer */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={bagItems}
        onRemoveItem={handleRemoveCartItem}
        onClearBag={handleClearBag}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#253227] text-[#FAF8F5] px-4 py-3 rounded-xl shadow-xl border border-[#3E4F3F] flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-[#8ECE92]" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setIsBagOpen(true)}
            className="ml-2 underline text-[#D2E2D3] hover:text-white text-[11px]"
          >
            View Bag
          </button>
        </div>
      )}

    </div>
  );
}
