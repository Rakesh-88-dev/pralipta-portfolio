import { ArrowRight } from "lucide-react";

export default function PageHeader({
  title,
  description,
  actionLabel,
  onAction,
  actionIcon: ActionIcon = ArrowRight,
  children,
}) {
  return (
    <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#172033] sm:text-[30px]">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-[#68768A] sm:text-[15px]">
            {description}
          </p>
        )}

        {children}
      </div>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-[#123B68] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0E3156] focus:outline-none focus:ring-4 focus:ring-[#123B68]/10"
        >
          <ActionIcon size={16} strokeWidth={1.9} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}