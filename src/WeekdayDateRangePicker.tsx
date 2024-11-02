import React, { useState } from 'react';

type WeekdayDateRangePickerProps = {
  onChange: (dateRange: [string, string], weekends: string[]) => void;
  predefinedRanges?: { label: string; start: Date; end: Date }[];
};

const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({ onChange, predefinedRanges }) => {
  // State to track the selected start and end dates
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  // State to control the displayed month and year in the date picker
  const [displayMonth, setDisplayMonth] = useState(new Date().getMonth());
  const [displayYear, setDisplayYear] = useState(new Date().getFullYear());

  // Utility function to check if a given date is a weekend (Saturday or Sunday)
  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 6 || day === 0; // 0 = Sunday, 6 = Saturday
  };

  // Get an array of dates between start and end, inclusive
  const getDatesInRange = (start: Date, end: Date): Date[] => {
    const dates = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
    return dates;
  };

  // Filter out weekend dates within a selected date range
  const getWeekendDatesInRange = (start: Date, end: Date): string[] => {
    return getDatesInRange(start, end)
      .filter(isWeekend)
      .map(date => date.toISOString().split('T')[0]); // Format to YYYY-MM-DD
  };

  // Handle date selection logic, ensuring only weekdays are selected
  const handleDateClick = (date: Date) => {
    if (isWeekend(date)) return; // Prevent selection of weekends
    if (!startDate || (startDate && endDate)) {
      // Set start date and reset end date if both dates have been selected
      setStartDate(date);
      setEndDate(null);
    } else {
      // Set end date and trigger onChange with the selected range and weekend dates
      setEndDate(date);
      const weekends = getWeekendDatesInRange(startDate, date);
      onChange([startDate.toISOString().split('T')[0], date.toISOString().split('T')[0]], weekends);
    }
  };

  // Move to the next month; adjust year if the current month is December
  const incrementMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1); // Move to January of the next year
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  // Move to the previous month; adjust year if the current month is January
  const decrementMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1); // Move to December of the previous year
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  // Directly set the year based on user input
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayYear(Number(event.target.value));
  };

  // Set predefined date range when a button is clicked
  const handlePredefinedRangeClick = (range: { start: Date; end: Date }) => {
    setStartDate(range.start);
    setEndDate(range.end);
    const weekends = getWeekendDatesInRange(range.start, range.end);
    onChange([range.start.toISOString().split('T')[0], range.end.toISOString().split('T')[0]], weekends);
  };

  // Helper function to get the short name of the day (e.g., "Mon", "Tue")
  const getDayName = (date: Date) => {
    return date.toLocaleString('en-US', { weekday: 'short' });
  };

  return (
    <div className="date-range-picker">
      {/* Month and Year navigation */}
      <div className="navigation">
        <button onClick={decrementMonth}>Previous Month</button>
        
        {/* Month Display */}
        <span>{displayMonth + 1} /</span>
        
        {/* Year Selection Dropdown */}
        <select value={displayYear} onChange={handleYearChange}>
          {/* Populate with a range of years (e.g., from 2020 to 2030) */}
          {Array.from({ length: 11 }, (_, i) => 2020 + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        
        <button onClick={incrementMonth}>Next Month</button>
      </div>
      
      {/* Calendar grid displaying dates and day names */}
      <div className="calendar-grid">
        {Array.from({ length: 31 }, (_, i) => {
          const date = new Date(displayYear, displayMonth, i + 1);
          if (date.getMonth() !== displayMonth) return null; // Skip dates that aren't in the current month
          
          const isWithinRange =
            startDate && endDate && date >= startDate && date <= endDate;
          
          return (
            <button
              key={i}
              className={`${isWeekend(date) ? 'weekend' : 'weekday'} ${
                isWithinRange && !isWeekend(date) ? 'selected' : ''
              }`}
              onClick={() => handleDateClick(date)}
            >
              <div>{date.getDate()}</div>
              <div className="day-name">{getDayName(date)}</div>
            </button>
          );
        })}
      </div>
      
      {/* Display predefined date range buttons, if provided */}
      {predefinedRanges && predefinedRanges.map((range) => (
        <button key={range.label} onClick={() => handlePredefinedRangeClick(range)}>
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default WeekdayDateRangePicker;
