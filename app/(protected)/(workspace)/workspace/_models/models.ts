export interface Workspace {
  id?: string;
  name: string;
  description: string;
  icon: string;
  user: string;
  workspaceMembers: string;
  integrationsCount: number;
  botsCount: number;
}
