-- =============================================================
-- 1. TESTIMONIALS
-- =============================================================

CREATE TABLE IF NOT EXISTS testimonials (
    id            SERIAL PRIMARY KEY,
    text          TEXT NOT NULL,
    author_name   VARCHAR(120) NOT NULL,
    author_role   VARCHAR(120) NOT NULL,
    author_avatar VARCHAR(60)  DEFAULT 'Avatar1',
    rating        INT          DEFAULT 5,
    position      VARCHAR(20)  DEFAULT 'top',
    is_active     BOOLEAN      DEFAULT TRUE,
    sort_order    INT          DEFAULT 0
);

INSERT INTO testimonials (
    text, author_name, author_role, author_avatar, rating, position, is_active, sort_order
)
VALUES
    (
        'I highly recommend. My home exactly what I wanted',
        'Anna M.', 'Actor', 'Avatar1', 5, 'top', TRUE, 1
    ),
    (
        'Pinnacle is my GO-TO when it comes to real estate.',
        'James C.', 'CEO of Crazy Bank', 'Avatar2', 5, 'top', TRUE, 2
    ),
    (
        'Pinnacle''s attention to detail and commitment to excellence is unparalleled. Their team is professional, courteous, and always willing to go the extra mile.',
        'Emily J. Smith', 'Owner, Smith & Co.', 'Avatar5', 5, 'bottom', TRUE, 1
    ),
    (
        'I was blown away by the quality of work and the level of service provided by Pinnacle. They truly understand the importance of delivering exceptional results.',
        'David L. Lee', 'CEO, Lee Enterprises', 'Avatar6', 5, 'bottom', TRUE, 2
    ),
    (
        'I was blown away by the quality of work and the level of service provided by Pinnacle. They truly understand the importance of delivering exceptional results.',
        'Michael R. Davis', 'Property Owner', 'Avatar7', 5, 'bottom', TRUE, 3
    ),
    (
        'Pinnacle''s ability to balance budget, schedule, and quality is impressive. They''re a true partner in the construction process.',
        'Sarah K. Johnson', 'Project Manager, Johnson Co.', 'Avatar8', 4, 'bottom', TRUE, 4
    );


-- =============================================================
-- 2. PROJECTS
-- =============================================================

CREATE TABLE IF NOT EXISTS projects (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(120) NOT NULL,
    description TEXT         NOT NULL,
    location    VARCHAR(160) NOT NULL,
    tag         VARCHAR(60)  NOT NULL,
    image       VARCHAR(60)  NOT NULL,
    is_active   BOOLEAN      DEFAULT TRUE,
    sort_order  INT          DEFAULT 0
);

INSERT INTO projects (name, description, location, tag, image)
VALUES
    ('The Grand Estate', 'The Grand Estate is a luxurious residential development...', 'Upper Masconge Townhips, PA', 'Movie Theater', 'Cover1'),
    ('The Business Hub', 'The Business Hub is a state-of-the-art commercial office space...', 'Upper Masconge Townhips, PA', 'High-speed Wi-Fi', 'Cover2'),
    ('The Village',      'The Village is a community development featuring a mix...', 'Upper Masconge Townhips, PA', 'Green spaces',  'Cover3'),
    ('The Riverside',    'Modern waterfront residences...', 'Upper Masconge Townhips, PA', 'Pool',   'Cover4'),
    ('The Hillside',     'Private hillside villas...', 'Upper Masconge Townhips, PA', 'Garden', 'Cover5'),
    ('The Metro Lofts',  'Urban loft apartments in the city center...', 'Upper Masconge Townhips, PA', 'Gym', 'Cover6');

-- Дополнительные поля для страницы ProjectDetail
ALTER TABLE projects ADD COLUMN IF NOT EXISTS read_time        VARCHAR(20)  DEFAULT '5min Read';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS planning_image   VARCHAR(60);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS design_images    TEXT[]       DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS amenities_images TEXT[]       DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS community_image  VARCHAR(60);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS amenities_list   TEXT[]       DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS community_list   TEXT[]       DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS conclusion       TEXT;

-- Детали для Grand Estate
UPDATE projects SET
    read_time        = '5min Read',
    planning_image   = 'Plan1',
    design_images    = ARRAY['Design1', 'Design2'],
    amenities_images = ARRAY['Amenity1', 'Amenity2'],
    community_image  = 'Community1',
    amenities_list   = ARRAY[
        'Private movie theater: A state-of-the-art movie theater with plush seating and a large screen.',
        'Indoor swimming pool: A sparkling indoor pool with a retractable roof, perfect for year-round swimming.',
        'Fitness center: A fully equipped fitness center with the latest exercise equipment and personal training services.',
        'Private parking: Secure, underground parking for each home, with direct access to the elevator.',
        'Gated community: A secure, gated community with 24/7 security and access control.'
    ],
    community_list   = ARRAY[
        'Community center: A state-of-the-art community center with a fully equipped kitchen, perfect for hosting events and gatherings.',
        'Parks and green spaces: Lush parks and green spaces throughout the community, providing a peaceful retreat from the hustle and bustle of city life.',
        'Walking trails: Walking trails that wind through the community, providing a scenic and peaceful way to enjoy the outdoors.'
    ],
    conclusion = 'The Grand Estate is a truly exceptional community, offering residents a luxurious living experience like no other. With its stunning design, luxurious amenities, and private outdoor spaces, this community is the perfect choice for those who demand the very best.'
WHERE name = 'The Grand Estate';


-- =============================================================
-- 3. SERVICES
-- =============================================================

CREATE TABLE IF NOT EXISTS services (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT         NOT NULL,
    image       VARCHAR(255) NOT NULL,
    category    VARCHAR(100) NOT NULL,
    is_active   BOOLEAN      DEFAULT TRUE,
    sort_order  INTEGER      DEFAULT 0
);

INSERT INTO services (name, description, image, category, is_active, sort_order)
VALUES
    ('Residential Construction', 'Professional construction of modern residential properties.', 'residential.jpg', 'residential', TRUE, 1),
    ('Commercial Development',   'Complete solutions for commercial buildings and spaces.',   'residential.jpg', 'commercial',  TRUE, 2),
    ('Interior Renovation',      'Transform your space with high-quality renovation services.', 'residential.jpg', 'renovation', TRUE, 3);


-- =============================================================
-- 4. TEAM
-- =============================================================

CREATE TABLE IF NOT EXISTS team (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(120) NOT NULL,
    date_text   VARCHAR(60)  NOT NULL,
    description TEXT         NOT NULL,
    image       VARCHAR(60)  NOT NULL,
    is_active   BOOLEAN      DEFAULT TRUE,
    sort_order  INT          DEFAULT 0
);

INSERT INTO team (title, date_text, description, image, is_active, sort_order)
VALUES
    ('John Doe',        'May 10, 2022', 'With over 20 years of experience in the construction and real estate industry, he has built a reputation for his unwavering commitment to quality and innovation.', 'Member1', TRUE, 1),
    ('Jane Smith',      'May 10, 2022', 'Jane Smith is the driving force behind Pinnacle''s day-to-day operations. Her ability to navigate complex challenges and find creative solutions has been instrumental in our growth.', 'Member2', TRUE, 2),
    ('Michael Johnson', 'May 10, 2022', 'He has a unique ability to transform even the most ambitious visions into reality. His innovative approach and attention to detail have earned him the respect of our clients.', 'Member3', TRUE, 3),
    ('John Doe',        'May 10, 2022', 'With over 20 years of experience in the construction and real estate industry, he has built a reputation for his unwavering commitment to quality and innovation.', 'Member1', TRUE, 4),
    ('Jane Smith',      'May 10, 2022', 'Jane Smith is the driving force behind Pinnacle''s day-to-day operations. Her ability to navigate complex challenges and find creative solutions has been instrumental in our growth.', 'Member2', TRUE, 5),
    ('Michael Johnson', 'May 10, 2022', 'He has a unique ability to transform even the most ambitious visions into reality. His innovative approach and attention to detail have earned him the respect of our clients.', 'Member3', TRUE, 6);


-- =============================================================
-- 5. CONTACT REQUESTS
-- =============================================================

CREATE TABLE IF NOT EXISTS contact_requests (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(150) NOT NULL,
    phone_number VARCHAR(40)  NOT NULL,
    email        VARCHAR(150) NOT NULL,
    budget       VARCHAR(100),
    service      VARCHAR(255),
    message      TEXT         NOT NULL,
    created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);


-- =============================================================
-- 6. SERVICE SUBSECTIONS
-- =============================================================

CREATE TABLE IF NOT EXISTS service_subsections (
    id          SERIAL PRIMARY KEY,
    service_id  INT REFERENCES services(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    description TEXT         NOT NULL,
    image       VARCHAR(60)  NOT NULL,
    is_active   BOOLEAN      DEFAULT TRUE,
    sort_order  INT          DEFAULT 0
);

INSERT INTO service_subsections (service_id, title, description, image, sort_order)
VALUES
    (1, 'Custom Homes', 'At Pinnacle, we specialize in designing and building custom homes that are tailored to our clients'' specific needs and preferences. Our team of architects and designers work closely with our clients to create a home that is both beautiful and functional, incorporating the latest technologies and materials to ensure that it is energy-efficient, durable, and comfortable.', 'village', 1),
    (1, 'Community Development', 'Pinnacle has a proven track record of developing vibrant, sustainable communities that offer a high quality of life for residents. Our team of experts works closely with local authorities and stakeholders to create communities that are well-planned, well-designed, and well-connected, with a range of amenities and services that cater to the needs of residents.', 'botania', 2),
    (1, 'Renovations', 'Whether you''re looking to update a single room or transform an entire property, Pinnacle has the expertise and experience to get the job done right. Our team of renovation specialists works closely with our clients to develop a plan that meets their needs and budget, while ensuring that the finished product is both beautiful and functional.', 'cleaning', 3);


-- =============================================================
-- 7. PROJECT FILTERS (locations / types / costs)
-- =============================================================

CREATE TABLE IF NOT EXISTS project_locations (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS project_types (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS project_costs (
    id    SERIAL PRIMARY KEY,
    label VARCHAR(120) NOT NULL UNIQUE,
    min   INT,
    max   INT
);

INSERT INTO project_locations (name)
VALUES
    ('Upper Masconge Townhips, PA'),
    ('New York, NY'),
    ('Los Angeles, CA'),
    ('Miami, FL'),
    ('Chicago, IL');

INSERT INTO project_types (name)
VALUES
    ('Residential'),
    ('Commercial'),
    ('Mixed-use'),
    ('Industrial');

INSERT INTO project_costs (label, min, max)
VALUES
    ('Under $500k', 0,       500000),
    ('$500k – $1M', 500000,  1000000),
    ('$1M – $5M',   1000000, 5000000),
    ('$5M+',        5000000, NULL);


-- =============================================================
-- 8. BLOG
-- =============================================================

CREATE TABLE IF NOT EXISTS blog (
    id         SERIAL PRIMARY KEY,
    title      VARCHAR(120) NOT NULL,
    tag        VARCHAR(60)  NOT NULL,
    description TEXT        NOT NULL,
    date_text  VARCHAR(60)  NOT NULL,
    image      VARCHAR(60)  NOT NULL,
    is_active  BOOLEAN      DEFAULT TRUE,
    sort_order INT          DEFAULT 0
);

-- Расширения для страницы /blog и /blog/:id
ALTER TABLE blog ADD COLUMN IF NOT EXISTS category         VARCHAR(60)  DEFAULT 'Home Design';
ALTER TABLE blog ADD COLUMN IF NOT EXISTS author_name      VARCHAR(120) DEFAULT 'By Mira';
ALTER TABLE blog ADD COLUMN IF NOT EXISTS author_avatar    VARCHAR(60)  DEFAULT 'Avatar1';
ALTER TABLE blog ADD COLUMN IF NOT EXISTS read_time        VARCHAR(20)  DEFAULT '8min Read';
ALTER TABLE blog ADD COLUMN IF NOT EXISTS body             JSONB        DEFAULT '[]';
ALTER TABLE blog ADD COLUMN IF NOT EXISTS table_of_contents TEXT[]      DEFAULT '{}';

INSERT INTO blog (title, tag, description, date_text, image, category, sort_order)
VALUES
    (
        'Smart Tech',
        'Smart Tech',
        'From voice-controlled assistants to automated lighting systems, we''ll dive into the latest trends and innovations that are making our homes smarter and more convenient. In this blog post, we explore the latest advancements in smart home technology and how it''s changing the way we live.',
        'May 10, 2022', 'Cover1', 'Sustainability', 1
    ),
    (
        'Smart Homes',
        'Smart Homes',
        'In this blog post, we explore the importance of energy-efficient homes and how they can benefit both the environment and your wallet. From solar panels to energy-efficient appliances, we''ll provide tips on how to make your home more energy-efficient and sustainable.',
        'May 10, 2022', 'Cover2', 'Home Design', 2
    ),
    (
        'Green Spaces',
        'Green Spaces',
        'Discover how incorporating green spaces and natural elements into building design can improve mental health, productivity, and overall well-being. We examine the rise of biophilic architecture.',
        'May 10, 2022', 'Cover3', 'Renovation', 3
    ),
    (
        'The Benefits of Sustainable Building Practices',
        'Green Building',
        'Sustainable construction is no longer a trend — it is a necessity. In this article we explore how green materials, passive design and smart energy systems can reduce your carbon footprint...',
        'May 10, 2022', 'Cover1', 'Sustainability', 10
    ),
    (
        '5 Ways to Increase Your Home''s Value',
        'Home Improvement',
        'From a fresh coat of paint to a full kitchen remodel — discover five proven strategies that will boost the market value of your property.',
        'May 10, 2022', 'Cover2', 'Home Design', 11
    ),
    (
        'How to Plan and Build Your Dream Home',
        'Home Design',
        'Building a home from scratch can feel overwhelming. We break down the process step by step — from land selection to the final walkthrough.',
        'May 10, 2022', 'Cover3', 'Home Design', 12
    ),
    (
        'Solar Panels: Are They Worth It in 2024?',
        'Green Building',
        'Solar energy has never been more affordable. We run the numbers on installation costs, tax incentives, and long-term savings.',
        'May 10, 2022', 'Cover4', 'Sustainability', 13
    ),
    (
        'Modern Kitchen Design Trends',
        'Home Improvement',
        'From handleless cabinets to warm wood accents — here are the trends shaping modern kitchens this year.',
        'May 10, 2022', 'Cover5', 'Home Design', 14
    ),
    (
        'Renovating an Old House: Where to Start',
        'Renovation',
        'Renovating an older property can unlock its full potential. Our experts share a practical roadmap for planning and budgeting your renovation.',
        'May 10, 2022', 'Cover6', 'Renovation', 15
    );

-- Полное содержимое статьи "Smart Homes"
UPDATE blog SET
    author_name   = 'By Mira',
    author_avatar = 'Avatar1',
    read_time     = '8min Read',
    image         = 'Cover7',
    table_of_contents = ARRAY[
        'Cost Savings',
        'Environmental Benefits',
        'Increased Property Value',
        'Improved Health and Comfort',
        'Tips for Making Your Home More Energy-Efficient',
        'Conclusion'
    ],
    body = '[
        {
            "type": "paragraph",
            "text": "In this blog post, we''ll explore the benefits of energy-efficient homes, from cost savings to environmental benefits, and provide tips on how to make your home more energy-efficient."
        },
        {
            "type": "heading",
            "text": "Cost of living"
        },
        {
            "type": "paragraph",
            "text": "One of the most significant benefits of energy-efficient homes is the cost savings they provide. By reducing energy consumption, you can lower your utility bills and save money on your energy costs. According to the U.S. Department of Energy, energy-efficient homes can save homeowners up to 30% on their energy bills."
        },
        {
            "type": "heading",
            "text": "Environmental Benefits"
        },
        {
            "type": "paragraph",
            "text": "Energy-efficient homes also have a significant impact on the environment. By reducing energy consumption, you can help reduce greenhouse gas emissions and contribute to a cleaner, healthier environment. In fact, the U.S. Environmental Protection Agency estimates that energy-efficient homes can reduce carbon dioxide emissions by up to 2.5 million tons per year."
        },
        {
            "type": "heading",
            "text": "Improved Health and Comfort"
        },
        {
            "type": "paragraph",
            "text": "Energy-efficient homes can also improve your health and comfort. By reducing energy consumption, you can create a healthier and more comfortable living space. This is because energy-efficient homes are designed to reduce indoor air pollution and provide better ventilation, which can help reduce the risk of respiratory problems and other health issues."
        },
        {
            "type": "heading",
            "text": "Tips for Making Your Home More Energy-Efficient"
        },
        {
            "type": "paragraph",
            "text": "So, how can you make your home more energy-efficient? Here are some tips to get you started:"
        },
        {
            "type": "list",
            "items": [
                "Seal Air Leaks: One of the simplest ways to make your home more energy-efficient is to seal air leaks. This can be done by caulking and weatherstripping around doors and windows, and by installing door sweeps and threshold seals.",
                "Upgrade to Energy-Efficient Appliances: Energy-efficient appliances can help reduce energy consumption and save you money on your utility bills. Look for appliances with the ENERGY STAR label, which indicates that they meet energy efficiency standards set by the U.S. Environmental Protection Agency.",
                "Install Solar Panels: Solar panels can help reduce your energy consumption and provide a sustainable source of energy. In fact, the U.S. Department of Energy estimates that solar panels can save homeowners up to 50% on their energy bills.",
                "Improve Insulation: Proper insulation can help reduce energy consumption and keep your home warm in the winter and cool in the summer. Look for insulation with a high R-value, which indicates its ability to resist heat flow.",
                "Use Energy-Efficient Lighting: Energy-efficient lighting, such as LED bulbs, can help reduce energy consumption and provide a sustainable source of lighting. Look for lighting with the ENERGY STAR label, which indicates that it meets energy efficiency standards set by the U.S. Environmental Protection Agency."
            ]
        },
        {
            "type": "heading",
            "text": "Conclusion"
        },
        {
            "type": "paragraph",
            "text": "In conclusion, energy-efficient homes offer a range of benefits, from cost savings to environmental benefits, and can even increase your property value. By incorporating energy-efficient features into your home, you can create a healthier, more comfortable, and more sustainable living space. Whether you''re a homeowner or a builder, there are many ways to make your home more energy-efficient, and we hope this blog post has provided you with some valuable tips and insights to get you started."
        }
    ]'::jsonb
WHERE tag = 'Smart Homes';
