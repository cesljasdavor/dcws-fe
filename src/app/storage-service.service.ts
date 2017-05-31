import { Injectable } from '@angular/core';
import {User} from "./shared/user";

@Injectable()
export class StorageService {

  constructor() { }

  private profileKey: string = "myProfile";

  getMyProfile(): User {
    let userString = localStorage.getItem(this.profileKey);

    if(userString === null) {
      return null;
    }

    let profile: User = <User>JSON.parse(userString);
    profile.date_of_birth = new Date(profile.date_of_birth);

    return profile;
  }

  storeProfile(profile: User) {
    localStorage.setItem(this.profileKey, JSON.stringify(profile));
  }

  deleteStoredProfile() {
    localStorage.removeItem(this.profileKey);
  }

  profilePresent(): boolean {
    return this.getMyProfile() !== null;
  }
}
