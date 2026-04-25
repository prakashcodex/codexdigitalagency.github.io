import { Check, X } from "lucide-react";

const comparisonData = [
  {
    feature: "Syllabus",
    traditional: "Outdated, Theory-heavy",
    codex: "Future-proof, Skill-focused",
  },
  {
    feature: "Learning Method",
    traditional: "Passive, Rote Learning",
    codex: "100% LIVE Interactive Classes",
  },
  {
    feature: "Practical Skills",
    traditional: "Zero to Minimal",
    codex: "Hands-on Projects & AI Tools",
  },
  {
    feature: "Income Generation",
    traditional: "No Guidance",
    codex: "Income System Explained",
  },
  {
    feature: "Cost",
    traditional: "₹5-15 Lakhs Spent",
    codex: "₹12,000 (1-Year Program)",
  },
  {
    feature: "ROI",
    traditional: "Uncertain / Low",
    codex: "High / Skill-based Earnings",
  },
];

export default function Comparison() {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Traditional School vs Codex Digital Academy
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See why thousands of parents and students are choosing a different path for their future.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-6 text-lg font-bold text-gray-900 border-b border-gray-200">Feature</th>
                <th className="p-6 text-lg font-bold text-red-600 border-b border-gray-200 bg-red-50/50">Traditional System</th>
                <th className="p-6 text-lg font-bold text-green-600 border-b border-gray-200 bg-green-50/50">Codex Academy</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={row.feature} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}>
                  <td className="p-6 font-semibold text-gray-700 border-b border-gray-100">{row.feature}</td>
                  <td className="p-6 text-gray-600 border-b border-gray-100 flex items-center gap-2">
                    <X className="w-5 h-5 text-red-500 shrink-0" />
                    {row.traditional}
                  </td>
                  <td className="p-6 text-gray-900 font-medium border-b border-gray-100 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    {row.codex}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-12 p-8 bg-orange-600 rounded-3xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">👨‍👩‍👧 Dear Parents — This is for your child's future.</h3>
          <p className="text-orange-100 text-lg mb-6 max-w-3xl mx-auto">
            Don't let your child waste 10-15 years only to ask "What Now?". Invest in skills that matter in the real world.
          </p>
          <button className="bg-white text-orange-600 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors">
            Register for Batch #8 — Only 7 Seats Left!
          </button>
        </div>
      </div>
    </section>
  );
}
