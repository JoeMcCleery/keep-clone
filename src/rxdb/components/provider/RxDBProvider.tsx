"use client";

import { useEffect, useState } from "react";
import { Provider } from "rxdb-hooks";
import { Database } from "@/rxdb/types";
import initRxDB from "@/rxdb";

let init = false;

export default function RxDBProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [db, setDb] = useState<Database>();

  useEffect(() => {
    // Only init once (Only used in development to prevent react strict mode from running init twice)
    if (init) return;
    init = true;
    // Init RxDB
    initRxDB().then(setDb);
  }, []);

  return <Provider db={db}>{children}</Provider>;
}
