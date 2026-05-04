import Link from "next/link";

// components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-base-300 py-20 lg:py-0 overflow-hidden">
      {/* 1. Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[100px_100px] z-0"></div>

      {/* 2. Floating Background Shapes (PC Size အတွက်) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
        <div className="animate-float-shape absolute top-32 left-20 w-16 h-16 border-2 border-primary/20 rounded-lg"></div>
        <div
          className="animate-float-shape absolute bottom-32 right-20 w-24 h-24 border-2 border-secondary/20 rounded-full"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="animate-float-shape absolute top-1/2 left-1/3 w-8 h-8 border border-primary/30 rounded-sm rotate-45"
          style={{ animationDelay: "5s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* ဘယ်ဘက်ခြမ်း - Content & Buttons */}
          <div className="flex-1 text-center lg:text-left w-full max-w-2xl mx-auto lg:mx-0">
            {/* --- Avatar & Badge Section (ဒီအပိုင်းကို အသစ်ပြင်ထားပါတယ်) --- */}
            <div
              className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 mb-8"
              style={{ animationDelay: "0.1s" }}
            >
              {/* Profile Image with Ring */}
              <div className="avatar">
                <div className="w-20 h-20 rounded-full ring-2 ring-primary ring-offset-base-300 ring-offset-4 shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-105 hover:rotate-3">
                  {/* ကိုယ်ပိုင် ဓာတ်ပုံပြောင်းချင်ရင် src နေရာမှာ '/profile.jpg' လို့ ပြောင်းထည့်ပါ 
                      (ပုံကို public folder ထဲမှာ ထည့်ထားဖို့ လိုပါမယ်) */}
                  <img src="./profile.png" alt="Aster - Community Mentor" />
                </div>
              </div>

              {/* Hello World Badge */}
              <div className="flex flex-col items-center sm:items-start">
                <span className="badge badge-primary badge-outline px-4 py-3 font-mono text-sm mb-2">
                  Hello World 👋
                </span>
                <span className="text-sm text-base-content/60 font-mono">
                  Welcome to my workspace
                </span>
              </div>
            </div>
            {/* ------------------------------------------------------------- */}

            <h1
              className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-base-content"
              style={{ animationDelay: "0.2s" }}
            >
              Building the web, <br className="hidden sm:block" />
              <span className="text-primary">one line at a time.</span>
            </h1>

            <p
              className="animate-fade-in-up text-lg md:text-xl text-base-content/70 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              style={{ animationDelay: "0.3s" }}
            >
              Hi, I'm{" "}
              <strong className="text-base-content">Aster Julian Ray</strong>. A
              Web Developer and Community Mentor. I specialize in building
              scalable applications and guiding junior students to craft clean
              code.
            </p>

            <div
              className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              style={{ animationDelay: "0.4s" }}
            >
              <Link
                href="/projects"
                className="btn btn-primary px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              >
                View Projects
              </Link>
              <button disabled className="btn btn-outline btn-secondary px-8 hover:scale-105 transition-transform">
                Download CV
              </button>
            </div>
          </div>

          {/* ညာဘက်ခြမ်း - Terminal Mockup */}
          <div
            className="animate-fade-in-up flex-1 w-full max-w-lg mx-auto"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="mockup-code bg-base-100 shadow-2xl shadow-base-100/50 border border-base-content/5 text-sm md:text-base transition-transform duration-500 hover:-translate-y-2">
              <pre data-prefix="$">
                <code>npm init next-app@latest portfolio</code>
              </pre>
              <pre data-prefix=">" className="text-warning">
                <code>installing dependencies...</code>
              </pre>
              <pre data-prefix=">" className="text-success">
                <code>✓ Created Aster's Portfolio</code>
              </pre>
              <pre data-prefix="$">
                <code>cd portfolio</code>
              </pre>
              <pre data-prefix="$">
                <code>npm run dev</code>
              </pre>
              <pre data-prefix=">" className="text-info">
                <code>ready - started server on 0.0.0.0:3000</code>
              </pre>
              <pre data-prefix=">" className="text-primary mt-2">
                <code>// Skills matched:</code>
              </pre>
              <pre data-prefix=">">
                <code>[ 'Next.js', 'React', 'Express', 'TypeScript' ]</code>
              </pre>
              <pre data-prefix=">">
                <code>[ 'SQL', 'Appwrite' ]</code>
              </pre>
              <pre data-prefix=">" className="animate-pulse">
                <code>_</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
