export default class FolderEndpoint {
  private static API = "http://localhost:8080";

  public static async getRoot(): Promise<ApiResponse<Folder>> {
    const response = await fetch(FolderEndpoint.API + "/api/v1/root", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  }

  public static async createFolder(
    payload: NewFolder
  ): Promise<ApiResponse<Folder>> {
    const response = await fetch(FolderEndpoint.API + "/api/v1/create_folder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });
    return await response.json();
  }
}
