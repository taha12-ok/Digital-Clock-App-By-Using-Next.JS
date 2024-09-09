"use client"; 

import { useState, useEffect, useMemo } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DigitalClockComponent() {
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true); 
    const interval = setInterval(() => {
      setTime(new Date()); 
    }, 1000);
    return () => clearInterval(interval); 
  }, []);

  const formattedTime = useMemo<string>(() => {
    if (!mounted) return ""; 
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0") 
      : (time.getHours() % 12 || 12).toString().padStart(2, "0"); 
    const minutes = time.getMinutes().toString().padStart(2, "0"); 
    const seconds = time.getSeconds().toString().padStart(2, "0"); 
    return `${hours}:${minutes}:${seconds}`; 
  }, [time, is24Hour, mounted]); 

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Center the digital clock within the screen */}
      <Card className="p-8 shadow-lg rounded-2xl">
        <div className="flex flex-col items-center justify-center">
          {/* Header with title */}
          <div className="text-2xl font-bold tracking-tight">Digital Clock</div>
          {/* Description */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Display current time in hours, minutes, and seconds.
          </div>
          {/* Display the formatted time */}
          <div className="text-6xl font-bold tracking-tight">
            {formattedTime}
          </div>
          {/* Buttons to switch between 24-hour and 12-hour formats */}
          <div className="mt-4 flex items-center">
            <Button
              variant={is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(true)}
              className="mr-2 font-bold"
            >
              24-Hour Format
            </Button>
            <Button
              variant={!is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(false)}
              className="mr-2 font-bold"
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}