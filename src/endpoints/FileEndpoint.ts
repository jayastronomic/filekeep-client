const API = import.meta.env.VITE_BACKEND_URL + "/api/v1/files";

async function upload(payload: FormData): Promise<ApiResponse<string>> {
  const response = await fetch(API + "/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: payload,
  });
  return await response.json();
}

async function downloadFile({ fileKey, fileName }: FKFile) {
  try {
    const response = await fetch(API + "/" + fileKey, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to download the file.");
    }
    // Create a blob from the response
    const blob = await response.blob();

    // Create a temporary URL for the blob
    const url = URL.createObjectURL(blob);

    // Create an <a> element and simulate a click to download
    const link = document.createElement("a");
    link.href = url;

    // Use fileName as the downloads name
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
}

async function deleteFile(fileKey: string) {
  const response = await fetch(API + "/" + fileKey, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await response.json();
}

async function shareFile(file: ShareData): Promise<ApiResponse<string>> {
  const response = await fetch(API + "/share", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(file),
  });
  return await response.json();
}

export { upload, downloadFile, deleteFile, shareFile };
