import SectionLabel from "../common/SectionLabel";
import SectionNumber from "../common/SectionNumber";
import SectionHeading from "../common/SectionHeading";
import AboutContent from "./AboutContent";
import Qualities from "./Qualities";

function About({ portfolio }) {
  const profile = portfolio?.profile || {};

  return (
    <section id="about" className="section section-white">
      <div className="container-main">
        <div className="flex items-start justify-between gap-8">
          <div>
            <SectionNumber number="02" />
            <SectionLabel label="About" />
          </div>

          <span className="hidden text-right text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:block">
            Profile / Introduction
          </span>
        </div>

        <div className="mt-10 md:mt-14">
          <SectionHeading
            eyebrow="Who I Am"
            title={
              <>
                PEOPLE,
                <br />
                PROCESS &
                <br />
                <span className="text-[var(--navy)]">PURPOSE.</span>
              </>
            }
          />
        </div>

        <div className="mt-16 md:mt-24">
          <AboutContent profile={profile} />
        </div>

        <div className="mt-16 md:mt-24">
          <Qualities profile={profile} />
        </div>
      </div>
    </section>
  );
}

export default About;