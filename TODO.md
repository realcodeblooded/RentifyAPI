# Fix Building Creation - propertyOwnerId Column Missing

## Status: In Progress

### 1. ✅ Edit src/entities/buildings.Entity.ts

- Fix propertyOwner type: string → User
- Add @JoinColumn(\"propertyOwnerId\")
- Fix amenities ManyToMany relation

### 2. ✅ Generate TypeORM Migration

- Generated: src/migrations/1776351654835-FixPropertyOwnerId.ts

### 3. ⏳ Review Migration File

### 4. ✅ Run Migration

- npm run migration:run - Success! Added propertyOwnerId column + FK

### 5. ⏳ Fix TypeScript Errors & Test API

### 6. ✅ Cleanup

### Findings
- A tenant can create a maintenance request even for other tenants.
    - A tenant can only create a request if they have an active tenancy.
    - A tenant can only create requests for themselves
    - An ADMIN and or MANAGER can create a request on behalf of tenants
    - Add relationship btn building and maintenance request
    - property:maintenance - One to Many relationship
- A tenant  can view all the maintenance request
    - Only an admin should be able to view all the maintenance request.
    - A tenant should only see requests they have made.
    - A MANAGER should only see requests for buildings/properties they manage

Permissions
View all building maintenance request
View a specific building maintenance requests one or more
View only maintenance requests created by user