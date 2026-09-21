import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(formData.email, formData.password);

      toast.success("Welcome back.");

      navigate("/dashboard", { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to sign in. Please check your credentials.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#172033]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — Brand panel */}
        <section className="relative hidden overflow-hidden bg-[#123B68] lg:flex">
          {/* Decorative elements */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full border border-white/10" />

          <div className="absolute right-20 top-24 h-2 w-2 rounded-full bg-[#7EA8D8]" />

          <div className="absolute bottom-28 left-24 h-1.5 w-1.5 rounded-full bg-white/40" />

          <div className="relative z-10 flex w-full flex-col justify-between p-14 xl:p-20">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm">
                  <span className="font-serif text-xl text-white">
                    P
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold tracking-wide text-white">
                    PRALIPTA
                  </p>

                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                    Portfolio
                  </p>
                </div>
              </div>
            </div>

            {/* Main message */}
            <div className="max-w-xl">
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-[#AFC9E4]">
                Portfolio Administration
              </p>

              <h1 className="font-serif text-5xl leading-[1.08] text-white xl:text-6xl">
                Build a profile that
                <span className="block text-[#AFC9E4]">
                  tells your story.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-[15px] leading-7 text-white/65">
                Manage education, experience, projects, skills and
                professional achievements from one simple workspace.
              </p>

              <div className="mt-10 flex items-center gap-3">
                <div className="h-px w-12 bg-[#7EA8D8]" />

                <span className="text-xs tracking-wide text-white/45">
                  Professional • Simple • Personal
                </span>
              </div>
            </div>

            {/* Footer */}
            <p className="text-xs text-white/35">
              © {new Date().getFullYear()} Pralipta Panda
            </p>
          </div>
        </section>

        {/* Right — Login */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <div className="mb-12 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123B68]">
                  <span className="font-serif text-xl text-white">
                    P
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold tracking-wide text-[#123B68]">
                    PRALIPTA
                  </p>

                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A98AA]">
                    Portfolio
                  </p>
                </div>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-9">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1F8] text-[#123B68]">
                <LockKeyhole size={19} strokeWidth={1.8} />
              </div>

              <p className="mb-2 text-sm font-medium text-[#7EA8D8]">
                Welcome back
              </p>

              <h2 className="font-serif text-4xl leading-tight text-[#172033]">
                Sign in to your
                <span className="block">workspace.</span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#526174]">
                Manage your professional portfolio from one place.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2.5 block text-sm font-medium text-[#172033]"
                >
                  Email address
                </label>

                <div className="group relative">
                  <Mail
                    size={18}
                    strokeWidth={1.7}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A0B0] transition group-focus-within:text-[#123B68]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-xl border border-[#E3EAF2] bg-white pl-11 pr-4 text-sm text-[#172033] outline-none transition-all placeholder:text-[#A7B0BC] hover:border-[#C9D5E2] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-[#172033]"
                  >
                    Password
                  </label>
                </div>

                <div className="group relative">
                  <LockKeyhole
                    size={18}
                    strokeWidth={1.7}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A0B0] transition group-focus-within:text-[#123B68]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-[#E3EAF2] bg-white pl-11 pr-12 text-sm text-[#172033] outline-none transition-all placeholder:text-[#A7B0BC] hover:border-[#C9D5E2] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A0B0] transition hover:text-[#123B68]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} strokeWidth={1.7} />
                    ) : (
                      <Eye size={18} strokeWidth={1.7} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#123B68] px-5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(18,59,104,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#0E3157] hover:shadow-[0_12px_24px_rgba(18,59,104,0.2)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
              >
                <span>
                  {loading ? "Signing in..." : "Sign in"}
                </span>

                {!loading && (
                  <ArrowRight
                    size={17}
                    strokeWidth={1.8}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                )}
              </button>
            </form>

            {/* Security note */}
            <div className="mt-8 border-t border-[#E3EAF2] pt-6">
              <p className="text-center text-xs leading-5 text-[#8A98AA]">
                Authorized access only. Your portfolio workspace is
                protected by secure authentication.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}