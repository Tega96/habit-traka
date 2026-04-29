export type HabitProps = {
    id: string;
    userId: string;
    name: string;
    frequency: "daily" | "weekly";
    completions: string[];
    createdAt: string;
    updatedAt: string;
}

export type CreateHabitInputProps = {
    name: string;
    frequency: "daily" | "weekly";
}

export type UpdateHabitInputProps = Partial<Pick<HabitProps, "name" | "frequency">>;