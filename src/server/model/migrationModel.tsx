import { randomUUID } from "crypto";

export class Migration {
  email: string;
  url: string;
  applicationId: number;
  createdAt: Date;

  constructor(email: string, applicationId: number) {
    this.email = email;
    this.applicationId = applicationId;
    this.url = randomUUID();
    this.createdAt = new Date();
  }
}
