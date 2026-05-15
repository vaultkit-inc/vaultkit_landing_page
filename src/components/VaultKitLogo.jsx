export default function VaultKitLogo({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="VaultKit"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer V chevron */}
      <path
        d="M10 10 L32 52 L54 10"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner V chevron — suggests layered defense */}
      <path
        d="M22 10 L32 30 L42 10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Sealed apex — the cryptographic grant */}
      <circle cx="32" cy="52" r="5" fill="currentColor" />
    </svg>
  )
}
