export type CreateMaintenanceRequest = {
  description: string;
  requestedById: string;
};

export type ResolveMaintenanceRequest = {
  resolutionNotes?: string | null;
};

export type MaintenanceResponse = {
  id: string;
  description: string;
  requestedAt: Date;
  isResolved: boolean;
  resolvedAt?: Date | null;
  resolutionNotes?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
