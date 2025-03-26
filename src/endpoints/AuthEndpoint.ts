export default class AuthEndpoint {
  private static API = import.meta.env.VITE_BACKEND_URL + "/api/v1/auth";

  public static async login(payload: LoginData): Promise<ApiResponse<string>> {
    const response = await fetch(AuthEndpoint.API + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse<string> = await response.json();

    return data;
  }

  public static async register(payload: NewUser): Promise<ApiResponse<string>> {
    const response = await fetch(AuthEndpoint.API + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data: ApiResponse<string> = await response.json();
    if (response.status === 400) throw new Error(data.message);
    return data;
  }

  public static async isLoggedIn(): Promise<ApiResponse<AuthUser>> {
    const response = await fetch(AuthEndpoint.API + "/logged_in", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  }
}
