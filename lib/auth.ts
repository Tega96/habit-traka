// Create Session and user utilities
import { v4 as uuidv4 } from 'uuid';

export type User = {
    id: string;
    email: string;
    password: string;
    createdAt: string;
};

export type Session = {
    userId: string;
    email: string;
} | null;

// Fixed contract keys
const USER_KEY = "habit-tracker-users";
const SESSION_KEY = "habit-tracker-session";


// ============ Users ================
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

    users.push({ 
        id: uuidv4(), 
        email, 
        password, 
        createdAt: new Date().toISOString()
    })
    saveUsers(users);
    return true;
}

export function findUserByEmail(email: string): User | null {
    const users = getUsers();
    return users.find(u => u.email === email) || null
}

export function findUserById(userId: string): User | null {
    const users = getUsers();
    return users.find(u => u.id === userId) || null;
}

// ============= Session ========================
export function getSession(): Session {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
}

export function setSession(user: User): void {
    const session: Session = {
        userId: user.id,
        email: user.email,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(null));
}

export function isAuthenticated(): boolean {
    const session = getSession();
    return session !== null;
}

export function getCurrentUser(): User | null {
    const session = getSession();
    if (!session) return null;
    return findUserById(session.userId);
}

// =================== Login/Logout =====================

export function loginUser(email: string, password: string): boolean {
    const user = findUserByEmail(email);
    if (!user || user.password !== password) return false;

    setSession(user);
    return true;
}

export function logoutUser(): void {
    localStorage.removeItem(SESSION_KEY)
}

