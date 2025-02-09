export default class FileEndpoint {
  private static API = import.meta.env.VITE_BACKEND_URL + "/api/v1/files";

  public static async upload(payload: FormData): Promise<ApiResponse<string>> {
    const response = await fetch(FileEndpoint.API + "/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: payload,
    });
    return await response.json();
  }

  public static async downloadFile(fileKey: string, fileName: string) {
    try {
      const response = await fetch(FileEndpoint.API + "/" + fileKey, {
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

  public static async deleteFile(fileKey: string) {
    const response = await fetch(FileEndpoint.API + "/" + fileKey, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  }
}
