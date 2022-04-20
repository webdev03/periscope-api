import fetch from "cross-fetch";

export default async function handler(request, response) {
  // The user
  const { user } = request.query;
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
    username: user,
    messages: messageCount
  });
}
