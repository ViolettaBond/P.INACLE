export interface Project {
    id: number
    name: string
    description: string
    location: string
    tag: string
    image: string
    read_time: string
    planning_image: string
    design_images: string[]
    amenities_images: string[]
    community_image: string
    amenities_list: string[]
    community_list: string[]
    conclusion: string
}

export async function getProject(id: string): Promise<Project> {
    const res = await fetch(`http://localhost:5000/projects/${id}`)
    if (!res.ok) throw new Error('Failed to load project')
    return res.json()
}