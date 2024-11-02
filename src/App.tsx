import React from 'react';
import './App.css';
import WeekdayDateRangePicker from './WeekdayDateRangePicker';

function App() {
  const handleDateRangeChange = (dateRange: [string, string], weekends: string[]) => {
    console.log('Selected Date Range:', dateRange);
    console.log('Weekend Dates in Range:', weekends);
  };

  return (
    <div className="App">
      <h1>Weekday Date Range Picker</h1>
      <WeekdayDateRangePicker onChange={handleDateRangeChange} />
    </div>
  );
}

export default App;
