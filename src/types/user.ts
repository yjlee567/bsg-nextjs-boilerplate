type Role = "admin" | "user";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export type { Role, User };
