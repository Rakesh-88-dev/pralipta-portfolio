import {
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

function ContactInfo({ profile, settings }) {
  const email = profile?.email || settings?.contactEmail || "";
  const phone = profile?.phone || settings?.contactPhone || "";
  const location = profile?.location || "";

  const linkedin =
    profile?.linkedinUrl || settings?.socialLinks?.linkedin || "";

  const github =
    profile?.githubUrl || settings?.socialLinks?.github || "";

  const contactItems = [
    email && {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: Mail,
    },
    phone && {
      label: "Phone",
      value: phone,
      href: `tel:${phone}`,
      icon: Phone,
    },
    location && {
      label: "Location",
      value: location,
      icon: MapPin,
    },
  ].filter(Boolean);

  const socialItems = [
    linkedin && {
      label: "LinkedIn",
      href: linkedin,
      icon: ExternalLink,
    },
    github && {
      label: "GitHub",
      href: github,
      icon: GitBranch,
    },
  ].filter(Boolean);

  return (
    <div className="flex flex-col">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
          Get in Touch
        </p>

        <h3 className="mt-6 max-w-md font-[var(--font-display)] text-4xl font-medium leading-tight tracking-[-0.035em] text-white md:text-5xl">
          Start a
          <br />
          conversation.
        </h3>

        <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
          Whether you have an opportunity, collaboration, or simply want to
          connect professionally, feel free to reach out.
        </p>
      </div>

      {contactItems.length > 0 && (
        <div className="mt-12 space-y-6">
          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 text-[var(--accent)]">
                  <Icon size={16} strokeWidth={1.4} />
                </span>

                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
                    {item.label}
                  </p>

                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="mt-1 block text-sm text-white/70 transition-colors duration-300 hover:text-white"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-white/70">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {socialItems.length > 0 && (
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
            Connect
          </p>

          <div className="flex flex-wrap gap-3">
            {socialItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/60 transition-all duration-300 hover:border-white/40 hover:text-white"
                >
                  <Icon size={16} strokeWidth={1.4} />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactInfo;