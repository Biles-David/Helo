SELECT p.*, u.id, u.username
FROM posts p
JOIN users u
ON u.id = p.user_id
ORDER BY u.id;