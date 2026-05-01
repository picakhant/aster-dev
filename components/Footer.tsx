// components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-base-100 border-t border-base-content/5 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8 text-center">
        {/* Contact Section */}
        <div className="max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-6">Let's work together</h2>
          <p className="text-base-content/70 mb-8">
            Got a project in mind or just want to discuss coding? My inbox is
            always open.
          </p>
          <a
            href="mailto:picakhant@gmail.com"
            className="btn btn-primary btn-wide shadow-lg shadow-primary/20"
          >
            Say Hello
          </a>
        </div>

        <div className="divider opacity-5"></div>

        {/* Real Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-10">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-bold text-primary">Aster.dev</span>
            <p className="text-sm text-base-content/50 mt-2">
              © 2026 - Building with ❤️ and AI
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            {/* GitHub Link */}
            <a
              href="https://github.com/picakhant"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-base-content/70 hover:text-primary font-mono text-sm"
            >
              GitHub
            </a>

            {/* LinkedIn ကို ဖျက်လိုက်ပါပြီ */}

            {/* Telegram Link - Username @aster_julian_ray အတွက် */}
            <a
              href="https://t.me/aster_julian_ray"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-base-content/70 hover:text-primary font-mono text-sm"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
