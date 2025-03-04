const API = import.meta.env.VITE_BACKEND_URL + "/api/v1/shareable_links";

async function createShareableLink(
  payload: NewShareableLinkData
): Promise<ApiResponse<ShareableLinkData>> {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  });

  return await response.json();
}

export { createShareableLink };
