import express, { type Request, type Response } from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
});

interface TestimonialRow {
    id: number;
    text: string;
    author_name: string;
    author_role: string;
    author_avatar: string;
    rating: number;
    position: 'top' | 'bottom';
}

app.get('/testimonials', async (req: Request, res: Response) => {
    try {
        const position = req.query.position as string | undefined;

        const params: string[] = [];
        const conditions: string[] = ['is_active = TRUE'];

        if (position) {
            params.push(position);
            conditions.push(`position = $${params.length}`);
        }

        const query = `
            SELECT id, text, author_name, author_role, author_avatar, rating, position
            FROM testimonials
            WHERE ${conditions.join(' AND ')}
            ORDER BY sort_order, id
        `;

        const result = await pool.query<TestimonialRow>(query, params);

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении отзывов' });
    }
});

app.get('/projects', async (req, res) => {
    try {
        const search = (req.query.search as string | undefined) ?? '';
        const location = req.query.location as string | undefined;
        const type = req.query.type as string | undefined;
        const minCost = req.query.minCost as string | undefined;
        const maxCost = req.query.maxCost as string | undefined;
        const exclude = req.query.exclude as string | undefined;
        const limit = Number(req.query.limit) || 6;
        const offset = Number(req.query.offset) || 0;

        const params: (string | number)[] = [];
        const conditions: string[] = ['is_active = TRUE'];

        if (search) {
            params.push(`%${search}%`);
            conditions.push(`name ILIKE $${params.length}`);
        }

        if (location) {
            params.push(location);
            conditions.push(`location = $${params.length}`);
        }

        if (type) {
            params.push(type);
            conditions.push(`category = $${params.length}`);
        }

        if (minCost) {
            params.push(Number(minCost));
            conditions.push(`cost >= $${params.length}`);
        }

        if (maxCost) {
            params.push(Number(maxCost));
            conditions.push(`cost <= $${params.length}`);
        }

        if (exclude) {
            params.push(Number(exclude));
            conditions.push(`id <> $${params.length}`);
        }

        const where = `WHERE ${conditions.join(' AND ')}`;

        const listParams = [...params, limit, offset];
        const list = await pool.query(
            `SELECT id, name, description, location, tag, image
             FROM projects
             ${where}
             ORDER BY id
             LIMIT $${listParams.length - 1} OFFSET $${listParams.length}`,
            listParams,
        );

        const total = await pool.query(`SELECT COUNT(*) FROM projects ${where}`, params);

        res.json({
            items: list.rows,
            total: Number(total.rows[0].count),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении проектов' });
    }
});

app.get('/services', async (req, res) => {
    try {
        const category = req.query.category as string | undefined;

        const params: string[] = [];
        const conditions: string[] = ['is_active = TRUE'];

        if (category && category !== 'all') {
            params.push(category);
            conditions.push(`category = $${params.length}`);
        }

        const query = `
            SELECT id, name, description, image, category
            FROM services
            WHERE ${conditions.join(' AND ')}
            ORDER BY sort_order, id
        `;

        const result = await pool.query(query, params);

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении услуг' });
    }
});

app.get('/team', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, title, date_text, description, image 
             FROM team 
             WHERE is_active = TRUE 
             ORDER BY sort_order, id`,
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении списка команды' });
    }
});

app.post('/contact', async (req: Request, res: Response) => {
    try {
        const { name, phone_number, email, budget, service, message } = req.body;

        if (!name || !phone_number || !email || !message) {
            return res.status(400).json({ message: 'Заполните обязательные поля' });
        }

        const query = `
            INSERT INTO contact_requests (name, phone_number, email, budget, service, message)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `;

        await pool.query(query, [name, phone_number, email, budget, service, message]);
        res.status(201).json({ success: true, message: 'Заявка успешно отправлена' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при отправке сообщения' });
    }
});

app.get('/services/main', async (req, res) => {
    try {
        const serviceResult = await pool.query(
            `SELECT id, name, description FROM services WHERE category = 'residential' LIMIT 1`,
        );

        if (serviceResult.rows.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const service = serviceResult.rows[0];

        const subsectionsResult = await pool.query(
            `SELECT id, title, description, image 
             FROM service_subsections 
             WHERE service_id = $1 AND is_active = TRUE 
             ORDER BY sort_order, id`,
            [service.id],
        );

        res.json({
            ...service,
            subsections: subsectionsResult.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/project-filters', async (req, res) => {
    try {
        const locations = await pool.query('SELECT id, name FROM project_locations ORDER BY id');
        const types = await pool.query('SELECT id, name FROM project_types ORDER BY id');
        const costs = await pool.query('SELECT id, label, min, max FROM project_costs ORDER BY id');

        res.json({
            locations: locations.rows,
            types: types.rows,
            costs: costs.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении фильтров' });
    }
});

app.get('/projects', async (req, res) => {
    try {
        const search = (req.query.search as string | undefined) ?? '';
        const location = req.query.location as string | undefined;
        const type = req.query.type as string | undefined;
        const minCost = req.query.minCost as string | undefined;
        const maxCost = req.query.maxCost as string | undefined;
        const limit = Number(req.query.limit) || 6;
        const offset = Number(req.query.offset) || 0;

        const params: (string | number)[] = [];
        const conditions: string[] = ['is_active = TRUE'];

        if (search) {
            params.push(`%${search}%`);
            conditions.push(`name ILIKE $${params.length}`);
        }

        if (location) {
            params.push(location);
            conditions.push(`location = $${params.length}`);
        }

        if (type) {
            params.push(type);
            conditions.push(`category = $${params.length}`);
        }

        if (minCost) {
            params.push(Number(minCost));
            conditions.push(`cost >= $${params.length}`);
        }

        if (maxCost) {
            params.push(Number(maxCost));
            conditions.push(`cost <= $${params.length}`);
        }

        const where = `WHERE ${conditions.join(' AND ')}`;

        const listParams = [...params, limit, offset];
        const list = await pool.query(
            `SELECT id, name, description, location, tag, image
             FROM projects
             ${where}
             ORDER BY id
             LIMIT $${listParams.length - 1} OFFSET $${listParams.length}`,
            listParams,
        );

        const total = await pool.query(`SELECT COUNT(*) FROM projects ${where}`, params);

        res.json({
            items: list.rows,
            total: Number(total.rows[0].count),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении проектов' });
    }
});

app.get('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT * FROM projects WHERE id = $1 AND is_active = TRUE',
            [id],
        );

        if (!result.rows.length) {
            return res.status(404).json({ message: 'Not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка' });
    }
});

app.get('/blog', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, title, tag, description, date_text, image, category FROM blog WHERE is_active = TRUE ORDER BY sort_order, id',
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении статей' });
    }
});

app.get('/blog', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, title, tag, description, date_text, image, category
             FROM blog
             WHERE is_active = TRUE
             ORDER BY sort_order, id`,
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении статей' });
    }
});

app.get('/blog/list', async (req, res) => {
    try {
        const category = req.query.category as string | undefined;
        const limit = Number(req.query.limit) || 6;
        const offset = Number(req.query.offset) || 0;

        const params: (string | number)[] = [];
        const conditions: string[] = ['is_active = TRUE'];

        if (category && category !== 'all') {
            params.push(category);
            conditions.push(`category = $${params.length}`);
        }

        const where = `WHERE ${conditions.join(' AND ')}`;

        const listParams = [...params, limit, offset];
        const list = await pool.query(
            `SELECT id, title, tag, description, date_text, image, category
             FROM blog
             ${where}
             ORDER BY sort_order, id
             LIMIT $${listParams.length - 1} OFFSET $${listParams.length}`,
            listParams,
        );

        const total = await pool.query(`SELECT COUNT(*) FROM blog ${where}`, params);

        res.json({
            items: list.rows,
            total: Number(total.rows[0].count),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении статей' });
    }
});

app.get('/blog/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM blog WHERE id = $1 AND is_active = TRUE', [
            id,
        ]);

        if (!result.rows.length) {
            return res.status(404).json({ message: 'Not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка' });
    }
});

app.get('/latest-news', async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 2;
        const offset = Number(req.query.offset) || 0;

        const list = await pool.query(
            `SELECT id, title, tag, date_text, image 
             FROM latest_news 
             WHERE is_active = TRUE 
             ORDER BY sort_order, id 
             LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        const total = await pool.query(`SELECT COUNT(*) FROM latest_news WHERE is_active = TRUE`);

        res.json({
            items: list.rows,
            total: Number(total.rows[0].count),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении новостей' });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
