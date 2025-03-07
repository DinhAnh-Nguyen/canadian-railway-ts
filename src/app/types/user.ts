// types/user.ts
import { User } from "firebase/auth";

export interface CustomUser extends User {
    roles?: string[];
    firstName?: string;
    lastName?: string;
}