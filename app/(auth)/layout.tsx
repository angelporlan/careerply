export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-surface px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[80vh] w-full max-w-md items-center justify-center">
        {children}
      </div>
    </main>
  );
}