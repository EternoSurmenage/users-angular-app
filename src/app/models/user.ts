import { Address } from "./address";
import { Job } from "./job";

export class User {
  id: number;
  phone:string;
  userName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  photo: string;
  namePrefix: string;
  email: string;
  address: Address;
  job: Job;
}
