export interface BlogPost {
    id: number
    title: string
    tag: string
    description: string
    date_text: string
    image: string
    category: string
    author_name: string
    author_avatar: string
    read_time: string
    content: string
    table_of_contents: string[]
}

export async function getBlogPost(id: string): Promise<BlogPost> {
    const res = await fetch(`http://localhost:5000/blog/${id}`)
    if (!res.ok) throw new Error('Failed to load post')
    return res.json()
}