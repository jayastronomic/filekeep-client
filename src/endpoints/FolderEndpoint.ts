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
}
