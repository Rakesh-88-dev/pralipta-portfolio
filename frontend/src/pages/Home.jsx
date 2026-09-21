import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Education from "../components/education/Education";
import Experience from "../components/experience/Experience";
import Projects from "../components/projects/Projects";
import Skills from "../components/skills/Skills";
import Certifications from "../components/certifications/Certifications";
import Contact from "../components/contact/Contact";
import Footer from "../components/footer/Footer";

import usePortfolio from "../hooks/usePortfolio";

function Home() {
  const { portfolio, loading, error } = usePortfolio();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--cream)]">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Loading portfolio...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--cream)] px-6">
        <div className="text-center">
          <p className="font-[var(--font-display)] text-3xl text-[var(--text-dark)]">
            Something went wrong.
          </p>

          <p className="mt-3 text-sm text-[var(--text-body)]">
            {error}
          </p>
        </div>
      </div>
    );
  }

  const profile = portfolio?.profile || {};
  const education = portfolio?.education || [];
  const experience = portfolio?.experience || [];
  const projects = portfolio?.projects || [];
  const skills = portfolio?.skills || [];
  const certifications = portfolio?.certifications || [];
  const settings = portfolio?.settings || {};

  return (
    <div
      id="home"
      className="min-h-screen bg-[var(--cream)]"
      data-portfolio-loaded={Boolean(portfolio)}
    >
      <Navbar />

      <main>
        <Hero profile={profile} />

        <About portfolio={portfolio} />

        <Education education={education} />

        <Experience experience={experience} />

        <Projects projects={projects} />

        <Skills skills={skills} />

        <Certifications certifications={certifications} />

        <Contact
          profile={profile}
          settings={settings}
        />
      </main>

      <Footer
        profile={profile}
        settings={settings}
      />
    </div>
  );
}

export default Home;