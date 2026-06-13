const db = require('../config/db');

exports.getUserPantry = async (req, res) => {
    try {
        const { userId } = req.params;
        const [rows] = await db.query(`
            SELECT up.id, i.name as ingredient_name, i.category, up.status, r.title as related_recipe
            FROM user_pantry up
            JOIN ingredients i ON up.ingredient_id = i.id
            LEFT JOIN recipes r ON up.related_recipe_id = r.id
            WHERE up.user_id = ?
        `, [userId]);
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};