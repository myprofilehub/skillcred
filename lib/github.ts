import { Octokit } from "octokit";

export async function getGithubProfile(accessToken: string) {
    try {
        const octokit = new Octokit({ auth: accessToken });
        const { data } = await octokit.rest.users.getAuthenticated();

        return {
            username: data.login,
            bio: data.bio,
            avatarUrl: data.avatar_url,
            profileUrl: data.html_url,
            location: data.location,
            company: data.company,
            blog: data.blog
        };
    } catch (error) {
        console.error("Error fetching GitHub profile:", error);
        return null;
    }
}

export async function getGithubRepos(accessToken: string) {
    try {
        const octokit = new Octokit({ auth: accessToken });
        // Fetch public repos, sorted by updated
        const { data } = await octokit.rest.repos.listForAuthenticatedUser({
            visibility: "public",
            sort: "updated",
            per_page: 10
        });

        const enrichedRepos = await Promise.all(
            data.map(async (repo: any) => {
                // Fetch languages for each repo
                const languagesResponse = await octokit.rest.repos.listLanguages({
                    owner: repo.owner.login,
                    repo: repo.name
                });

                const languages = Object.keys(languagesResponse.data);

                return {
                    name: repo.name,
                    description: repo.description,
                    url: repo.html_url,
                    stars: repo.stargazers_count,
                    language: repo.language, // Primary language
                    languages: languages,    // All languages
                    updatedAt: repo.updated_at
                };
            })
        );

        return enrichedRepos;
    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        return [];
    }
}
