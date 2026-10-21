import { Photos } from '../../../../Photos';

export interface Project {
    id: number;
    name: string;
    description: string;
    location: string;
    tag: string;
    image: string;
}

export interface ProjectsResponse {
    items: Project[];
    total: number;
}

export async function getProjects(limit: number, offset: number): Promise<ProjectsResponse> {
    const res = await fetch(`http://localhost:5000/projects?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error('Failed to load projects');
    return res.json();
}

export function projectImage(name: string): string {
    return Photos.Projects[name] ?? Photos.Projects.Cover1;
}
