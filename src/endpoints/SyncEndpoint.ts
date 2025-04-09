export default class SyncEndpoint {
  private static API = "http://localhost:9292/sync";

  public static async syncHomeFolder(
    data: SyncData
  ): Promise<ApiResponse<string>> {
    const response = await fetch(SyncEndpoint.API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
}
