async function fetchRepos() {
  const username = document.getElementById("username").value;
  const reposContainer = document.getElementById("repos");

  try {
    // Fetch user data
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    const userData = await userResponse.json();

    // Fetch user's repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const reposData = await reposResponse.json();

    // Display user information and repositories
    reposContainer.innerHTML = `
                    <h2>${userData.name || username}'s Repositories</h2>
                    <ul>
                        ${reposData
                          .map(
                            (repo) =>
                              `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
                          )
                          .join("")}
                    </ul>
                `;
  } catch (error) {
    console.error("Error fetching data:", error);
    reposContainer.innerHTML =
      "<p>Error fetching data. Please check the username and try again.</p>";
  }
}
