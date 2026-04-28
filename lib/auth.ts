// Create Session and user utilities

export type User = {
    id: number;
    email: string;
    password: string;
    createdAt: string;
};

const USER_KEY = "habit-tracker-users";
const SESSION_KEY = "habit-tracker-session";

export function getUsers(): User[] {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
        return [];
    }
    return JSON.parse(raw);
}

export function saveUsers(users: User[]): void {
    localStorage.setItem(USER_KEY, JSON.stringify(users))
}

export function createUser(email: string, password: string): boolean {
    const users = getUsers();
    const exists = users.find(u => u.email === email);
    if (exists) return false;

    users.push({ id: users.length + 1, email, password, createdAt: new Date().toISOString()})
    saveUsers(users);
    return true;
}

export function loginUser(email: string, password: string): boolean {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) return false;

    const session = { email, loginTime: new Date().toISOString() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
}

export function logoutUser(): void {
    localStorage.removeItem(SESSION_KEY)
}

export function getCurrentSession(): { email: string; loginTime: string } | null {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    return JSON.parse(raw);
}

export function isAuthenticated(): boolean {
    return getCurrentSession() !== null;
}