"use client"

import { memo } from 'react';
import { HabitProps, } from '@/types/habit';
import { isCompletedToday, getCurrentStreak, completeHabit, uncompleteHabit, deleteHabit } from '@/lib/habits';
import { useState } from 'react';

type HabitCardProps = {
  habit: HabitProps;
  userId: string;
  onUpdate: () => void; // Refresh parent list
  onEdit: (habit: HabitProps) => void; // Open edit modal
}

const HabitCard = ({habit, userId, onUpdate, onEdit}: HabitCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const completedToday = isCompletedToday(habit);
  const streak = getCurrentStreak(habit);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    if (completedToday) {
      uncompleteHabit(habit.id, userId);
    } else {
      completeHabit(habit.id, userId);
    }

    setIsLoading(false);
    onUpdate();
  };

  const handleDelete = () => {
    if (confirm(`Delete habit"${habit.name}"`)) {
      deleteHabit(habit.id, userId);
      onUpdate();
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{habit.name}</h3>
          <p className="text-sm text-gray-500">
            {habit.frequency === 'daily' ? 'Daily': 'Weekly'}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            🔥 Streak: {streak} {streak === 1 ? "day" : "days"}
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            className="text-blue-500 hover:text-blue-700"
            onClick={() => onEdit(habit)}
            disabled={isLoading}
          >✏️ Edit</button>
          <button 
            className="text-red-500 hover:text-red-700"
            onClick={handleDelete}
            disabled={isLoading}
          >🗑️ Delete</button>
        </div>
      </div>

      <div className="mt-3">
        <button
          onClick={handleToggleComplete}
          disabled={isLoading}
          className={`w-full py-2 rounded transition ${
            completedToday
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {completedToday ? "✅ Completed today" : "⬜ Mark complete"}
        </button>
      </div>
    </div>
  );
};

export default memo(HabitCard);
