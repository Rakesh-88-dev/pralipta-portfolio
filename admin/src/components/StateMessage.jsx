import { AlertCircle, Inbox, LoaderCircle, RefreshCw } from "lucide-react";

export default function StateMessage({
  type = "loading",
  title,
  message,
  onRetry,
  actionLabel = "Try again",
}) {
  const isLoading = type === "loading";
  const isError = type === "error";
  const isEmpty = type === "empty";

  if (isLoading) {
    return (
      <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-[#E3EAF2] bg-white">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FA] text-[#123B68]">
            <LoaderCircle
              size={22}
              strokeWidth={1.8}
              className="animate-spin"
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-[#172033]">
            {title || "Loading..."}
          </p>

          <p className="mt-1 max-w-sm text-xs leading-5 text-[#8996A8]">
            {message || "Please wait while we load the information."}
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-[#E3EAF2] bg-white px-5">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#B42318]">
            <AlertCircle
              size={22}
              strokeWidth={1.8}
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-[#172033]">
            {title || "Something went wrong"}
          </p>

          <p className="mt-1 text-xs leading-5 text-[#8996A8]">
            {message ||
              "We couldn't load this information. Please try again."}
          </p>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#123B68] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0E3156] focus:outline-none focus:ring-4 focus:ring-[#123B68]/10"
            >
              <RefreshCw
                size={14}
                strokeWidth={1.9}
              />
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-[#E3EAF2] bg-white px-5">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F8FC] text-[#8996A8]">
            <Inbox
              size={22}
              strokeWidth={1.8}
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-[#172033]">
            {title || "Nothing here yet"}
          </p>

          <p className="mt-1 text-xs leading-5 text-[#8996A8]">
            {message ||
              "There is no information available to display yet."}
          </p>
        </div>
      </div>
    );
  }

  return null;
}