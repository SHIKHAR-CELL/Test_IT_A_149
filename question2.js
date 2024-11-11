// Hardcoded credentials (for simplicity)
const correctUsername = "shikhar";
const correctPassword = "123";

// DOM Elements
const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const userList = document.getElementById("user-list");
const logoutButton = document.getElementById("logout-button");
const sortDropdown = document.getElementById("sort-users");
const userDetails = document.getElementById("user-details");

// Hardcoded GitHub Users List (For the sake of example, we will fetch them dynamically later)
const users = [
    { username: "mojombo", followers: 2000 },
    { username: "defunkt", followers: 1500 },
    { username: "pjhyett", followers: 1200 },
    { username: "wycats", followers: 900 },
    { username: "ezmobius", followers: 600 },
    { username: "ivey", followers: 400 },
    { username: "evanphx", followers: 350 },
    { username: "vanpelt", followers: 250 },
    { username: "wayneeseguin", followers: 150 },
    { username: "brynary", followers: 100 }
];

// Authenticate user
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check credentials
    if (username === correctUsername && password === correctPassword) {
        loginSection.style.display = "none";
        dashboardSection.style.display = "block";

        // Display user details
        userDetails.innerHTML = `
            <p>Username: ${username}</p>
            <p>Role: Developer</p>
        `;
        
        // Fetch and display users
        fetchGitHubUsers();
    } else {
        alert("Invalid login details.");
    }
});

// Fetch Top 10 GitHub Users
async function fetchGitHubUsers() {
    try {
        const response = await fetch("https://api.github.com/users");
        const data = await response.json();

        // Use the first 10 users (can be customized)
        const topUsers = data.slice(0, 10).map(user => ({
            username: user.login,
            followers: user.followers,
            url: user.html_url
        }));

        // Display users
        displayUsers(topUsers);
    } catch (error) {
        console.error("Error fetching GitHub users:", error);
    }
}

// Display Users in the unordered list
function displayUsers(usersArray) {
    userList.innerHTML = ''; // Clear existing list
    usersArray.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${user.username}</span>
            <span>Followers: ${user.followers}</span>
            <a href="${user.url}" target="_blank">Profile</a>
        `;
        userList.appendChild(li);
    });
}

// Sort users alphabetically
sortDropdown.addEventListener("change", function() {
    const selectedOption = sortDropdown.value;

    if (selectedOption === "alphabetical") {
        const sortedUsers = [...users].sort((a, b) => a.username.localeCompare(b.username));
        displayUsers(sortedUsers);
    } else {
        displayUsers(users); // Default display (unsorted)
    }
});

// Logout functionality
logoutButton.addEventListener("click", function() {
    loginSection.style.display = "block";
    dashboardSection.style.display = "none";
});
