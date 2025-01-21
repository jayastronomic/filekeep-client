export default class FileEndpoint {
  private static API = "http://localhost:8080";

  public static async upload(payload: FormData): Promise<ApiResponse<unknown>> {
    const response = await fetch(FileEndpoint.API + "/api/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: payload,
    });
    return await response.json();
  }
}
