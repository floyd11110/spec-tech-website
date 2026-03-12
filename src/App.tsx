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
    },
    {
      name: "ESP32 Smart Systems",
      tag: "Embedded",
      text: "Wireless control, sensors, displays, and real embedded prototypes for practical use.",
    },
    {
      name: "AI Vision Projects",
      tag: "AI",
      text: "Object detection, classification, and intelligent automation for maker-grade systems.",
    },
    {
      name: "Robotics Builds",
      tag: "Robotics",
      text: "Motor control, navigation, perception, and prototype mechanics in one place.",
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
            <div className="card" key={project.name}>
              <span className="tag">{project.tag}</span>
              <h3>{project.name}</h3>
              <p>{project.text}</p>
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
                <strong>floydholmberg3@gmai.com</strong>
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
