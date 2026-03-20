const codeforcesUsername = 'andriaberi';

export async function getCodeforcesData() {
    return fetch('/api/codeforces').then(r => r.json());
}

export async function getCurrentCodeforcesRating() {
    const data = await getCodeforcesData();
    return data.info.rating ?? null;
}

export async function getMaxCodeforcesRating() {
    const data = await getCodeforcesData();
    return data.info.maxRating ?? null;
}

export async function getProjects() {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error(`Failed to fetch projects: ${response.status}`);
    return response.json();
}

export async function getAchievements() {
    const response = await fetch('/api/achievements');
    if (!response.ok) throw new Error(`Failed to fetch achievements: ${response.status}`);
    return response.json();
}

export async function getBooks() {
    const response = await fetch('/api/books');
    if (!response.ok) throw new Error(`Failed to fetch books: ${response.status}`);
    return response.json();
}

export async function getExperiences() {
    const response = await fetch('/api/experience');
    if (!response.ok) throw new Error(`Failed to fetch experience: ${response.status}`);
    return response.json();
}