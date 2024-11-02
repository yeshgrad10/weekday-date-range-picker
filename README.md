**Weekday Date Range Picker**

A date range picker component built with React and TypeScript that allows users to select only weekdays as the start and end dates. The component prevents users from selecting weekends and highlights weekdays within the selected date range. It also includes features like month/year navigation and predefined date ranges for easy selection.

**Features**

Weekday-Only Selection: Users can only select weekdays (Monday through Friday) for the start and end dates of the range.
Weekend Restriction: Weekends (Saturday and Sunday) are visually differentiated and cannot be selected.
Date Range Highlighting: The selected date range highlights only weekdays, with weekends excluded from the highlight.
Month and Year Navigation: Users can change the month and year displayed in the date picker.
Predefined Date Ranges: Includes predefined ranges, such as "Last 7 Days" and "Last 30 Days" for quick selection.
Day Name Display: Each date displays the weekday name (e.g., Mon, Tue) for easy identification.

**Installation**

To run this project locally, follow these steps:

1. Clone the Repository:
git clone https://github.com/yourusername/weekday-date-range-picker.git

2. Navigate to the Project Directory:
cd weekday-date-range-picker

3. Install Dependencies: Make sure you have Node.js installed, then run:
npm install

4. Run the Application: Start the development server with:
npm start

The application will be available at http://localhost:3000.

**Usage**

After starting the application:

Select a Start Date and an End Date:

Click on a weekday to set it as the start date.
Click another weekday to set it as the end date.
View the Selected Range and Weekends:

The component highlights the selected range of weekdays.
Any weekends within the selected range are detected and logged to the console.
Change Month and Year:

Use the "Previous Month" and "Next Month" buttons to navigate between months.
Use the year dropdown to change the displayed year.

**Code Overview**

**Main Files**

src/components/WeekdayDateRangePicker.tsx: The main component file, containing all logic for date selection, weekend restrictions, and month/year navigation.
src/styles/index.css: The CSS file for styling the component, including visual differentiation of weekdays and weekends.
src/App.tsx: The main application file where the WeekdayDateRangePicker component is rendered and tested.

**Key Functions**

handleDateClick: Manages the selection of the start and end dates, ensuring only weekdays are selected.
incrementMonth / decrementMonth: Allows users to navigate between months.
handleYearChange: Handles the selection of a different year.
getWeekendDatesInRange: Identifies weekends within a selected range.
onChange Handler: Logs the selected date range and any weekends within that range.

**Testing the Change Handler**

The onChange handler logs two pieces of information to the console when a date range is selected:

Selected Date Range: An array with the start and end dates in YYYY-MM-DD format.
Weekend Dates: An array of weekend dates within the selected range.

**To test this:**

Open the Developer Console in your browser.
Select a start and end date within the component.
Verify that the console displays the selected range and any weekends in that range.

**Technologies Used**

React: For building the UI.
TypeScript: For type safety and better code organization.
CSS: For styling the component.
