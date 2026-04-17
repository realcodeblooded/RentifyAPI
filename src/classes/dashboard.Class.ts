import { Tenancies } from "@/entities";
import { Buildings } from "@/entities/buildings.Entity";
import { Unit } from "@/entities/units.Entity";

class DashboardService {
  async getMetrics(userId: string, buildingId: string) {
    const [
      totalProperties,
      totalTenants,
      totalUnits,
      occupiedUnits,
      vacantUnits,
      totalRevenue,
      pendingPayments,
    ] = await Promise.all([
      Buildings.count({ where: { propertyOwner: { id: userId } } }),
      Tenancies.count(),
      Unit.count({ where: { tenant: false } }),
    ]);
  }
}
