export interface Project {
    id: number
    name: string
    description: string
    location: string
    tag: string
    image: string
}

export interface ProjectsResponse {
    items: Project[]
    total: number
}

export async function getProjects(
    limit: number,
    offset: number,
    params: Record<string, string> = {}
): Promise<ProjectsResponse> {
    const query = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
        ...params,
    })

    const res = await fetch(`http://localhost:5000/projects?${query.toString()}`)
    if (!res.ok) throw new Error('Failed to load projects')

    return res.json()
}