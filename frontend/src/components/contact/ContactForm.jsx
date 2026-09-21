import { useState } from "react";
import {
  ArrowRight,
  Check,
  CircleUserRound,
  FileText,
  Info,
  Loader2,
  Mail,
  MessageCircle,
} from "lucide-react";

import { sendMessage } from "../../services/messageService";

const initialFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactForm({ onCancel }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    setStatus({
      type: "",
      message: "",
    });

    try {
      const response = await sendMessage(formData);

      setStatus({
        type: "success",
        message:
          response?.message ||
          "Your message has been sent successfully.",
      });

      setFormData(initialFormData);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    setFormData(initialFormData);

    setStatus({
      type: "",
      message: "",
    });
  };

  const inputClass = `
    w-full rounded-xl
    border border-[var(--border)]
    bg-white/45
    text-[var(--text-dark)]
    outline-none
    transition-all duration-300
    placeholder:text-[var(--text-muted)]/45
    hover:border-[var(--navy)]/25
    hover:bg-white/70
    focus:border-[var(--navy)]
    focus:bg-white
    focus:shadow-[0_0_0_3px_rgba(18,59,104,0.055)]
    disabled:cursor-not-allowed
    disabled:opacity-50
  `;

  const labelClass = `
    mb-3 flex items-center gap-3
    text-[11px] font-semibold uppercase
    tracking-[0.12em]
    text-[var(--text-dark)]
    sm:text-xs
  `;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="border-b border-[var(--border)] pb-8 sm:pb-10 md:pb-11">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center lg:gap-14">
          {/* Heading */}
          <div>
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--text-muted)] sm:text-[10px]">
                Contact
              </span>

              <span className="h-px w-12 bg-[var(--border)] sm:w-20" />
            </div>

            <h2 className="font-[var(--font-display)] text-[clamp(3rem,6vw,5.7rem)] font-medium leading-[0.86] tracking-[-0.06em] text-[var(--navy-dark)]">
              Start a
              <br />
              <span className="text-[var(--navy)]">
                Conversation.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--text-body)] sm:text-base sm:leading-7">
              Tell me a little about what&apos;s on your mind.
            </p>
          </div>

          {/* Quote */}
          <div className="hidden border-l border-[var(--border)] pl-7 lg:block">
            <p className="max-w-[220px] font-[var(--font-display)] text-base italic leading-6 text-[var(--text-muted)]">
              “Great conversations lead to great opportunities.”
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          FORM CONTENT
          IMPORTANT: same width hierarchy as header
      ====================================================== */}
      <div className="mt-8 w-full sm:mt-9 md:mt-10">
        {/* Name + Email */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-7 lg:gap-9">
          {/* Name */}
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-light)] text-[var(--navy)]">
                <CircleUserRound size={17} strokeWidth={1.5} />
              </span>

              <span>
                Your Name{" "}
                <span className="text-[var(--navy)]">*</span>
              </span>
            </label>

            <input
              id="contact-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              autoComplete="name"
              required
              disabled={isSubmitting}
              className={`${inputClass} h-14 px-4 text-sm sm:h-16 sm:px-5 sm:text-[15px]`}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-light)] text-[var(--navy)]">
                <Mail size={17} strokeWidth={1.5} />
              </span>

              <span>
                Email Address{" "}
                <span className="text-[var(--navy)]">*</span>
              </span>
            </label>

            <input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
              disabled={isSubmitting}
              className={`${inputClass} h-14 px-4 text-sm sm:h-16 sm:px-5 sm:text-[15px]`}
            />
          </div>
        </div>

        {/* Subject */}
        <div className="mt-7 sm:mt-8">
          <label htmlFor="contact-subject" className={labelClass}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-light)] text-[var(--navy)]">
              <MessageCircle size={17} strokeWidth={1.5} />
            </span>

            <span>Subject</span>
          </label>

          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What would you like to discuss?"
            disabled={isSubmitting}
            className={`${inputClass} h-14 px-4 text-sm sm:h-16 sm:px-5 sm:text-[15px]`}
          />
        </div>

        {/* Message */}
        <div className="mt-7 sm:mt-8">
          <label htmlFor="contact-message" className={labelClass}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-light)] text-[var(--navy)]">
              <FileText size={17} strokeWidth={1.5} />
            </span>

            <span>
              Your Message{" "}
              <span className="text-[var(--navy)]">*</span>
            </span>
          </label>

          <div className="relative">
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={6}
              maxLength={2000}
              required
              disabled={isSubmitting}
              className={`${inputClass} min-h-[185px] resize-y px-4 py-4 pb-11 text-sm leading-7 sm:min-h-[205px] sm:px-5 sm:py-5 sm:pb-11 sm:text-[15px]`}
            />

            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between sm:left-5 sm:right-5">
              <span className="text-[8px] uppercase tracking-[0.15em] text-[var(--text-muted)]/45">
                Write your message
              </span>

              <span className="text-[10px] font-medium tabular-nums text-[var(--text-muted)]">
                {formData.message.length}/2000
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <div className="mt-8 border-t border-[var(--border)] pt-6 sm:mt-9 md:mt-10 md:pt-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Status */}
          <div className="flex min-h-10 items-center gap-3">
            {status.type === "success" ? (
              <>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] text-white">
                  <Check size={14} strokeWidth={2} />
                </span>

                <p className="max-w-xs text-xs leading-5 text-[var(--text-body)]">
                  {status.message}
                </p>
              </>
            ) : status.type === "error" ? (
              <p className="max-w-xs text-xs leading-5 text-red-600">
                {status.message}
              </p>
            ) : (
              <>
                <Info
                  size={21}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--text-body)]"
                />

                <p className="text-xs leading-5 text-[var(--text-body)]">
                  I&apos;ll get back to you as soon as possible.
                </p>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="grid w-full grid-cols-2 gap-3 sm:w-auto">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="h-12 rounded-xl border border-[var(--border)] px-6 text-xs font-semibold text-[var(--text-dark)] transition-all duration-300 hover:border-[var(--navy)] hover:bg-[var(--cream-dark)] disabled:cursor-not-allowed disabled:opacity-50 sm:h-13 sm:px-7"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex h-12 items-center justify-center gap-4 rounded-xl bg-[var(--navy-dark)] px-6 text-xs font-semibold text-white transition-all duration-300 hover:bg-[var(--navy)] disabled:cursor-not-allowed disabled:opacity-60 sm:h-13 sm:px-7"
            >
              <span>
                {isSubmitting ? "Sending..." : "Send Message"}
              </span>

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-[var(--navy-dark)]">
                {isSubmitting ? (
                  <Loader2
                    size={14}
                    strokeWidth={1.5}
                    className="animate-spin"
                  />
                ) : (
                  <ArrowRight
                    size={15}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ContactForm;