export interface BlogPost {
    id: number;
    title: string;
    tag: string;
    description: string;
    date_text: string;
    image: string;
    category: string;
}

export interface BlogResponse {
    items: BlogPost[];
    total: number;
}

export async function getBlogPosts(
    category: string,
    limit: number,
    offset: number,
): Promise<BlogResponse> {
    const query = new URLSearchParams({
        category,
        limit: String(limit),
        offset: String(offset),
    });

    const res = await fetch(`http://localhost:5000/blog/list?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to load blog posts');
    return res.json();
}
