UPDATE tweets 
SET content = $1
WHERE id = $2 AND user_id = $3
RETURNING *; 