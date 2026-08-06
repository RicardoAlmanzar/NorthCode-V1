/**
 * Reusable CTA Button / Link
 *
 * Variants:
 *   primary   – coral filled pill  (main conversion action)
 *   secondary – outline pill       (exploration / alternate)
 *   ghost     – text-only link     (tertiary / inline)
 *
 * Renders <a> when `href` is provided, <button> otherwise.
 */
const base =
  'inline-flex items-center justify-center min-h-[44px] rounded-full font-medium tracking-[.03em] no-underline cursor-pointer transition-[transform,box-shadow,background-color,color] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] active:translate-y-0 active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-coral)]';

const variants = {
  primary:
    `${base} btn-magnetic px-6 py-3 text-[.9rem] bg-[var(--color-coral)] text-white border-2 border-[var(--color-coral)] shadow-[0_4px_16px_rgba(222,108,58,.20)] hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(222,108,58,.35)]`,
  secondary:
    `${base} px-6 py-3 text-[.9rem] border-2 border-white/70 text-white bg-transparent hover:bg-white hover:text-[#0d1b2a] hover:border-white hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,255,255,.15)]`,
  ghost:
    `${base} px-0 py-0 text-[.85rem] text-[var(--color-coral)] bg-transparent border-none gap-2 hover:-translate-y-0.5`,
};

export default function Button({
  variant = 'primary',
  href,
  className = '',
  children,
  ...rest
}) {
  const cls = `${variants[variant] || variants.primary} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
