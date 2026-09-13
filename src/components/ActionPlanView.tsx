import React, { useState } from "react";
import { ActionPlan, PlanTask, Language } from "../types";
import { translations } from "../data/translations";
import {
  CalendarCheck2,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Zap,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ActionPlanViewProps {
  actionPlan: ActionPlan;
  language?: Language;
  onToggleTask: (taskId: string) => void;
  onOpenTaskDetails: (task: PlanTask) => void;
}

export const ActionPlanView: React.FC<ActionPlanViewProps> = ({
  actionPlan,
  language = "en",
  onToggleTask,
  onOpenTaskDetails,
}) => {
  const isHi = language === "hi";
  const [selectedWeek, setSelectedWeek] = useState<number | "all">("all");
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const toggleWeekExpand = (wNum: number) => {
    setExpandedWeeks((prev) => ({ ...prev, [wNum]: !prev[wNum] }));
  };

  const progressPercent = Math.round(
    (actionPlan.completedTasksCount / (actionPlan.totalTasksCount || 1)) * 100
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E6DED7]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E8B57]/10 text-[#2E8B57] text-xs font-semibold mb-1">
            <CalendarCheck2 className="w-3.5 h-3.5" />
            <span>Personalized 30-Day Growth Plan</span>
          </div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Your 30-Day Action Plan
          </h1>
          <p className="text-xs sm:text-sm text-[#60727A]">
            Focus: {actionPlan.monthFocus || "Small, high-impact tasks designed to take 15–30 minutes a day."}
          </p>
        </div>

        {/* Overall Completion Metric */}
        <div className="bg-white p-3.5 rounded-xl border border-[#E6DED7] shadow-xs flex items-center gap-4 self-start sm:self-auto">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#60727A]">
              Progress
            </div>
            <div className="text-xl font-bold text-[#014D4E]">
              {actionPlan.completedTasksCount} / {actionPlan.totalTasksCount}{" "}
              <span className="text-xs text-[#60727A] font-medium">({progressPercent}%)</span>
            </div>
          </div>
          <div className="w-14 h-14 relative flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#F8F3EE"
                strokeWidth="3.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#2E8B57"
                strokeWidth="3.5"
                strokeDasharray={`${progressPercent}, 100`}
              />
            </svg>
            <Award className="w-4 h-4 text-[#2E8B57] absolute" />
          </div>
        </div>
      </div>

      {/* TODAY'S SPOTLIGHT TASK BANNER */}
      {actionPlan.actionForToday && (
        <div className="bg-gradient-to-r from-[#013738] via-[#014D4E] to-[#012E2F] text-white p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#014D4E]/40">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F4C430] text-[#013738] text-[10px] font-extrabold uppercase tracking-wider shadow-2xs">
              <Zap className="w-3 h-3 text-[#013738]" /> Focus for Today
            </div>
            <h3 className="text-base sm:text-xl font-extrabold text-white tracking-tight leading-snug drop-shadow-xs">
              {actionPlan.actionForToday.title}
            </h3>
            <p className="text-xs sm:text-sm text-teal-50 max-w-xl font-medium leading-relaxed opacity-95">
              {actionPlan.actionForToday.whyItMatters}
            </p>
          </div>

          <button
            onClick={() => onOpenTaskDetails(actionPlan.actionForToday)}
            className="px-5 py-2.5 bg-[#F4C430] hover:bg-[#E0AF1F] active:scale-[0.98] text-[#013738] text-xs font-extrabold rounded-xl shadow-xs transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Start Today's Task ({actionPlan.actionForToday.estimatedTime})</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#013738]" />
          </button>
        </div>
      )}

      {/* Week Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedWeek("all")}
          className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
            selectedWeek === "all"
              ? "bg-[#014D4E] text-white border-[#014D4E]"
              : "bg-white text-[#172B35] border-[#E6DED7] hover:bg-[#F8F3EE]"
          }`}
        >
          All 4 Weeks
        </button>

        {actionPlan.weeks.map((w) => (
          <button
            key={w.weekNumber}
            onClick={() => setSelectedWeek(w.weekNumber)}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
              selectedWeek === w.weekNumber
                ? "bg-[#014D4E] text-white border-[#014D4E]"
                : "bg-white text-[#172B35] border-[#E6DED7] hover:bg-[#F8F3EE]"
            }`}
          >
            Week {w.weekNumber} ({w.tasks.filter((t) => t.completed).length}/
            {w.tasks.length})
          </button>
        ))}
      </div>

      {/* 4 WEEKLY TASK SECTIONS */}
      <div className="space-y-5">
        {actionPlan.weeks
          .filter((w) => selectedWeek === "all" || selectedWeek === w.weekNumber)
          .map((week) => {
            const isExpanded = expandedWeeks[week.weekNumber];
            const completedCount = week.tasks.filter((t) => t.completed).length;

            return (
              <div
                key={week.weekNumber}
                className="bg-white rounded-2xl border border-[#E6DED7] overflow-hidden shadow-xs"
              >
                {/* Week Accordion Header */}
                <div
                  onClick={() => toggleWeekExpand(week.weekNumber)}
                  className="p-4 sm:p-5 bg-[#F8F3EE] flex items-center justify-between cursor-pointer border-b border-[#E6DED7]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#014D4E] text-white font-sans text-xs font-bold flex items-center justify-center">
                      W{week.weekNumber}
                    </span>
                    <div>
                      <h3 className="font-heading text-sm sm:text-base font-extrabold text-[#172B35]">
                        {week.title}
                      </h3>
                      <p className="font-sans text-[11px] sm:text-xs text-[#526671] font-semibold">{week.theme || week.goal}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-sans text-xs font-bold text-[#014D4E] bg-white px-2.5 py-1 rounded-md border border-[#E6DED7]">
                      {completedCount} of {week.tasks.length} Done
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#526671]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#526671]" />
                    )}
                  </div>
                </div>

                {/* Tasks List */}
                {isExpanded && (
                  <div className="divide-y divide-[#E6DED7] p-2 sm:p-4 space-y-2">
                    {week.tasks.map((task) => {
                      const isTodayTask = actionPlan.actionForToday && actionPlan.actionForToday.id === task.id;
                      return (
                        <div
                          key={task.id}
                          className={`p-3.5 sm:p-4 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isTodayTask
                              ? "bg-gradient-to-r from-[#013738] via-[#014D4E] to-[#013738] text-white border border-[#014D4E]/60 shadow-sm"
                              : task.completed
                              ? "bg-[#2E8B57]/5 border border-[#2E8B57]/20"
                              : "bg-white hover:bg-[#F8F3EE] border border-[#E6DED7]"
                          }`}
                        >
                          {/* Left: Checkbox & Info */}
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => onToggleTask(task.id)}
                              className={`mt-0.5 hover:scale-110 transition-transform cursor-pointer ${
                                isTodayTask ? "text-[#F4C430]" : "text-[#014D4E]"
                              }`}
                            >
                              {task.completed ? (
                                <CheckCircle2 className={`w-5 h-5 ${isTodayTask ? "text-[#F4C430] fill-[#F4C430]/20" : "text-[#2E8B57] fill-[#2E8B57]/10"}`} />
                              ) : (
                                <Circle className={`w-5 h-5 ${isTodayTask ? "text-teal-200" : "text-[#60727A]"}`} />
                              )}
                            </button>

                            <div>
                              <div className="flex items-center gap-2">
                                <h4
                                  className={`text-xs sm:text-sm ${
                                    isTodayTask
                                      ? "font-extrabold text-white tracking-tight drop-shadow-xs"
                                      : task.completed
                                      ? "line-through text-[#60727A] font-bold"
                                      : "text-[#172B35] font-bold"
                                  }`}
                                >
                                  {task.title}
                                </h4>
                                <span
                                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                                    isTodayTask
                                      ? "bg-[#F4C430] text-[#013738]"
                                      : task.difficulty === "Easy"
                                      ? "bg-[#2E8B57]/10 text-[#2E8B57]"
                                      : "bg-[#F4C430]/20 text-[#A87B00]"
                                  }`}
                                >
                                  {task.difficulty}
                                </span>
                              </div>

                              <p className={`text-xs mt-1 leading-relaxed ${isTodayTask ? "text-teal-50 font-medium opacity-95" : "text-[#60727A]"}`}>
                                {task.whyItMatters || task.description}
                              </p>

                              <div className={`flex items-center gap-3 text-[11px] mt-2 ${isTodayTask ? "text-teal-100/90 font-medium" : "text-[#60727A]"}`}>
                                <span className="flex items-center gap-1">
                                  <Clock className={`w-3 h-3 ${isTodayTask ? "text-[#F4C430]" : "text-[#014D4E]"}`} />{" "}
                                  {task.estimatedTime || `${task.estimatedMinutes || 15} min`}
                                </span>
                                <span>•</span>
                                <span className={isTodayTask ? "text-[#F4C430] font-bold" : "text-[#014D4E] font-semibold"}>
                                  Outcome: {task.expectedOutcome}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Detail Button */}
                          <button
                            onClick={() => onOpenTaskDetails(task)}
                            className={`self-end sm:self-center px-3.5 py-1.5 text-xs font-extrabold rounded-lg transition-colors cursor-pointer shrink-0 ${
                              isTodayTask
                                ? "bg-[#F4C430] hover:bg-[#E0AF1F] text-[#013738]"
                                : "bg-[#F8F3EE] hover:bg-[#E6DED7] text-[#014D4E]"
                            }`}
                          >
                            Step Guide →
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
