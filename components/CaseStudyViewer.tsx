// app/projects/[slug]/CaseStudyViewer.tsx
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  contentEn: string;
  contentMm: string;
}

export default function CaseStudyViewer({ contentEn, contentMm }: Props) {
  // Default ကို English (en) အဖြစ် ထားပါတယ်
  const [lang, setLang] = useState<"en" | "mm">("en");

  // လက်ရှိ ရွေးထားတဲ့ ဘာသာစကားပေါ် မူတည်ပြီး content ကို ဆုံးဖြတ်မယ်
  const currentContent = lang === "en" ? contentEn : contentMm;

  return (
    <div>
      {/* Smooth DaisyUI Tabs Switcher */}
      <div className="flex justify-end mb-8">
        <div
          role="tablist"
          className="tabs tabs-boxed bg-base-200/50 p-1 border border-base-content/5 rounded-xl shadow-sm inline-flex"
        >
          <button
            role="tab"
            onClick={() => setLang("en")}
            className={`tab font-bold text-xs h-8 px-5 rounded-lg transition-all duration-300 ${lang === "en" ? "tab-active bg-primary text-primary-content! shadow-md" : "text-base-content/40 hover:text-base-content"}`}
          >
            EN
          </button>
          <button
            role="tab"
            onClick={() => setLang("mm")}
            className={`tab font-bold text-xs h-8 px-5 rounded-lg transition-all duration-300 ${lang === "mm" ? "tab-active bg-primary text-primary-content! shadow-md" : "text-base-content/40 hover:text-base-content"}`}
          >
            MM
          </button>
        </div>
      </div>

      {/* Markdown Content */}
      <article
        className="prose prose-invert prose-primary max-w-none 
        prose-headings:font-bold prose-headings:text-base-content prose-headings:tracking-tight
        prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mb-8
        prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-base-content/10
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-base-content/75 prose-p:leading-relaxed prose-p:mb-6
        prose-li:text-base-content/75 prose-li:my-1
        prose-img:rounded-3xl prose-img:border prose-img:border-base-content/5 prose-img:shadow-xl prose-img:my-10
        prose-a:text-primary hover:prose-a:text-primary-focus prose-a:transition-colors
        prose-strong:text-base-content prose-strong:font-bold
        prose-code:bg-base-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-primary
        prose-pre:bg-base-200 prose-pre:border prose-pre:border-base-content/5 prose-pre:rounded-xl animate-fade-in-up"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {currentContent || "> _Content is currently unavailable._"}
        </ReactMarkdown>
      </article>
    </div>
  );
}
