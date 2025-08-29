import type React from "react";

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-background h-full py-5">
      <div className="container mx-auto"> {children}</div>
    </main>
  );
}
