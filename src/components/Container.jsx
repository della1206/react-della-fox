export default function Container({ children, className = "" }) {
  return <div className={`p-8 max-w-[1600px] mx-auto min-h-screen ${className}`}>{children}</div>;
}