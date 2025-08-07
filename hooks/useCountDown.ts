import { useState, useEffect, useCallback, useRef } from "react";

interface UseCountDownOptions {
  initialTime?: number; // in seconds
  autoStart?: boolean;
  onComplete?: () => void;
  interval?: number; // in milliseconds
}

interface UseCountDownReturn {
  time: number; // remaining time in seconds
  isRunning: boolean;
  isComplete: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setTime: (time: number) => void;
  formattedTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export const useCountDown = ({
  initialTime = 60,
  autoStart = false,
  onComplete,
  interval = 1000,
}: UseCountDownOptions = {}): UseCountDownReturn => {
  const [time, setTimeState] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  const initialTimeRef = useRef(initialTime);

  // Update ref when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Update initial time ref when it changes
  useEffect(() => {
    initialTimeRef.current = initialTime;
  }, [initialTime]);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Main countdown logic
  useEffect(() => {
    if (!isRunning || time <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeState((prevTime) => {
        const newTime = prevTime - 1;

        if (newTime <= 0) {
          setIsRunning(false);
          setIsComplete(true);

          // Clear interval
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          // Call onComplete callback
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }

          return 0;
        }

        return newTime;
      });
    }, interval) as unknown as NodeJS.Timeout;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, time, interval]);

  const start = useCallback(() => {
    if (time > 0 && !isComplete) {
      setIsRunning(true);
    }
  }, [time, isComplete]);

  const pause = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeState(initialTimeRef.current);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const setTime = useCallback((newTime: number) => {
    if (newTime < 0) {
      newTime = 0;
    }

    setTimeState(newTime);
    setIsComplete(newTime === 0);

    // If setting time to 0, stop the countdown
    if (newTime === 0) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, []);

  // Format time into hours, minutes, seconds
  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return { hours, minutes, seconds: secs };
  }, []);

  return {
    time,
    isRunning,
    isComplete,
    start,
    pause,
    reset,
    setTime,
    formattedTime: formatTime(time),
  };
};
