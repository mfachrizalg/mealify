export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-500 to-amber-100 relative overflow-clip">
      {children}
    </div>
  );
}
