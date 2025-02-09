import { format } from "date-fns";
import { z } from "zod";

// Enum for user status
enum UserStatus {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
}

enum UserRole {
  Donor = "donor",
  Volunteer = "volunteer",
  Admin = "admin",
}

// Zod schema for data validation
const UserSchema = z.object({
  id: z.number(),
  f_name: z.string(),
  l_name: z.string(),
  email: z.string().email(),
  mobile_number: z.string(),
  status: z
    .enum([UserStatus.Active, UserStatus.Inactive, UserStatus.Pending])
    .default(UserStatus.Pending),

  base_role: z
    .enum([UserRole.Admin, UserRole.Volunteer, UserRole.Donor])
    .default(UserRole.Volunteer),
  email_verified_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

type UserData = z.infer<typeof UserSchema>;

export class User {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly name: string;
  readonly email: string;
  readonly mobile: string;
  readonly status: UserStatus;
  readonly role: UserRole;
  readonly verified: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly original: UserData;

  constructor(data: UserData) {
    // Validate incoming data using the schema
    const parsedData = UserSchema.parse(data);
    this.original = parsedData;

    // Initialize properties
    this.id = parsedData.id;
    this.firstName = parsedData.f_name;
    this.lastName = parsedData.l_name;
    this.name = `${this.firstName} ${this.lastName}`;
    this.email = parsedData.email;
    this.mobile = parsedData.mobile_number;
    this.status = parsedData.status;
    this.role = parsedData.base_role;
    this.verified = Boolean(parsedData.email_verified_at);
    this.createdAt = this.formatDate(parsedData.created_at);
    this.updatedAt = this.formatDate(parsedData.updated_at);
  }

  // Method to format date to a human-readable format
  private formatDate(date: string): string {
    if (!date) return "";
    return format(date, "MMM dd, yyyy");
  }

  // Getter methods
  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmail(): string {
    return this.email;
  }

  getMobile(): string {
    return this.mobile;
  }

  getStatus(): UserStatus {
    return this.status;
  }

  getRole(): UserRole {
    return this.role;
  }

  isVerified(): boolean {
    return this.verified;
  }

  getCreatedAt(): string {
    return this.createdAt;
  }

  getUpdatedAt(): string {
    return this.updatedAt;
  }

  getOriginal(): UserData {
    return this.original;
  }

  // Method for serializing to JSON
  toJSON(options?: { includeSensitive: boolean }): Record<string, any> {
    const data: Record<string, any> = {
      id: this.id,
      f_name: this.firstName,
      l_name: this.lastName,
      email: this.email,
      mobile_number: this.mobile,
      status: this.status,
      base_role: this.role,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };

    if (options?.includeSensitive) {
      data.email_verified_at = this.verified ? new Date().toISOString() : null;
    }

    return data;
  }
}
