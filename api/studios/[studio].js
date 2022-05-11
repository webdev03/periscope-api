import fetch from "cross-fetch";

export default async function handler(request, response) {
  // The user
  const { studio } = request.query;

  const apiDataFetch = await fetch(
    `https://api.scratch.mit.edu/studios/${studio}/`,
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

  response.status(200).json(apiData);
}
