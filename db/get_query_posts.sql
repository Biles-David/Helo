SELECT p.*, u.id, u.username
FROM posts p
JOIN users u
ON u.id = p.user_id
WHERE username = $1
ORDER BY u.id;