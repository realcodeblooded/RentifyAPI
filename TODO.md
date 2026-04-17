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
