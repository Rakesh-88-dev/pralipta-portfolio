import { useEffect } from "react";

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

  const settings = portfolio?.settings || {};

  useEffect(() => {
    if (!portfolio) {
      return;
    }

    const siteTitle =
      settings.siteTitle || "Pralipta Panda | MBA Portfolio";

    const siteDescription =
      settings.siteDescription ||
      "Pralipta Panda — MBA Portfolio | Operations & HR";

    document.title = siteTitle;

    let descriptionMeta = document.querySelector(
      'meta[name="description"]'
    );

    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.name = "description";
      document.head.appendChild(descriptionMeta);
    }

    descriptionMeta.setAttribute("content", siteDescription);

    const faviconUrl = settings.favicon || "/favicon.png";

    let favicon = document.querySelector('link[rel="icon"]');

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }

    favicon.type = "image/png";
    favicon.href = faviconUrl;

    const primaryColor = settings.primaryColor || "#123B68";
    const accentColor = settings.accentColor || "#7EA8D8";

    document.documentElement.style.setProperty(
      "--navy",
      primaryColor
    );

    document.documentElement.style.setProperty(
      "--accent",
      accentColor
    );

    document.documentElement.style.setProperty(
      "--accent-light",
      createTint(accentColor, 0.82)
    );

    document.documentElement.style.setProperty(
      "--navy-dark",
      createShade(primaryColor, 0.28)
    );

    document.documentElement.style.setProperty(
      "--navy-soft",
      createShade(primaryColor, 0.08)
    );
  }, [
    portfolio,
    settings.siteTitle,
    settings.siteDescription,
    settings.favicon,
    settings.primaryColor,
    settings.accentColor,
  ]);

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

  if (settings.maintenanceMode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--cream)] px-6">
        <div className="max-w-xl text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--navy)]">
            Portfolio
          </p>

          <h1 className="mt-6 font-[var(--font-display)] text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-[var(--text-dark)] md:text-7xl">
            We'll be
            <br />
            back soon.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[var(--text-body)]">
            This portfolio is currently being updated. Please check back
            shortly.
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

  return (
    <div
      id="home"
      className="min-h-screen bg-[var(--cream)]"
      data-portfolio-loaded={Boolean(portfolio)}
    >
      <Navbar
        profile={profile}
        settings={settings}
      />

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

function hexToRgb(hex) {
  const value = hex.replace("#", "").trim();

  if (value.length !== 6) {
    return null;
  }

  const number = Number.parseInt(value, 16);

  if (Number.isNaN(number)) {
    return null;
  }

  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255,
  };
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b]
    .map((value) =>
      Math.max(0, Math.min(255, Math.round(value)))
        .toString(16)
        .padStart(2, "0")
    )
    .join("")}`;
}

function createShade(hex, amount) {
  const rgb = hexToRgb(hex);

  if (!rgb) {
    return "#0D2945";
  }

  return rgbToHex(
    rgb.r * (1 - amount),
    rgb.g * (1 - amount),
    rgb.b * (1 - amount)
  );
}

function createTint(hex, amount) {
  const rgb = hexToRgb(hex);

  if (!rgb) {
    return "#DCE9F5";
  }

  return rgbToHex(
    rgb.r + (255 - rgb.r) * amount,
    rgb.g + (255 - rgb.g) * amount,
    rgb.b + (255 - rgb.b) * amount
  );
}

export default Home;