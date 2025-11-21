const baseStyles =
  "inline-flex items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary:
    "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm hover:from-primary-600 hover:to-primary-700 focus-visible:outline-primary-500",
  ghost:
    "bg-white text-primary-700 border-primary-200 hover:border-primary-300 hover:text-primary-900 focus-visible:outline-primary-400",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  loading = false,
  type = "button",
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Chargement..." : children}
    </button>
  );
}
