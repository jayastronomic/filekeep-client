import { NotFoundError } from "./errors/NotFoundError";

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

async function getShareableFile(
  token: string
): Promise<ApiResponse<ShareableFileData>> {
  const response = await fetch(API + "/file?token=" + token);
  const data = await response.json();
  if (!response.ok) {
    throw new NotFoundError(data.message);
  }
  return data;
}

async function getShareableFolder(
  token: string
): Promise<ApiResponse<ShareableFolderData>> {
  const response = await fetch(API + "/folder?token=" + token);
  return await response.json();
}

async function updateShareableFileLink(
  payload: UpdateShareableLinkData,
  token: string
): Promise<ApiResponse<FKFile>> {
  const response = await fetch(API + "/file?token=" + token, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  });

  return await response.json();
}

export {
  createShareableLink,
  getShareableFile,
  getShareableFolder,
  updateShareableFileLink,
};
