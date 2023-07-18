// Check if a user is already logged in
function checkLoggedIn() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    showGoalSection();
  } else {
    showRegistrationForm();
  }
}

// Display the registration form
function showRegistrationForm() {
  document.getElementById('registrationForm').style.display = 'block';
  document.getElementById('goalSection').style.display = 'none';
  document.getElementById('suggestionsSection').style.display = 'none';
}

// Display the goal tracking section
function showGoalSection() {
  document.getElementById('registrationForm').style.display = 'none';
  document.getElementById('goalSection').style.display = 'block';
  document.getElementById('suggestionsSection').style.display = 'block';
}

// Handle registration form submission
function handleRegistration(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Here, you would typically send the registration data to a server for user creation
 
  localStorage.setItem('loggedInUser', email);

  showGoalSection();
}

// Handle goal form submission
function handleGoalSubmission(event) {
  event.preventDefault();

  const goalWeight = parseFloat(document.getElementById('goalWeight').value);

  // send the goal data to a server for storage
  
  localStorage.setItem('goalWeight', goalWeight);

  displayGoalProgress(goalWeight);
}

// Calculate and display the goal progress
function displayGoalProgress(goalWeight) {
  const currentWeight = 70; // Example weight, replace with actual weight data
  const goalProgress = ((currentWeight - goalWeight) / goalWeight) * 100;
  const goalProgressDiv = document.getElementById('goalProgress');
  goalProgressDiv.textContent = `Goal progress: ${goalProgress.toFixed(2)}%`;
}

// Get food suggestion
function getFoodSuggestion() {
  const appId = '00f96a62'; 
  const appKey = '18595481a53f842d3b3e499d09e2ebfe'; 
  const foodSuggestionDiv = document.getElementById('foodSuggestion');
  foodSuggestionDiv.textContent = 'Loading...';

  // API call to Edamam API
  fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=high+protein+foods&app_id=${appId}&app_key=${appKey}`)
    .then(response => response.json())
    .then(data => {
      const suggestions = data.parsed.map(item => item.food.label);
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      foodSuggestionDiv.textContent = `Food Suggestion: ${randomSuggestion}`;
    })
    .catch(error => {
      console.error('Error retrieving food suggestion:', error);
      foodSuggestionDiv.textContent = 'Error retrieving food suggestion';
    });
}

// Get exercise suggestion
function getExerciseSuggestion() {
  //  make an API call to retrieve an exercise suggestion based on the user's weight gain goals

  const exerciseSuggestionDiv = document.getElementById('exerciseSuggestion');
  exerciseSuggestionDiv.textContent = 'Loading...';

  // Simulated API call to Wger API
  fetch('https://wger.de/api/v2/exercise/')
    .then(response => response.json())
    .then(data => {
      const exercises = data.results.map(item => item.name);
      const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
      exerciseSuggestionDiv.textContent = `Exercise Suggestion: ${randomExercise}`;
    })
    .catch(error => {
      console.error('Error retrieving exercise suggestion:', error);
      exerciseSuggestionDiv.textContent = 'Error retrieving exercise suggestion';
    });
}

// Attach event listeners
document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
document.getElementById('goalSection').addEventListener('submit', handleGoalSubmission);
document.getElementById('foodSuggestionBtn').addEventListener('click', getFoodSuggestion);
document.getElementById('exerciseSuggestionBtn').addEventListener('click', getExerciseSuggestion);

// Check if the user is logged in or show the registration form
checkLoggedIn();
