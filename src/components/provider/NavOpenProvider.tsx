"use client";

import { createContext, useMemo, useState } from "react";

export const NavOpenContext = createContext({
  navOpen: true,
  toggleNavOpen: () => {},
});

export default function NavOpenProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navOpen, setNavOpen] = useState(true);

  const navOpenContext = useMemo(
    () => ({
      navOpen,
      toggleNavOpen: () => setNavOpen((isOpen) => !isOpen),
    }),
    [navOpen]
  );

  return (
    <NavOpenContext.Provider value={navOpenContext}>
      {children}
    </NavOpenContext.Provider>
  );
}
