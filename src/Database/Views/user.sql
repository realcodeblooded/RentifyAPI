CREATE OR REPLACE VIEW user AS
SELECT u.id, firstName, lastName, email, phone, r.key AS role, refreshToken
FROM users u
LEFT JOIN roles r
ON u.roleId = r.id;