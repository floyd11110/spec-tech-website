export default function App() {
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

  return (
    <div className="site">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge">
              Engineering • AI • Robotics • Maker Projects
            </div>
            <h1>SPEC-TECH</h1>
            <p>
              A technology page focused on electronics, AI, robotics, and
              prototype-building. Real builds. Real testing. Real engineering.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                Explore Projects
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Spec-Tech
              </a>
            </div>
          </div>

          <div className="hero-cards">
            <div className="card glass">
              <span className="label cyan">Focus</span>
              <h3>Prototype Maker</h3>
              <p>
                Building systems that combine hardware, code, sensors, and
                experimentation.
              </p>
            </div>

            <div className="card glass">
              <span className="label pink">Specialty</span>
              <h3>Spec-Tech Lab</h3>
              <p>
                Embedded systems, custom PCB workflows, AI vision, and robotics
                development.
              </p>
            </div>

            <div className="card glass wide">
              <span className="label green">Mission</span>
              <p>
                To turn ideas into practical technology through engineering,
                experimentation, and hands-on maker work that inspires learning
                and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>What Spec-Tech Covers</h2>
          <p>
            A place where engineering ideas become real projects—electronics
            builds, robotics systems, and AI experiments.
          </p>
        </div>

        <div className="grid three">
          {features.map((item) => (
            <div className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt" id="projects">
        <div className="section-head">
          <h2>Featured Project Categories</h2>
          <p>
            Explore the core technologies behind Spec-Tech, including
            electronics projects, robotics builds, AI experiments, and custom
            hardware prototypes.
          </p>
        </div>

        <div className="grid four">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="card project-link"
            >
              <span className="tag">{project.tag}</span>
              <h3>{project.name}</h3>
              <p>{project.text}</p>
              <div className="open-link">Open project →</div>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Project Gallery</h2>
          <p>
            A visual section for showcasing electronics, robotics, AI, and
            fabrication work.
          </p>
        </div>

        <div className="grid three">
          {gallery.map((item) => (
            <div key={item.title} className="gallery-card">
              <img
                src={item.image}
                alt={item.title}
                className="gallery-image"
              />
              <div className="gallery-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid two">
          <div className="card">
            <h2>Why Follow Spec-Tech</h2>
            <ul className="list">
              <li>
                Real engineering builds instead of reposted generic content
              </li>
              <li>Practical electronics and embedded systems knowledge</li>
              <li>AI and robotics projects explained in maker-friendly form</li>
              <li>Prototype workflows from concept to testing</li>
            </ul>
          </div>

          <div className="card" id="contact">
            <h2>Connect With Spec-Tech</h2>
            <div className="contact-list">
              <div className="contact-row">
                <span>Facebook Page</span>
                <strong>Spec-Tech</strong>
              </div>
              <div className="contact-row">
                <span>YouTube</span>
                <strong>@Spec-Tech</strong>
              </div>
              <div className="contact-row">
                <span>TikTok</span>
                <strong>@wait</strong>
              </div>
              <div className="contact-row">
                <span>Email</span>
                <strong>floydholmberg3@gmail.com</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>© 2026 Spec-Tech. All rights reserved.</div>
        <div>Built for electronics, AI, robotics, and maker innovation.</div>
      </footer>
    </div>
  );
}
