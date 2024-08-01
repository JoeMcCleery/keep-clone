"use client";

import { createContext, useMemo, useState } from "react";

export const EditLabelsModalOpenContext = createContext({
  modalOpen: false,
  toggleModalOpen: () => {},
});

export default function EditLabelsModalOpenProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [modalOpen, setModalOpen] = useState(false);

  const modalOpenContext = useMemo(
    () => ({
      modalOpen,
      toggleModalOpen: () => setModalOpen((isOpen) => !isOpen),
    }),
    [modalOpen]
  );

  return (
    <EditLabelsModalOpenContext.Provider value={modalOpenContext}>
      {children}
    </EditLabelsModalOpenContext.Provider>
  );
}
