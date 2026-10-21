export interface FilterItem {
    id: number
    name?: string
    label?: string
    min?: number
    max?: number | null
}

export interface FiltersResponse {
    locations: FilterItem[]
    types: FilterItem[]
    costs: FilterItem[]
}

export async function getFilters(): Promise<FiltersResponse> {
    const res = await fetch('http://localhost:5000/project-filters')
    if (!res.ok) throw new Error('Failed to load filters')
    return res.json()
}