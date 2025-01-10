interface User {
  id: string;
  email: string;
}

interface AuthContextData {
  authUser: User | null;
}
