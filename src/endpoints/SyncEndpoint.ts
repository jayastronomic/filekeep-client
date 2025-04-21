export default class SyncEndpoint {
  private static API = "http://localhost:9292";

  public static async startSync(data: SyncData): Promise<string> {
    const response = await fetch(SyncEndpoint.API + "/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  public static async stopSync(): Promise<string> {
    const response = await fetch(SyncEndpoint.API + "/sync", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  }
}
