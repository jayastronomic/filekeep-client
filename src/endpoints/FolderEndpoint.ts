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

async function getFolder(folderId: string): Promise<ApiResponse<Folder>> {
  const response = await fetch(API + "/" + folderId, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await response.json();
}

async function getRootFolder(): Promise<ApiResponse<Folder>> {
  const response = await fetch(API + "/home", {
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

async function syncHomeFolder(formData: FormData) {
  const response = await fetch(API + "/sync/manual", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });
  return await response.json();
}

export {
  createFolder,
  getRootFolder,
  getFolder,
  deleteFolder,
  shareFolder,
  syncHomeFolder,
};
