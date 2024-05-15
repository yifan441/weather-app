// Formats Date object to yyyy-mm-dd
function formatDate(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Add 1 b/c months are zero-based
  const day = String(dateObj.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

// Handles possible errors from querying Visual Crossing API
function handleError(error) {
  if (error.response) {
    // Request made, but server gave back error
    if (error.response.status === 400) {
      window.alert('Invalid location, please try again.');
    } else if (error.response.status === 401) {
      window.alert('You are not authorized to make this request');
    } else if (error.response.status === 429) {
      window.alert('Request amount exceeded');
    }
  } else if (error.request) {
    // Request made, but no response recieved
    console.log(error.request);
  } else {
    console.log(error.message);
  }
}

// Returns Date object of next occurence of a given day
function getNextOccurenceOfWeekday(relativeDate, dayOfWeek) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = relativeDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const targetDay = days.indexOf(dayOfWeek);

  // Calculate the number of days until the next occurrence of the named day
  let daysToAdd = targetDay - currentDay;
  if (daysToAdd <= 0) {
    daysToAdd += 7; // If the named day has already occurred this week, add 7 days to get to the next occurrence
  }

  // Adjust the date to the next occurrence of the named day
  const nextOccurrence = new Date(relativeDate);
  nextOccurrence.setDate(relativeDate.getDate() + daysToAdd);

  return nextOccurrence;
}

// Returns Date object of previous occurence of a given day
function getPrevOccurenceOfWeekday(relativeDate, dayOfWeek) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = relativeDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const targetDay = days.indexOf(dayOfWeek);

  // Calculate the number of days until the previous occurrence of the named day
  let daysToSubtract = currentDay - targetDay;
  if (daysToSubtract <= 0) {
    daysToSubtract += 7; // If the named day has not yet occurred this week, subtract 7 days to get to the previous occurrence
  }

  // Adjust the date to the previous occurrence of the named day
  const previousOccurrence = new Date(relativeDate);
  previousOccurrence.setDate(relativeDate.getDate() - daysToSubtract);

  return previousOccurrence;
}

export { formatDate, getNextOccurenceOfWeekday, getPrevOccurenceOfWeekday, handleError };
