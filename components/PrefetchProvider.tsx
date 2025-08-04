import React from "react";
import { usePrefetch } from "@/hooks/usePrefetch";

export const PrefetchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  usePrefetch();
  return <>{children}</>;
};
