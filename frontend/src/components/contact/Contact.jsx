import { useEffect, useState } from "react";
import { X } from "lucide-react";

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

function Contact({ profile, settings }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  return (
    <>
      {/* =====================================================
          CONTACT SECTION
      ====================================================== */}
      <section
        id="contact"
        className="section section-dark overflow-hidden"
      >
        <div className="container-main">
          {/* Section Header */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.3fr_1.7fr] lg:gap-20">
            {/* Section Meta */}
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[var(--accent)]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--accent)]">
                  Contact
                </span>
              </div>

              <p className="mt-6 text-[9px] font-medium uppercase tracking-[0.2em] text-white/30">
                08 / 08
              </p>
            </div>

            {/* Main Content */}
            <div>
              <h2 className="max-w-5xl font-[var(--font-display)] text-[clamp(4rem,8vw,8rem)] font-medium leading-[0.84] tracking-[-0.06em] text-white">
                LET&apos;S
                <br />
                <span className="text-[var(--accent)]">
                  CONNECT.
                </span>
              </h2>

              <p className="mt-10 max-w-xl text-base leading-7 text-white/55 md:mt-12 md:text-lg md:leading-8">
                Have an opportunity, project, or professional conversation in
                mind? I&apos;d be happy to hear from you.
              </p>

              {/* CTA */}
              <div className="mt-10 md:mt-12">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center gap-5 border-b border-white/25 pb-4 text-xs font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-white"
                >
                  <span>Start a Conversation</span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--navy-dark)]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="mt-24 border-t border-white/10 pt-10 md:mt-32 md:pt-12">
            <ContactInfo
              profile={profile}
              settings={settings}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT MODAL
      ====================================================== */}
      {isModalOpen && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-[var(--navy-dark)]/75
            p-0
            backdrop-blur-md
            sm:p-4
            md:p-8
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          {/* =================================================
              MODAL
          ================================================== */}
          <div
            className="
              relative flex w-full flex-col overflow-hidden
              bg-[var(--cream)]
              shadow-[0_30px_100px_rgba(0,0,0,0.35)]

              h-full
              max-h-full
              rounded-none

              sm:h-auto
              sm:max-h-[94vh]
              sm:max-w-3xl
              sm:rounded-2xl

              lg:max-w-6xl
            "
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close contact form"
              className="
                absolute right-4 top-4 z-20
                flex h-10 w-10 items-center justify-center
                rounded-full
                border border-[var(--border)]
                bg-[var(--cream)]
                text-[var(--navy-dark)]
                transition-all duration-300
                hover:border-[var(--navy)]
                hover:bg-[var(--navy)]
                hover:text-white

                sm:right-5 sm:top-5
                md:right-7 md:top-7
              "
            >
              <X
                size={17}
                strokeWidth={1.4}
              />
            </button>

            {/* =================================================
                SCROLLABLE CONTENT
            ================================================== */}
            <div
              className="
                flex-1 overflow-y-auto
                px-5 py-7

                sm:px-7 sm:py-8
                md:px-10 md:py-10
                lg:px-14 lg:py-12

                [scrollbar-width:thin]
              "
            >
              <ContactForm
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contact;