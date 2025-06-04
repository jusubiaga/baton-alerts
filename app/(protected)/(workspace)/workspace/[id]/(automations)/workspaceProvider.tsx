"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface WorkspaceContextType {
  workspaceId: string | null;
  setWorkspaceId: (id: string | null) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({
  children,
  initialWorkspaceId,
}: {
  children: React.ReactNode;
  initialWorkspaceId: string | null;
}) {
  const [workspaceId, setWorkspaceId] = useState<string | null>(initialWorkspaceId);

  // Opcional: Sincronizar si el initialWorkspaceId cambia (por ejemplo, al navegar entre workspaces)
  useEffect(() => {
    setWorkspaceId(initialWorkspaceId);
  }, [initialWorkspaceId]);

  return <WorkspaceContext.Provider value={{ workspaceId, setWorkspaceId }}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
