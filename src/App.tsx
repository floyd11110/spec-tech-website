export default function SpecTechWebsite() {
  const features = [
    {
      title: "Electronics Projects",
      desc: "Circuit builds, PCB making, embedded systems, and practical prototype work.",
    },
    {
      title: "AI + Robotics",
      desc: "Experiments in computer vision, sensing, automation, and smart systems.",
    },
    {
      title: "Maker Tutorials",
      desc: "Step-by-step guides, testing logs, and real-world engineering problem solving.",
    },
  ];

  const projects = [
    {
      name: "DIY PCB Fabrication",
      tag: "Fabrication",
      text: "From layout printing to UV exposure and chemical development using hands-on methods.",
      link: "https://spec-tech-website.vercel.app",
    },
    {
      name: "ESP32 Smart Systems",
      tag: "Embedded",
      text: "Wireless control, sensors, displays, and real embedded prototypes for practical use.",
      link: "https://github.com/floyd11110/spec-tech-website",
    },
    {
      name: "AI Vision Projects",
      tag: "AI",
      text: "Object detection, classification, and intelligent automation for maker-grade systems.",
      link: "https://youtube.com",
    },
    {
      name: "Robotics Builds",
      tag: "Robotics",
      text: "Motor control, navigation, perception, and prototype mechanics in one place.",
      link: "https://youtube.com",
    },
  ];

  const gallery = [
    {
      title: "PCB Fabrication Process",
      image:
        "https://images.unsplash.com/photo-1563770660941-10a63607692e?auto=format&fit=crop&w=1200&q=80",
      desc: "UV exposure, developing, etching, drilling, and final PCB finishing workflows.",
    },
    {
      title: "Embedded Systems Bench",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      desc: "ESP32, sensors, wiring, communication modules, and embedded prototype testing.",
    },
    {
      title: "AI + Vision Prototypes",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
      desc: "Computer vision experiments, smart detection systems, and AI-powered devices.",
    },
  ];

  const socials = [
    { label: "Facebook Page", value: "Spec-Tech" },
    { label: "YouTube", value: "@SpecTech" },
    { label: "TikTok", value: "@spec.tech" },
    { label: "Email", value: "spec-tech@yourmail.com" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(168,85,247,0.15),transparent_25%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
                Engineering • AI • Robotics • Maker Projects
              </div>
              <h1 className="text-5xl font-black tracking-tight md:text-7xl">
                SPEC-TECH
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">
                A technology page focused on electronics, AI, robotics, and
                prototype-building. Real builds. Real testing. Real engineering.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
                >
                  Explore Projects
                </a>
                <a
                  href="#contact"
                  className="rounded-2xl border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/5"
                >
                  Contact Spec-Tech
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
                <div className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                  Focus
                </div>
                <div className="mt-4 text-3xl font-bold">Prototype Maker</div>
                <p className="mt-3 text-slate-300">
                  Building systems that combine hardware, code, sensors, and
                  experimentation.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
                <div className="text-sm uppercase tracking-[0.2em] text-fuchsia-300">
                  Specialty
                </div>
                <div className="mt-4 text-3xl font-bold">Spec-Tech Lab</div>
                <p className="mt-3 text-slate-300">
                  Embedded systems, custom PCB workflows, AI vision, and
                  robotics development.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur md:col-span-2">
                <div className="text-sm uppercase tracking-[0.2em] text-emerald-300">
                  Mission
                </div>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  To turn ideas into practical technology through engineering,
                  experimentation, and hands-on maker work that inspires
                  learning and innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold md:text-4xl">
            What Spec-Tech Covers
          </h2>
          <p className="mt-4 text-slate-400">
            A clean hub for your audience to understand what your page builds,
            teaches, and explores.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-xl"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="projects"
        className="border-y border-white/10 bg-white/[0.03]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Featured Project Categories
              </h2>
              <p className="mt-4 max-w-2xl text-slate-400">
                Showcase your strongest content pillars so visitors quickly
                understand your brand.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300">
              Built for a modern maker brand
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-xl transition hover:-translate-y-1 hover:border-cyan-400/30"
              >
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-slate-300">
                  {project.tag}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{project.name}</h3>
                <p className="mt-3 leading-7 text-slate-400">{project.text}</p>
                <div className="mt-5 text-sm font-semibold text-cyan-300">
                  Open project →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold md:text-4xl">Project Gallery</h2>
          <p className="mt-4 text-slate-400">
            A visual section for showcasing electronics, robotics, AI, and
            fabrication work.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {gallery.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-xl">
            <h2 className="text-3xl font-bold">Why Follow Spec-Tech</h2>
            <ul className="mt-6 space-y-4 text-slate-300">
              <li>
                • Real engineering builds instead of generic reposted content
              </li>
              <li>• Practical electronics and embedded systems knowledge</li>
              <li>
                • AI and robotics projects explained in maker-friendly form
              </li>
              <li>• Prototype workflows from concept to testing</li>
            </ul>
          </div>

          <div
            id="contact"
            className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-xl"
          >
            <h2 className="text-3xl font-bold">Connect With Spec-Tech</h2>
            <div className="mt-6 space-y-4">
              {socials.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-medium text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Spec-Tech. All rights reserved.</div>
          <div>Built for electronics, AI, robotics, and maker innovation.</div>
        </div>
      </footer>
    </div>
  );
}
