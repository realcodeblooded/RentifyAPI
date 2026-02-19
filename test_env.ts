import { config } from "./src/config/environment";

console.log("DB_HOST:", config.db.host);
console.log("DB_PORT:", config.db.port);
console.log("DB_USERNAME:", config.db.username);
console.log("DB_DATABASE:", config.db.database);
