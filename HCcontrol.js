const db = require('../config/db');

exports.getAllRecipes = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT r.id, r.title, r.description, r.prep_time_minutes, r.difficulty, r.rating, r.main_image_url, u.full_name as author 
            FROM recipes r
            JOIN users u ON r.author_id = u.id
            ORDER BY r.created_at DESC
        `);
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const [recipe] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);
        
        if (recipe.length === 0) {
            return res.status(404).json({ success: false, message: 'Resep tidak ditemukan' });
        }

        const [ingredients] = await db.query(`
            SELECT i.name, ri.quantity, ri.unit, ri.notes, ri.section_name 
            FROM recipe_ingredients ri
            JOIN ingredients i ON ri.ingredient_id = i.id
            WHERE ri.recipe_id = ?
        `, [id]);

        res.json({ 
            success: true, 
            data: { ...recipe[0], ingredients } 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};