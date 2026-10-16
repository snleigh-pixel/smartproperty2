export interface GlsSite {
  id: string;
  name: string;
  district: string;
  mrt: string;
  region: 'OCR' | 'RCR' | 'CCR';
  developer: string;
  tenderDate: string;
  landBidPsf: number;
  estBreakevenPsf: number;
  indicativeLaunchMin: number;
  indicativeLaunchMax: number;
  expectedLaunch: string;
  status: 'Tender Awarded' | 'Preview Open' | 'Upcoming Tender' | 'Sold Out';
  fairValueRating: 'High Potential Upside' | 'Fair Market Launch' | 'Strong Buyer Interest' | 'Undervalued Entry';
  siteAreaSqm: number;
  maxGfaSqm: number;
  plotRatio: number;
  estUnits: number;
  tenderPriceTotal: number; // in SGD
  runnerUpBidPsf?: number;
  runnerUpBidder?: string;
  bidSpreadPct?: number;
  tenure: string;
  description: string;
  imageUrl?: string;
}

export interface PricingState {
  landCostPsf: number;
  constructionCostPsf: number;
  feesMarketingPsf: number;
  targetMarginPct: number;
  districtMultiplier: number;
  districtTierLabel: string;
  currency: 'SGD' | 'USD';
  unit: 'PSF' | 'PSM';
  selectedSiteName?: string;
}

export interface DistrictBenchmark {
  region: 'OCR' | 'RCR' | 'CCR';
  name: string;
  subDistricts: string;
  resaleAvg: number;
  glsLandBid: number;
  predictedLaunch: number;
  actualLaunch: number;
  accuracy: number;
  yoyDelta: string;
}
