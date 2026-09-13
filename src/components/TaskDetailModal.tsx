import React from "react";
import { PlanTask, Language } from "../types";
import { translations } from "../data/translations";
import {
  X,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface TaskDetailModalProps {
  task: PlanTask | null;
  isOpen: boolean;
  language?: Language;
  onClose: () => void;
  onToggleComplete: (taskId: string) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  language = "en",
  onClose,
  onToggleComplete,
}) => {
  const isHi = language === "hi";
  if (!isOpen || !task) return null;

  const guidanceSteps = task.actionGuidance || task.actionSteps || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172B35]/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E6DED7] shadow-xl overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#F8F3EE] p-5 border-b border-[#E6DED7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                task.difficulty === "Easy"
                  ? "bg-[#2E8B57]/10 text-[#2E8B57]"
                  : "bg-[#F4C430]/20 text-[#A87B00]"
              }`}
            >
              {task.difficulty === "Easy"
                ? (isHi ? "आसान कठिनाई" : "Easy Difficulty")
                : (isHi ? "मध्यम कठिनाई" : "Medium Difficulty")}
            </span>
            <span className="text-xs text-[#60727A] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#014D4E]" /> {task.estimatedTime ? (isHi ? task.estimatedTime.replace("mins", "मिनट").replace("min", "मिनट") : task.estimatedTime) : (isHi ? "15 मिनट" : "15 mins")}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#60727A] hover:text-[#172B35] rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-[#172B35]">{task.title}</h3>
            <p className="text-xs text-[#60727A] mt-1 leading-relaxed">
              {task.whyItMatters || task.description}
            </p>
          </div>

          {/* Step by step instructions */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#014D4E]">
              {isHi ? "चरण-दर-चरण कार्य चेकलिस्ट:" : "Step-by-Step Action Checklist:"}
            </div>
            {guidanceSteps.length > 0 ? (
              guidanceSteps.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#F8F3EE] rounded-xl border border-[#E6DED7] flex items-start gap-2.5 text-xs text-[#172B35]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#014D4E] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="font-medium leading-relaxed">{s}</span>
                </div>
              ))
            ) : (
              <div className="p-3 bg-[#F8F3EE] rounded-xl border border-[#E6DED7] text-xs text-[#172B35]">
                {isHi ? "इस कार्य को पूरा करें और अपने व्यवसाय विकास स्कोर को बढ़ाने के लिए पूर्ण के रूप में चिह्नित करें।" : "Complete this task and mark as done to increase your Business Growth Score."}
              </div>
            )}
          </div>

          {/* Expected Outcome */}
          <div className="p-3.5 bg-[#2E8B57]/10 rounded-xl border border-[#2E8B57]/20 flex items-center justify-between text-xs">
            <span className="font-bold text-[#2E8B57]">{isHi ? "लक्ष्य परिणाम:" : "Target Outcome:"}</span>
            <span className="font-medium text-[#172B35]">{task.expectedOutcome}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F8F3EE] p-4 border-t border-[#E6DED7] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#172B35] hover:bg-[#E6DED7] rounded-lg cursor-pointer"
          >
            {isHi ? "बंद करें" : "Close"}
          </button>

          <button
            onClick={() => {
              onToggleComplete(task.id);
              onClose();
            }}
            className={`px-5 py-2.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              task.completed
                ? "bg-[#60727A] text-white"
                : "bg-[#2E8B57] hover:bg-[#256f46] text-white"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {task.completed
                ? (isHi ? "अपूर्ण के रूप में चिह्नित करें" : "Mark as Incomplete")
                : (isHi ? "कार्य पूर्ण चिह्नित करें" : "Mark Task Completed")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
