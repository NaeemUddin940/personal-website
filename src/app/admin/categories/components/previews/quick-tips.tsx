import { HiOutlineSparkles } from "react-icons/hi";

export default function QuickTips() {
  return (
    <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5">
      <h3 className="text-lg font-semibold text-amber-800 mb-3 flex items-center gap-1.5">
        <HiOutlineSparkles className="w-4 h-4" /> Quick Tips
      </h3>
      <ul className="space-y-2 text-xs text-amber-700">
        {[
          "Use descriptive names for better SEO",
          "Keep slugs short and keyword-rich",
          "Meta titles should be under 60 characters",
          "Meta descriptions under 160 characters",
          "Add high-quality images for engagement",
          "Mark key attributes as required",
        ].map((tip, i) => (
          <li key={i} className="flex gap-1.5">
            <span className="flex gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              {tip}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
