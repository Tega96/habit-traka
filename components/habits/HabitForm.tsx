"use client"

import { useState } from 'react';
import { CreateHabitInputProps } from '@/types/habit';
import { createHabit } from '@/lib/habits';
import { memo } from 'react';

type HabitFormProps = {
  userId: string;
  onHabitCreated: () => void;
};

const HabitForm = ({ userId, onHabitCreated}: HabitFormProps) => {
  const [name, setName] = useState("");
  const [frequency, setFrequency ] = useState<"daily" | "weekly">("daily");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createHabit(userId, {name: name.trim(), frequency});
    setName("");
    setFrequency("daily");
    setIsOpen(false);
    onHabitCreated();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        + Add Habit
      </button>
    )
  }
  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border">
      <input 
        type="text" 
        placeholder="Habit name (e.g., 'Exercise', 'Read')"
        value={name}
        onChange={(e) =>setName(e.target.value)}
        className='w-full p-2 border rounded mb-2'
        autoFocus
        required
      />
      <select 
        value={frequency}
        onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
        className="w-full p-2 border rounded mb-3"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
            Save
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="bg-gray-300  px-4 py-2 rounded hover:bg-green-600"
        >
            Cancel
        </button>

      </div>
    </form>
  );
};

export default memo(HabitForm);