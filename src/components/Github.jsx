import React, { useEffect, useState } from "react";

const Usage = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // Fetch repositories and profile data from GitHub
    const fetchGitHubData = async () => {
      try {
        const repoResponse = await fetch(
          "https://api.github.com/users/aman-yadav-codes/repos"
        ); // Replace <your-username> with your GitHub username
        const profileResponse = await fetch(
          "https://api.github.com/users/aman-yadav-codes"
        );
        const repoData = await repoResponse.json();
        const profileData = await profileResponse.json();

        setRepos(repoData);
        setProfile(profileData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <div className="pt-20 bg-gradient-to-b from-black to-gray-800 min-h-screen text-white">
      <div className="container mx-auto px-8 py-12">
        <div className="flex justify-center items-center mb-6">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt="GitHub Profile"
              className="rounded-full w-32 h-32 border-4 border-orange-400"
            />
          )}
        </div>
        <h1 className="text-4xl font-bold mb-6 text-orange-400 text-center">
          My GitHub Repositories 📂
        </h1>

        {loading ? (
          <p className="text-center text-lg">Loading repositories...</p>
        ) : repos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer"
              >
                <h3 className="text-2xl font-semibold capitalize text-white mb-2">
                  {repo.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {repo.description || "No description provided."}
                </p>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm"
                >
                  Go to Repository →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No repositories found.</p>
        )}
      </div>
      <p className="text-center text-gray-500 dark:text-gray-400 mt-6 italic">
        Explore my repositories and contribute! 🌱
      </p>
    </div>
  );
};

export default Usage;
