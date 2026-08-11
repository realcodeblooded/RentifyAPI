 SELECT t.id AS tenancyId, un.id AS unitId, pr.id AS propertyId, un.floor, CONCAT(us.firstName, " ", us.lastName) AS fullName, un.unitKey, CONCAT(us.firstName, " ", us.lastName) AS manager, pr.propertyName
 FROM tenancies t
 JOIN units un
 ON t.unitId = un.id
 RIGHT JOIN property pr
 ON t.buildingId = pr.id
 JOIN users us
 ON t.tenantId = us.id;


 SELECT t.id AS tenancyId, un.id AS unitId, un.unitKey
 FROM tenancies t
 RIGHT JOIN units un
 ON t.unitId = un.id;