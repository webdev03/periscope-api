import fetch from "cross-fetch";

export default async function handler(request, response) {
  // The user
  const { user } = request.query;

  const apiDataFetch = await fetch(
    `https://api.scratch.mit.edu/users/${user}/`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Periscope",
      },
    }
  );

  if (!apiDataFetch.ok) {
    response.status(404).json({
      error: true
    });
  }

  const apiData = await apiDataFetch.json();

  const messageCount = await (
    await (
      await fetch(`https://api.scratch.mit.edu/users/${user}/messages/count`, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      })
    ).json()
  ).count;

  response.status(200).json({
    id: apiData.id,
    username: apiData.username,
    scratchteam: apiData.scratchteam,
    history: apiData.history,
    profile: apiData.profile,
    messages: messageCount,
  });
}
