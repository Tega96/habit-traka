"use client"

import { useState } from "react"
import { HabitProps } from "@/types/habit"
import { updateHabit } from "@/lib/habits"

type HabitListProps = {
    habit: HabitProps;
    userId: string;
    onClose: () => void;
    onUpdate: () => void;
}

const HabitList = ({habit, userId, onClose, onUpdate}: EditHabitModalProps) => {
    const [name, setName] = useState(habit.name);
    const [frequency, setFrequency] = useState<"daily" | "weekly">(habit.frequency);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateHabit(habit.id, userId, { name, frequency });
        onUpdate();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4"> Edit Habit</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        className="w-full p-2 border rounded mb-3"
                        required
                    />
                    <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
                        className="w-full p-2 border rounded mb-4"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                    </select>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default HabitList;