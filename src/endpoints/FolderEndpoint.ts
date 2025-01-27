export default class FolderEndpoint {
  private static API = "http://localhost:8080/api/v1/folders";

  public static async getRoot(): Promise<ApiResponse<Folder>> {
    const response = await fetch(FolderEndpoint.API + "/root", {
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
    const response = await fetch(FolderEndpoint.API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });
    console.log(payload);
    return await response.json();
  }

  public static async getFolder(
    folderName: string
  ): Promise<ApiResponse<Folder>> {
    const response = await fetch(FolderEndpoint.API + "/" + folderName, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  }
}
