// components/SkillCommunity.tsx

export default function SkillCommunity() {
  const skills = [
    "Next.js",
    "React",
    "TypeScript",
    "Express.js",
    "Appwrite",
    "Tailwind",
    "Docker",
    "PostgreSQL",
  ];

  return (
    <section className="py-20 bg-base-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Tech Stack - Marquee style feel */}
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-bold mb-8 font-mono text-primary text-center lg:text-left">
              // Technologies I use and Still Learning
            </h2>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="badge badge-lg badge-outline py-6 px-8 hover:bg-primary hover:text-primary-content transition-colors cursor-default border-base-content/20"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
          {/* Community Stats */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/+1Jq9vv2dn542ODI1"
          >
            <div className="flex-1 w-full">
              <div className="stats stats-vertical lg:stats-horizontal shadow-2xl bg-base-100 w-full border border-primary/10">
                <div className="stat">
                  <div className="stat-title">Community Name</div>
                  <div className="stat-value text-primary text-2xl">
                    404: Sleep Not Found
                  </div>
                  <div className="stat-desc">Student Community in Myanmar</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Role</div>
                  <div className="stat-value text-secondary text-2xl">
                    Mentor
                  </div>
                  <div className="stat-desc">Helping juniors to code</div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
