INSERT INTO tweets (content, user_id)
VALUES ($1, $2);
SELECT * FROM tweets WHERE user_id = $2;