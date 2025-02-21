export default class SharedAccessEndpoint {
  private static API = import.meta.env.VITE_BACKEND_URL + "/api/v1/shared";

  public static async getSharedAssets(): Promise<
    ApiResponse<(SharedAccessFile | SharedAccessFolder)[]>
  > {
    const response = await fetch(SharedAccessEndpoint.API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Could not fetch shared assets");
    return await response.json();
  }
}
