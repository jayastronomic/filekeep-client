const API = import.meta.env.VITE_BACKEND_URL + "/api/v1/folders";

async function createFolder(payload: NewFolder): Promise<ApiResponse<Folder>> {
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

async function getFolder(folderName: string): Promise<ApiResponse<Folder>> {
  const response = await fetch(API + "/" + folderName, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await response.json();
}
async function deleteFolder(id: string) {
  const response = await fetch(API + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await response.json();
}
async function shareFolder(folder: ShareData): Promise<ApiResponse<string>> {
  const response = await fetch(API + "/share", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(folder),
  });
  return await response.json();
}

export { createFolder, getFolder, deleteFolder, shareFolder };
