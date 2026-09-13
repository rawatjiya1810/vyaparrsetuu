import React, { useState, useEffect } from "react";
import {
  Language,
  BusinessProfile,
  GrowthScore,
  MarketGap,
  ActionPlan,
  PlanTask,
  LocalBusiness,
} from "./types";
import {
  initialBusinessProfile,
  mockGrowthScore,
  mockNearbyBusinesses,
  mockOpportunityZones,
  mockMarketGaps,
  mockActionPlan,
} from "./data/mockData";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { Footer } from "./components/Footer";
import { AuthModal } from "./components/AuthModal";
import { AppShell, NavTab } from "./components/AppShell";
import { OverviewDashboard } from "./components/OverviewDashboard";
import { BusinessDNA } from "./components/BusinessDNA";
import { MarketScan } from "./components/MarketScan";
import { GrowthScoreView } from "./components/GrowthScoreView";
import { OpportunityDetector } from "./components/OpportunityDetector";
import { BusinessAdvisorView } from "./components/BusinessAdvisorView";
import { ActionPlanView } from "./components/ActionPlanView";
import { CommunityView } from "./components/CommunityView";
import { SettingsView } from "./components/SettingsView";
import { HelpSupportView } from "./components/HelpSupportView";
import { TaskDetailModal } from "./components/TaskDetailModal";
import { ConnectModal } from "./components/ConnectModal";

export default function App() {
  // Persistence state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("vyaparsetu_auth") === "true";
  });

  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem("vyaparsetu_user") || "Ramesh Kumar";
  });

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("vyaparsetu_lang") as Language) || "en";
  });

  const [currentTab, setCurrentTab] = useState<NavTab>("overview");

  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(() => {
    const saved = localStorage.getItem("vyaparsetu_profile");
    return saved ? JSON.parse(saved) : initialBusinessProfile;
  });

  const [growthScore, setGrowthScore] = useState<GrowthScore>(() => {
    const saved = localStorage.getItem("vyaparsetu_growth_score");
    return saved ? JSON.parse(saved) : mockGrowthScore;
  });

  const [localBusinesses] = useState<LocalBusiness[]>(mockNearbyBusinesses);
  const [opportunityZones] = useState(mockOpportunityZones);
  const [marketGaps] = useState<MarketGap[]>(mockMarketGaps);

  const [actionPlan, setActionPlan] = useState<ActionPlan>(() => {
    const saved = localStorage.getItem("vyaparsetu_action_plan");
    return saved ? JSON.parse(saved) : mockActionPlan;
  });

  // Modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [selectedTask, setSelectedTask] = useState<PlanTask | null>(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedConnectBusiness, setSelectedConnectBusiness] = useState<LocalBusiness | null>(null);
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("vyaparsetu_auth", isAuthenticated ? "true" : "false");
    localStorage.setItem("vyaparsetu_user", userName);
    localStorage.setItem("vyaparsetu_lang", language);
    localStorage.setItem("vyaparsetu_profile", JSON.stringify(businessProfile));
    localStorage.setItem("vyaparsetu_growth_score", JSON.stringify(growthScore));
    localStorage.setItem("vyaparsetu_action_plan", JSON.stringify(actionPlan));
  }, [isAuthenticated, userName, language, businessProfile, growthScore, actionPlan]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  const handleOpenAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: { name: string; mobile: string; isNewUser: boolean }) => {
    setIsAuthenticated(true);
    setUserName(user.name);
    setAuthModalOpen(false);

    if (user.isNewUser) {
      setCurrentTab("business-dna");
    } else {
      setCurrentTab("overview");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("vyaparsetu_auth");
    setCurrentTab("overview");
  };

  const handleToggleTask = (taskId: string) => {
    setActionPlan((prev) => {
      let newlyCompleted = false;
      const updatedWeeks = prev.weeks.map((week) => ({
        ...week,
        tasks: week.tasks.map((task) => {
          if (task.id === taskId) {
            const nextStatus = !task.completed;
            newlyCompleted = nextStatus;
            return { ...task, completed: nextStatus };
          }
          return task;
        }),
      }));

      const totalCompleted = updatedWeeks.reduce(
        (acc, w) => acc + w.tasks.filter((t) => t.completed).length,
        0
      );

      // Dynamically boost growth score slightly when tasks are finished
      if (newlyCompleted && growthScore.overall < 95) {
        setGrowthScore((gs) => ({
          ...gs,
          overall: Math.min(100, gs.overall + 2),
        }));
      }

      return {
        ...prev,
        weeks: updatedWeeks,
        completedTasksCount: totalCompleted,
      };
    });
  };

  const handleOpenTaskDetail = (task: PlanTask) => {
    setSelectedTask(task);
    setTaskModalOpen(true);
  };

  const handleOpenTaskById = (taskId: string) => {
    for (const week of actionPlan.weeks) {
      const found = week.tasks.find((t) => t.id === taskId);
      if (found) {
        setSelectedTask(found);
        setTaskModalOpen(true);
        return;
      }
    }
    if (actionPlan.actionForToday && actionPlan.actionForToday.id === taskId) {
      setSelectedTask(actionPlan.actionForToday);
      setTaskModalOpen(true);
    }
  };

  const handleOpenConnect = (business: LocalBusiness) => {
    setSelectedConnectBusiness(business);
    setConnectModalOpen(true);
  };

  const handleAddOpportunityToPlan = (gap: MarketGap) => {
    const newTask: PlanTask = {
      id: `task-opp-${Date.now()}`,
      week: 1,
      title: `Execute Opportunity: ${gap.title}`,
      whyItMatters: gap.whyItMatters || gap.shortExplanation,
      estimatedTime: "30 mins",
      difficulty: "Moderate",
      expectedOutcome: gap.potentialRevenue || gap.potentialAction,
      completed: false,
      actionGuidance: [gap.potentialAction, ...(gap.evidence || [])],
    };

    setActionPlan((prev) => {
      const updatedWeeks = [...prev.weeks];
      updatedWeeks[0] = {
        ...updatedWeeks[0],
        tasks: [newTask, ...updatedWeeks[0].tasks],
      };
      return {
        ...prev,
        weeks: updatedWeeks,
        totalTasksCount: prev.totalTasksCount + 1,
      };
    });
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`${isAuthenticated ? "h-screen max-h-screen w-full overflow-hidden" : "min-h-screen"} bg-[#FFFDFC] text-[#172B35] font-sans antialiased selection:bg-[#014D4E]/20 selection:text-[#014D4E]`}>
      {!isAuthenticated ? (
        /* PUBLIC EXPERIENCE (Landing Page + Navigation + Footer) */
        <div className="flex flex-col min-h-screen">
          <Navbar
            language={language}
            onLanguageChange={handleLanguageChange}
            onOpenAuth={handleOpenAuth}
            onNavigateSection={handleNavigateSection}
          />

          <main className="flex-1">
            <LandingPage
              language={language}
              onOpenAuth={handleOpenAuth}
            />
          </main>

          <Footer
            language={language}
            onOpenAuth={handleOpenAuth}
            onNavigateSection={handleNavigateSection}
          />
        </div>
      ) : (
        /* PRIVATE EXPERIENCE (AppShell with all tabs & dashboards) */
        <AppShell
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          language={language}
          onLanguageChange={handleLanguageChange}
          businessProfile={businessProfile}
          userName={userName}
          onLogout={handleLogout}
          growthScore={growthScore}
          marketGaps={marketGaps}
          actionPlan={actionPlan}
        >
          {currentTab === "overview" && (
            <OverviewDashboard
              businessProfile={businessProfile}
              growthScore={growthScore}
              marketGaps={marketGaps}
              actionPlan={actionPlan}
              userName={userName}
              language={language}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onSelectTask={handleOpenTaskById}
            />
          )}

          {currentTab === "business-dna" && (
            <BusinessDNA
              initialProfile={businessProfile}
              onSaveProfile={(updated) => setBusinessProfile(updated)}
              onContinueToMarketScan={() => setCurrentTab("market-scan")}
              language={language}
            />
          )}

          {currentTab === "market-scan" && (
            <MarketScan
              businessProfile={businessProfile}
              localBusinesses={localBusinesses}
              opportunityZones={opportunityZones}
              marketGaps={marketGaps}
              language={language}
              onOpenConnectModal={handleOpenConnect}
              onExploreOpportunity={() => {
                setCurrentTab("opportunities");
              }}
            />
          )}

          {currentTab === "growth-score" && (
            <GrowthScoreView
              growthScore={growthScore}
              businessProfile={businessProfile}
              language={language}
              onNavigateToPlan={() => setCurrentTab("action-plan")}
              onNavigateToAdvisor={() => setCurrentTab("advisor")}
              onNavigateToSchemes={() => setCurrentTab("opportunities")}
              onEditFinancials={() => setCurrentTab("business-dna")}
            />
          )}

          {currentTab === "opportunities" && (
            <OpportunityDetector
              businessProfile={businessProfile}
              marketGaps={marketGaps}
              language={language}
              onAddToPlan={handleAddOpportunityToPlan}
            />
          )}

          {currentTab === "advisor" && (
            <BusinessAdvisorView
              businessProfile={businessProfile}
              growthScore={growthScore}
              marketGaps={marketGaps}
              language={language}
              onNavigateToPlan={() => setCurrentTab("action-plan")}
            />
          )}

          {currentTab === "action-plan" && (
            <ActionPlanView
              actionPlan={actionPlan}
              language={language}
              onToggleTask={handleToggleTask}
              onOpenTaskDetails={handleOpenTaskDetail}
            />
          )}

          {currentTab === "community" && (
            <CommunityView
              businessProfile={businessProfile}
              localBusinesses={localBusinesses}
              language={language}
              onOpenConnectModal={handleOpenConnect}
            />
          )}

          {currentTab === "settings" && (
            <SettingsView
              businessProfile={businessProfile}
              language={language}
              onLanguageChange={handleLanguageChange}
              onSaveProfile={(updated) => setBusinessProfile(updated)}
            />
          )}

          {currentTab === "help" && <HelpSupportView language={language} />}
        </AppShell>
      )}

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        language={language}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <TaskDetailModal
        task={selectedTask}
        isOpen={taskModalOpen}
        language={language}
        onClose={() => {
          setTaskModalOpen(false);
          setSelectedTask(null);
        }}
        onToggleComplete={handleToggleTask}
      />

      <ConnectModal
        business={selectedConnectBusiness}
        businessProfile={businessProfile}
        language={language}
        isOpen={connectModalOpen}
        onClose={() => {
          setConnectModalOpen(false);
          setSelectedConnectBusiness(null);
        }}
      />
    </div>
  );
}
