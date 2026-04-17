import { Tenancies, User } from "@/entities";
import { Buildings } from "@/entities/buildings.Entity";
import { Unit } from "@/entities/units.Entity";
import { BaseResponse } from "@/types/response.types";

class DashboardService {
  async getMetrics(userId: string, buildingId: string): Promise<BaseResponse> {
    // Sanitize data
    const isValidUser = await User.findOneBy({ id: userId });

    if (!isValidUser) return { success: false, message: "Invalid user id", data: null };

    // Prevent manager from viewing another manager's property
    const isValidUserBuilding = await Buildings.findOneBy({ id: buildingId, propertyOwner: { id: userId } })

    if (!isValidUserBuilding) return { success: false, message: "Property does not exist or you are not authorized to view it", data: null };
    const [
      totalProperties,
      totalTenants,
      totalUnits,
      vacantUnits,
      totalRevenue,
    ] = await Promise.all([
      Buildings.query("SELECT COUNT(*) AS 'totalProperties' FROM properties WHERE propertyOwner = ?", [userId]),
      Unit.query("SELECT COUNT(*) AS 'totalTenants' FROM units WHERE tenantId IS NOT NULL AND buildingId = ?", [buildingId]),
      Unit.query("SELECT COUNT(*) AS 'totalUnits' FROM units WHERE buildingId = ?", [buildingId]),
      Unit.query("SELECT COUNT(*) AS 'vacantUnits' FROM units WHERE tenantId IS NULL AND buildingId = ?", [buildingId]),
      Unit.query("SELECT SUM(rent) AS 'totalRevenue' FROM units WHERE tenantId IS NOT NULL AND buildingId = ?", [buildingId]

      )

    ]);

    return {
      success: true,
      data: [totalProperties, totalTenants, totalTenants, totalUnits, vacantUnits, totalRevenue],
      message: "Success!"
    }
  }
}

export const dashboardService = new DashboardService();