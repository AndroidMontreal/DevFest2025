'use client';
import React, { Suspense } from 'react';
import ScheduleContent from '@/components/elements/ScheduleContent';

// Main component that wraps ScheduleContent in Suspense
export default function SchedulePage() {
  return (
    <Suspense
      fallback={
        <div className="py-8 sm:py-16 min-h-screen flex items-center justify-center">
          <div className="text-gray-500">Loading schedule...</div>
        </div>
      }
    >
      <ScheduleContent />
    </Suspense>
  );
}
