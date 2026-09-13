import React, { useState } from "react";
import { GrowthScore, BusinessProfile, Language } from "../types";
import { translations } from "../data/translations";
import {
  TrendingUp,
  Wallet,
  Building2,
  CreditCard,
  Calculator,
  PieChart,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Edit3,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Clock,
  DollarSign,
} from "lucide-react";

interface GrowthScoreViewProps {
  growthScore: GrowthScore;
  businessProfile?: BusinessProfile;
  language?: Language;
  onNavigateToPlan: () => void;
  onNavigateToAdvisor: () => void;
  onNavigateToSchemes?: () => void;
  onEditFinancials?: () => void;
}

export const GrowthScoreView: React.FC<GrowthScoreViewProps> = ({
  growthScore,
  businessProfile,
  language = "en",
  onNavigateToPlan,
  onNavigateToAdvisor,
  onNavigateToSchemes,
  onEditFinancials,
}) => {
  const isHi = language === "hi";
  const [showExplanation, setShowExplanation] = useState(false);

  // Financial calculations based on business profile or standards
  const totalProjectCost = 500000;
  const userContribution = 100000;
  const requiredLoan = totalProjectCost - userContribution; // 400000
  const contributionPercent = Math.round((userContribution / totalProjectCost) * 100);
  const loanPercent = 100 - contributionPercent;

  const monthlySales = 165000;
  const monthlyCosts = 115000;
  const grossCashAvailable = monthlySales - monthlyCosts; // 50000
  const estimatedEMI = 8250; // at 7% over 5 years for 4 Lakhs
  const remainingCash = grossCashAvailable - estimatedEMI; // 41750
  const coverageRatio = (grossCashAvailable / estimatedEMI).toFixed(1);

  const expenseBreakdown = [
    { name: "Inventory & Fast-Moving Stock", amount: 250000, percent: 50, color: "bg-[#014D4E]" },
    { name: "Store Infrastructure & Racks", amount: 100000, percent: 20, color: "bg-[#2E8B57]" },
    { name: "Delivery Bike & Order Equipment", amount: 75000, percent: 15, color: "bg-[#F4C430]" },
    { name: "Working Capital Reserve", amount: 50000, percent: 10, color: "bg-[#8C6200]" },
    { name: "Digital Catalog & Marketing", amount: 25000, percent: 5, color: "bg-slate-400" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. TOP SMALL GROWTH SCORE RATING BAR & PAGE HEADER */}
      <div className="bg-white rounded-2xl border border-[#E6DED7] p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Retained Small Growth Score Box */}
        <div className="flex items-center gap-4 bg-[#F8F3EE] p-3.5 rounded-xl border border-[#E6DED7] shrink-0">
          <div className="w-12 h-12 rounded-full bg-[#014D4E] text-white flex flex-col items-center justify-center font-heading shrink-0 shadow-xs">
            <span className="text-lg font-extrabold leading-none">{growthScore.overall}</span>
            <span className="text-[9px] text-teal-100 font-sans leading-none">/100</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#014D4E]">
                Growth Score
              </span>
              <span className="text-[10px] font-bold text-[#2E8B57] bg-[#2E8B57]/10 px-2 py-0.5 rounded-full">
                ↑ +{growthScore.monthChange} this month
              </span>
            </div>
            <div className="font-heading text-sm font-bold text-[#172B35]">
              Rating: {growthScore.label}
            </div>
          </div>
        </div>

        {/* Right: Page Title & Subtitle */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#014D4E]/10 text-[#014D4E] text-xs font-bold mb-1">
            <PieChart className="w-3.5 h-3.5 text-[#014D4E]" />
            <span>Capital & Funding Architecture</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-[#172B35]">
            Financial Structure
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#526671]">
            Understand your capital, funding needs, monthly costs, and repayment plan before you invest.
          </p>
        </div>

        {/* Edit Action Button */}
        <button
          onClick={onEditFinancials || onNavigateToPlan}
          className="px-3.5 py-2 bg-[#F8F3EE] hover:bg-[#E6DED7] text-[#014D4E] font-sans text-xs font-bold rounded-xl border border-[#E6DED7] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Update Details</span>
        </button>
      </div>

      {/* 2. TOP FINANCIAL SUMMARY (4 Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Available Capital */}
        <div className="bg-white rounded-xl border border-[#E6DED7] p-4.5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-bold text-[#526671]">Available Capital</span>
            <div className="w-8 h-8 rounded-lg bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading text-2xl font-extrabold text-[#172B35]">
            ₹{userContribution.toLocaleString("en-IN")}
          </div>
          <div className="font-sans text-[11px] text-[#2E8B57] font-semibold">
            Your equity contribution ({contributionPercent}%)
          </div>
        </div>

        {/* Card 2: Project Cost */}
        <div className="bg-white rounded-xl border border-[#E6DED7] p-4.5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-bold text-[#526671]">Project Cost</span>
            <div className="w-8 h-8 rounded-lg bg-[#014D4E]/10 text-[#014D4E] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading text-2xl font-extrabold text-[#172B35]">
            ₹{totalProjectCost.toLocaleString("en-IN")}
          </div>
          <div className="font-sans text-[11px] text-[#526671] font-medium">
            Total estimated investment
          </div>
        </div>

        {/* Card 3: Required Loan */}
        <div className="bg-white rounded-xl border border-[#E6DED7] p-4.5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-bold text-[#526671]">Required Loan</span>
            <div className="w-8 h-8 rounded-lg bg-[#F4C430]/20 text-[#8C6200] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading text-2xl font-extrabold text-[#014D4E]">
            ₹{requiredLoan.toLocaleString("en-IN")}
          </div>
          <div className="font-sans text-[11px] text-[#8C6200] font-semibold">
            Financing needed ({loanPercent}%)
          </div>
        </div>

        {/* Card 4: Monthly Repayment */}
        <div className="bg-white rounded-xl border border-[#E6DED7] p-4.5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-bold text-[#526671]">Monthly Repayment</span>
            <div className="w-8 h-8 rounded-lg bg-[#014D4E]/10 text-[#014D4E] flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading text-2xl font-extrabold text-[#172B35]">
            ₹{estimatedEMI.toLocaleString("en-IN")} <span className="text-xs font-normal text-[#526671]">/mo</span>
          </div>
          <div className="font-sans text-[11px] text-[#2E8B57] font-semibold">
            7% p.a. subsidized EMI
          </div>
        </div>
      </div>

      {/* 3. FUNDING STRUCTURE & EXPENSE BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: How Your Business Will Be Funded */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E6DED7] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-heading text-base font-bold text-[#172B35]">
              How Your Business Will Be Funded
            </h3>
            <p className="font-sans text-xs text-[#526671] mt-0.5">
              Target capital split between your savings and micro-loan financing.
            </p>
          </div>

          <div className="space-y-4 py-2">
            {/* Visual Bar */}
            <div className="w-full bg-[#F8F3EE] h-5 rounded-full overflow-hidden flex border border-[#E6DED7] shadow-inner">
              <div
                className="bg-[#2E8B57] h-full flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500"
                style={{ width: `${contributionPercent}%` }}
              >
                {contributionPercent}%
              </div>
              <div
                className="bg-[#014D4E] h-full flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500"
                style={{ width: `${loanPercent}%` }}
              >
                {loanPercent}%
              </div>
            </div>

            {/* Split Details */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-[#2E8B57]/10 rounded-xl border border-[#2E8B57]/20">
                <div className="font-sans text-[11px] font-bold uppercase text-[#2E8B57]">
                  Your Contribution
                </div>
                <div className="font-heading text-lg font-extrabold text-[#172B35] mt-0.5">
                  ₹{userContribution.toLocaleString("en-IN")}
                </div>
                <div className="font-sans text-[10px] font-bold text-[#2E8B57]">
                  {contributionPercent}% Self Equity
                </div>
              </div>

              <div className="p-3 bg-[#014D4E]/10 rounded-xl border border-[#014D4E]/20">
                <div className="font-sans text-[11px] font-bold uppercase text-[#014D4E]">
                  Required Loan
                </div>
                <div className="font-heading text-lg font-extrabold text-[#014D4E] mt-0.5">
                  ₹{requiredLoan.toLocaleString("en-IN")}
                </div>
                <div className="font-sans text-[10px] font-bold text-[#014D4E]">
                  {loanPercent}% Govt Scheme Loan
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#F8F3EE] rounded-xl border border-[#E6DED7] font-sans text-xs text-[#526671]">
            <strong className="text-[#172B35]">Total Investment Requirement: </strong>
            <span>₹{totalProjectCost.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Right: Where Your Money Goes */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E6DED7] p-5 shadow-xs space-y-4">
          <div>
            <h3 className="font-heading text-base font-bold text-[#172B35]">
              Where Your Money Goes
            </h3>
            <p className="font-sans text-xs text-[#526671] mt-0.5">
              Estimated capital allocation across store setup, inventory, and equipment.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {expenseBreakdown.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between font-sans text-xs">
                  <span className="font-semibold text-[#172B35]">{exp.name}</span>
                  <div className="font-bold text-[#172B35]">
                    ₹{exp.amount.toLocaleString("en-IN")}{" "}
                    <span className="text-[#526671] font-medium text-[11px]">({exp.percent}%)</span>
                  </div>
                </div>
                <div className="w-full bg-[#F8F3EE] h-2.5 rounded-full overflow-hidden border border-[#E6DED7]">
                  <div
                    className={`${exp.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${exp.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. MONTHLY FINANCIAL PICTURE (Operating Flow) */}
      <div className="bg-white rounded-2xl border border-[#E6DED7] p-5 sm:p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-heading text-base sm:text-lg font-bold text-[#172B35]">
            Monthly Financial Picture
          </h3>
          <p className="font-sans text-xs text-[#526671] mt-0.5">
            Step-by-step operating cash flow after expenses and loan repayments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
          {/* Step 1: Sales */}
          <div className="p-3.5 bg-[#F8F3EE] rounded-xl border border-[#E6DED7] text-center space-y-1">
            <div className="font-sans text-[10px] font-bold uppercase text-[#526671]">1. Expected Sales</div>
            <div className="font-heading text-base sm:text-lg font-extrabold text-[#172B35]">
              ₹{monthlySales.toLocaleString("en-IN")}
            </div>
            <div className="font-sans text-[10px] text-[#526671]">Monthly gross revenue</div>
          </div>

          {/* Step 2: Costs */}
          <div className="p-3.5 bg-[#F8F3EE] rounded-xl border border-[#E6DED7] text-center space-y-1">
            <div className="font-sans text-[10px] font-bold uppercase text-[#C94A45]">2. Operating Costs</div>
            <div className="font-heading text-base sm:text-lg font-extrabold text-[#C94A45]">
              - ₹{monthlyCosts.toLocaleString("en-IN")}
            </div>
            <div className="font-sans text-[10px] text-[#526671]">COGS, rent & utilities</div>
          </div>

          {/* Step 3: Gross Cash */}
          <div className="p-3.5 bg-[#014D4E]/5 rounded-xl border border-[#014D4E]/20 text-center space-y-1">
            <div className="font-sans text-[10px] font-bold uppercase text-[#014D4E]">3. Cash Available</div>
            <div className="font-heading text-base sm:text-lg font-extrabold text-[#014D4E]">
              ₹{grossCashAvailable.toLocaleString("en-IN")}
            </div>
            <div className="font-sans text-[10px] text-[#014D4E]">Gross operating margin</div>
          </div>

          {/* Step 4: Loan EMI */}
          <div className="p-3.5 bg-[#F4C430]/15 rounded-xl border border-[#F4C430]/40 text-center space-y-1">
            <div className="font-sans text-[10px] font-bold uppercase text-[#8C6200]">4. Loan Repayment</div>
            <div className="font-heading text-base sm:text-lg font-extrabold text-[#8C6200]">
              - ₹{estimatedEMI.toLocaleString("en-IN")}
            </div>
            <div className="font-sans text-[10px] text-[#8C6200]">Monthly EMI payment</div>
          </div>

          {/* Step 5: Net Remaining Cash */}
          <div className="p-3.5 bg-[#2E8B57]/10 rounded-xl border border-[#2E8B57]/30 text-center space-y-1">
            <div className="font-sans text-[10px] font-bold uppercase text-[#2E8B57]">5. Remaining Cash</div>
            <div className="font-heading text-base sm:text-lg font-extrabold text-[#2E8B57]">
              ₹{remainingCash.toLocaleString("en-IN")}
            </div>
            <div className="font-sans text-[10px] text-[#2E8B57] font-bold">Net monthly savings</div>
          </div>
        </div>
      </div>

      {/* 5. LOAN PLAN & REPAYMENT HEALTH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Loan & Repayment Plan */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E6DED7] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-base font-bold text-[#172B35]">
                Loan & Repayment Plan
              </h3>
              <p className="font-sans text-xs text-[#526671] mt-0.5">
                Key terms under Government Collateral-Free Micro Credit.
              </p>
            </div>
            <span className="font-sans text-[11px] font-bold text-[#014D4E] bg-[#014D4E]/10 px-2.5 py-1 rounded-full">
              PM Mudra Match
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3 bg-[#F8F3EE] rounded-xl border border-[#E6DED7]">
              <div className="font-sans text-[10px] font-bold uppercase text-[#526671]">Loan Amount</div>
              <div className="font-heading text-sm font-extrabold text-[#172B35] mt-0.5">₹4,00,000</div>
            </div>
            <div className="p-3 bg-[#F8F3EE] rounded-xl border border-[#E6DED7]">
              <div className="font-sans text-[10px] font-bold uppercase text-[#526671]">Interest Rate</div>
              <div className="font-heading text-sm font-extrabold text-[#2E8B57] mt-0.5">7% p.a.</div>
            </div>
            <div className="p-3 bg-[#F8F3EE] rounded-xl border border-[#E6DED7]">
              <div className="font-sans text-[10px] font-bold uppercase text-[#526671]">Tenure</div>
              <div className="font-heading text-sm font-extrabold text-[#172B35] mt-0.5">5 Years</div>
            </div>
            <div className="p-3 bg-[#F8F3EE] rounded-xl border border-[#E6DED7]">
              <div className="font-sans text-[10px] font-bold uppercase text-[#526671]">Moratorium</div>
              <div className="font-heading text-sm font-extrabold text-[#8C6200] mt-0.5">6 Months</div>
            </div>
          </div>

          <div className="p-4 bg-[#014D4E]/5 rounded-xl border border-[#014D4E]/20 flex items-center justify-between font-sans text-xs">
            <div>
              <span className="font-bold text-[#014D4E]">Total Repayment over 5 Years: </span>
              <span className="font-extrabold text-[#172B35]">₹4,76,000</span>
              <span className="text-[11px] text-[#526671] block">Includes ₹76,000 total interest over 60 months</span>
            </div>
            <div className="font-heading text-base font-extrabold text-[#014D4E] shrink-0">
              ₹8,250 / mo
            </div>
          </div>
        </div>

        {/* Right: Repayment Health & Gaps Attention */}
        <div className="lg:col-span-5 space-y-4">
          {/* Repayment Health Badge */}
          <div className="bg-white rounded-2xl border border-[#E6DED7] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-bold uppercase text-[#526671]">Repayment Health</span>
              <span className="font-sans text-xs font-extrabold text-[#2E8B57] bg-[#2E8B57]/10 border border-[#2E8B57]/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2E8B57] animate-pulse"></span>
                <span>🟢 Comfortable</span>
              </span>
            </div>

            <p className="font-sans text-xs text-[#172B35] font-medium leading-relaxed">
              “Your estimated monthly cash flow (₹50,000) comfortably covers the planned repayment (₹8,250) with a <strong>{coverageRatio}x safety margin</strong>.”
            </p>
          </div>

          {/* What Needs Attention */}
          <div className="bg-white rounded-2xl border border-[#E6DED7] p-5 shadow-xs space-y-3">
            <div className="font-heading text-xs font-bold uppercase tracking-wider text-[#172B35] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#8C6200]" />
              <span>What Needs Attention</span>
            </div>

            <ul className="space-y-2 font-sans text-xs text-[#172B35]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0 mt-0.5" />
                <span>Working capital reserve (₹50,000) covers 1.5 months of emergency expenses.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0 mt-0.5" />
                <span>Repayment-to-cashflow ratio is 16.5% (well inside the safe 30% risk limit).</span>
              </li>
              <li className="flex items-start gap-2 text-[#8C6200]">
                <AlertTriangle className="w-4 h-4 text-[#8C6200] shrink-0 mt-0.5" />
                <span>Maintain 10% extra liquidity buffer for seasonal festival stock.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 6. POTENTIAL FUNDING SUPPORT & SCHEME MATCHING */}
      <div className="bg-white rounded-2xl border border-[#E6DED7] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-[#172B35]">
              Potential Funding Support
            </h3>
            <p className="font-sans text-xs text-[#526671] mt-0.5">
              Matched government collateral-free credit schemes for micro & small enterprises.
            </p>
          </div>

          <button
            onClick={onNavigateToSchemes || onNavigateToPlan}
            className="font-sans text-xs font-bold text-[#014D4E] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All Schemes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Scheme 1: PM Mudra Yojana */}
          <div className="p-4 rounded-xl bg-[#F8F3EE] border border-[#E6DED7] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-bold text-[#014D4E]">
                  PM Mudra Yojana (Kishore Category)
                </span>
                <span className="font-sans text-[10px] font-bold px-2 py-0.5 rounded bg-[#014D4E]/10 text-[#014D4E]">
                  Collateral Free
                </span>
              </div>
              <p className="font-sans text-xs text-[#526671] leading-relaxed">
                Up to ₹5,00,000 loan for purchasing store equipment, inventory expansion, and delivery infrastructure.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <span className="text-[#526671] block text-[10px]">Interest Rate</span>
                  <strong className="text-[#172B35]">7.0% – 8.5% p.a.</strong>
                </div>
                <div>
                  <span className="text-[#526671] block text-[10px]">Tenure</span>
                  <strong className="text-[#172B35]">5 Years</strong>
                </div>
              </div>
            </div>

            <button
              onClick={onNavigateToSchemes || onNavigateToPlan}
              className="w-full py-2 bg-[#014D4E] hover:bg-[#013738] text-white font-sans text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View Scheme Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F4C430]" />
            </button>
          </div>

          {/* Scheme 2: PM SVANidhi */}
          <div className="p-4 rounded-xl bg-[#F8F3EE] border border-[#E6DED7] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-bold text-[#014D4E]">
                  PM SVANidhi Micro Credit
                </span>
                <span className="font-sans text-[10px] font-bold px-2 py-0.5 rounded bg-[#2E8B57]/10 text-[#2E8B57]">
                  7% Subsidy
                </span>
              </div>
              <p className="font-sans text-xs text-[#526671] leading-relaxed">
                ₹10,000 to ₹50,000 working capital loan with 7% interest subsidy and digital repayment cashback.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <span className="text-[#526671] block text-[10px]">Interest Subsidy</span>
                  <strong className="text-[#2E8B57]">7% Subsidized</strong>
                </div>
                <div>
                  <span className="text-[#526671] block text-[10px]">Tenure</span>
                  <strong className="text-[#172B35]">36 Months</strong>
                </div>
              </div>
            </div>

            <button
              onClick={onNavigateToSchemes || onNavigateToPlan}
              className="w-full py-2 bg-[#014D4E] hover:bg-[#013738] text-white font-sans text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View Scheme Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F4C430]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
