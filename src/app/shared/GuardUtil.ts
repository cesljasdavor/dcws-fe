
import {StorageService} from "../storage-service.service";
import {Router} from "@angular/router";

export class GuardUtil {

  private constructor() {}

  public static canPass(storageService: StorageService, router: Router, privilege: number, privilageName: string) {
    if(storageService.profilePresent()) {
      let profile = storageService.getMyProfile();

      if(profile.privilege === privilege) {
        return true;
      }

      window.alert("Niste prijavljeni kao '" + privilageName + "' te stoga ne smijete na ovu stranicu");
      router.navigate(['/']);
      return false;
    }

    //ovaj dio bi trebao rješiti AuthGuard pa se vraća samo false
    return false;
  }
}
