/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Subheader } from './components/Subheader';
import { Calculator } from './components/Calculator';
import { FeaturedBenchmarkCard } from './components/FeaturedBenchmarkCard';
import { BenchmarkComparison } from './components/BenchmarkComparison';
import { LivePipelineSection } from './components/LivePipelineSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { LeadInquiryModal } from './components/LeadInquiryModal';
import { SearchModal } from './components/SearchModal';
import { DossierModal } from './components/DossierModal';
import { LaunchRadarView } from './components/LaunchRadarView';
import { ComparativeMatrixView } from './components/ComparativeMatrixView';
import { DeveloperAgentSuiteView } from './components/DeveloperAgentSuiteView';
import { ShortlistAlertsView } from './components/ShortlistAlertsView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('land-sales-and-indicative-pricing');
  const [currency, setCurrency] = useState<'SGD' | 'USD'>('SGD');
  const [unit, setUnit] = useState<'PSF' | 'PSM'>('PSF');

  // Calculator state
  const [currentLandPsf, setCurrentLandPsf] = useState<number>(1402);
  const [selectedSiteName, setSelectedSiteName] = useState<string | undefined>(undefined);

  // Shortlist and lead inquiries
  const [shortlistIds, setShortlistIds] = useState<string[]>(['zion-road-a', 'bayshore-road']);
  const [inquiryCount, setInquiryCount] = useState<number>(14);

  // Modals
  const [inquiryModalOpen, setInquiryModalOpen] = useState<boolean>(false);
  const [inquiryProject, setInquiryProject] = useState<string>('Zion Road (Parcel A)');
  const [inquiryDeveloper, setInquiryDeveloper] = useState<string>('CDL & Mitsui Fudosan');

  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [dossierModalOpen, setDossierModalOpen] = useState<boolean>(false);

  const handleLoadSiteIntoCalc = (landPsf: number, siteName: string) => {
    setCurrentLandPsf(landPsf);
    setSelectedSiteName(siteName);
    setActiveTab('land-sales-and-indicative-pricing');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleBookViewing = (projectName: string, developer: string) => {
    setInquiryProject(projectName);
    setInquiryDeveloper(developer);
    setInquiryModalOpen(true);
  };

  const handleScrollToPipeline = () => {
    const el = document.getElementById('pipelineTable');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#051424] text-[#d4e4fa] font-sans flex flex-col selection:bg-[#10b981] selection:text-[#00422b]">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        unit={unit}
        setUnit={setUnit}
        onOpenSearch={() => setSearchModalOpen(true)}
        shortlistCount={shortlistIds.length}
      />

      {/* Main Container */}
      <main className="w-full pt-20 flex-1 flex flex-col">
        {/* Subheader Macro Strip */}
        <Subheader
          activePipelineCount={14}
          pendingCount={3}
          currency={currency}
          unit={unit}
        />

        {/* View Switcher */}
        {activeTab === 'land-sales-and-indicative-pricing' && (
          <div className="w-full px-4 lg:px-6 py-8 max-w-[1600px] mx-auto flex flex-col gap-8">
            {/* Bento Grid: Calculator (8 cols) & Featured Site (4 cols) */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8">
                <Calculator
                  currentLandPsf={currentLandPsf}
                  setCurrentLandPsf={setCurrentLandPsf}
                  selectedSiteName={selectedSiteName}
                  currency={currency}
                  unit={unit}
                  onScrollToPipeline={handleScrollToPipeline}
                />
              </div>

              <div className="lg:col-span-4">
                <FeaturedBenchmarkCard
                  onLoadSite={handleLoadSiteIntoCalc}
                  currency={currency}
                  unit={unit}
                  onBookViewing={handleBookViewing}
                />
              </div>
            </div>

            {/* Section 2: Multi-Tier Benchmark Comparison */}
            <BenchmarkComparison
              currency={currency}
              unit={unit}
            />

            {/* Section 3: Live URA Pipeline Projects (Sub-goals 2 & 3) */}
            <LivePipelineSection
              onLoadIntoCalc={handleLoadSiteIntoCalc}
              onBookViewing={handleBookViewing}
            />

            {/* Section 4: Conversion CTA Modules */}
            <CtaSection
              onOpenReportModal={() => setDossierModalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'launch-radar' && (
          <LaunchRadarView
            onBookViewing={handleBookViewing}
            onSelectSiteInCalc={(name) => {
              setSelectedSiteName(name);
              setActiveTab('land-sales-and-indicative-pricing');
            }}
          />
        )}

        {activeTab === 'comparative-matrix' && (
          <ComparativeMatrixView
            onLoadSite={handleLoadSiteIntoCalc}
            onBookViewing={handleBookViewing}
          />
        )}

        {activeTab === 'developer-and-agent-suite' && (
          <DeveloperAgentSuiteView
            inquiryCount={inquiryCount}
          />
        )}

        {activeTab === 'my-shortlist-and-alerts' && (
          <ShortlistAlertsView
            shortlistIds={shortlistIds}
            onRemoveFromShortlist={(id) => setShortlistIds(shortlistIds.filter((x) => x !== id))}
            onLoadSite={handleLoadSiteIntoCalc}
            onBookViewing={handleBookViewing}
            onBrowseMore={() => setActiveTab('land-sales-and-indicative-pricing')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <LeadInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        projectName={inquiryProject}
        developerName={inquiryDeveloper}
        onInquirySubmitted={() => setInquiryCount((prev) => prev + 1)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectSite={handleLoadSiteIntoCalc}
        onBookViewing={handleBookViewing}
      />

      <DossierModal
        isOpen={dossierModalOpen}
        onClose={() => setDossierModalOpen(false)}
      />
    </div>
  );
}
