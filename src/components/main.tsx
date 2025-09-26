import type React from "react";

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-background  py-5 h-max">
      <div className="container mx-auto"> {children}</div>
    </main>
  );
}
