import { v4 as uuidv4 } from 'uuid';
import { HabitProps, CreateHabitInputProps, UpdateHabitInputProps } from '@/types/habit';

const HABIT_KEY = "habit-tracker-habits";

// Get all habits for a specific user
export function getHabitsForUser(userId: string): HabitProps[] {
    const raw = localStorage.getItem(HABIT_KEY);
    if (!raw) return [];
    const allHabits: HabitProps[] = JSON.parse(raw);
    return allHabits.filter(habit => habit.userId === userId);
}

// Get a single habit by ID 
export function getHabitsById(habitId: string, userId: string): HabitProps | null {
    const habits = getHabitsForUser(userId);
    return habits.find(h => h.id === habitId) || null;
}

// Create a new habit
export function creteHabit(userId: string, input: CreateHabitInputProps): HabitProps {
    const now = new Date().toISOString();
    const newHabit: HabitProps = {
        id: uuidv4(),
        userId,
        name: input.name,
        frequency: input.frequency,
        completions: [],
        createdAt: now,
        updatedAt: now,
    }

    const raw = localStorage.getItem(HABIT_KEY);
    const allHabits: HabitProps[] = raw ? JSON.parse(raw) : [];
    allHabits.push(newHabit)
    localStorage.setItem(HABIT_KEY, JSON.stringify(allHabits));

    return newHabit;
}

// Update a habit name or frequency
export function updateHabit(
    habitId: string,
    userId: string,
    input: UpdateHabitInputProps
): HabitProps | null {
    const raw = localStorage.getItem(HABIT_KEY);
    if (!raw) return null;

    const allHabits = JSON.parse(raw);
    // const allHabits: HabitProps[] = JSON.parse(raw);
    const habitIndex = allHabits.findIndex(h => h.id === habitId && h.userId === userId);

    if (habitIndex === -1) return null;

    const updatedHabit = {
        ...allHabits[habitIndex],
        ...input,
        updatedAt: new Date().toISOString(),
    }

    allHabits[habitIndex] = updateHabit;
    localStorage.setItem(HABIT_KEY, JSON.stringify(allHabits));

    return updatedHabit
}

// Delet a HabitProps
export function deleteHabit(habitId: string, userId: string): boolean {
    const raw = localStorage.getItem(HABIT_KEY);
    if (!raw) return false;

    const allHabits: HabitProps[] = JSON.parse(raw);
    const filtered = allHabits.filter(h => !(h.id === habitId && h.userId === userId));

    if (filtered.length === allHabits.length) return false;

    localStorage.setItem(HABIT_KEY, JSON.stringify(filtered));
    return true;
}

// Mark habit as complete for a specific date (default to today)
export function completeHabit(
    habitId: string,
    userId: string,
    date: string = new Date().toISOString().split('T')[0]
): HabitProps[] | null {
    const raw = localStorage.getItem(HABIT_KEY);
    if (!raw) return null;

    const allHabits: HabitProps[] = JSON.parse(raw);
    const habitIndex = allHabits.findIndex(h => h.id === habitId && h.userId === userId);

    if (habitIndex === -1) return null;

    const habit = allHabits[habitIndex];
    if (!habit.completions.includes(date)) {
        habit.completions.push(date);
        habit.completions.sort(); // Keep dates in order
        habit.updatedAt = new Date().toISOString();
        allHabits[habitIndex] = habit;
        localStorage.setItem(HABIT_KEY, JSON.stringify(allHabits));
    }

    return habit;
}

// Unmark habit (remove completion for a specific date)
export function uncompleteHabit(
    habitId: string,
    userId: string,
    date: string = new Date().toISOString().split('T')[0]
): HabitProps | null {
    const raw = localStorage.getItem(HABIT_KEY);
    if (!raw) return null;

    const allHabits: HabitProps[] = JSON.parse(raw);
    const habitIndex = allHabits.findIndex(h => h.id === habitId && h.userId === userId);

    if (habitIndex === -1) return null;

    const habit = allHabits[habitIndex];
    const completionIndex = habit.completions.indexOf(date);
    if (completionIndex !== -1) {
        habit.completions.splice(completionIndex, 1);
        habit.updatedAt = new Date().toISOString();
        allHabits[habitIndex] = habit;
        localStorage.setItem(HABIT_KEY, JSON.stringify(allHabits));
    }

    return habit;
}

// Calculate current streak for a habit
export function getCurrentStreak(habit: HabitProps): number {
    const today = new Date().toISOString().split('T')[0];
    const completions = habit.completions;

    if (completions.length === 0) return 0;

    // For daily habits, check consecutive days ending today
    if (habit.frequency === 'daily') {
        let streak = 0;
        let currentDate = new Date(today)
        
        while (true) {
            const dateStr = currentDate.toISOString().split('T')[0];
            if (completions.includes(dateStr)) {
                streak++;
                currentDate.setDate(currentDate.getDate() -1); 
            } else {
                break;
            }
        }
    }

    // For weekly habits: check if completed this week, the last week etc
    if (habit.frequency === 'weekly') {
        // Simple version: count unique weeks with completions
        const weeks = new Set<string>();
        completions.forEach(date => {
            const week = getWeekNumber(new Date(date));
            week.add(week);
        });
        return weeks.size;
    }

    return 0;
}

// Helper: Get week number (YYYY-WW) for a date
function getWeekNumber(date: Date): string {
    const year = date.getFullYear();
    const firstJan = new Date(year, 0, 1);
    const days = Math.floor((date.getTime() = firstJan.getTime())) / (24 * 60 * 60 * 1000);
    const week = Math.ceil((days + firstJan.getDay() + 1) / 7)
    return `${year}-W${week.toString().padStart(2, '0')}`;
}

// Check if habit is completed today
export function isCompletedToday(habit: HabitProps): boolean {
    const today = new Date().toISOString().split('T')[0];
    return habit.completions.includes(today);
}

// Get complete count for current week
export function getCurrentCompletionCount(habit: HabitProps): number {
    const currentWeek = getWeekNumber(new Date());
    return habit.completions.filter(date => getWeekNumber(new Date(date)) === currentWeek).length 
}