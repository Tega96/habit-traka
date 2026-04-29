"use client"

import { useState } from 'react'
import { HabitProps } from '@/types/habit';
import { updateHabit } from '@/lib/habits';
import { memo } from 'react';


const HabitList = () => {
  
  return (
    <div>
      <h2>HabitList</h2>
    </div>
  );
};

export default memo(HabitList);