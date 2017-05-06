import { Pipe, PipeTransform } from '@angular/core';
import {UserView} from "./userView";

@Pipe({
  name: 'searchNameSurname'
})
export class SearchNameSurnamePipe implements PipeTransform {

  transform(users: UserView[], searched: string): UserView[] {
    if(!searched) {
      return users;
    }
    return users.filter((u: UserView) => u.name.concat(" ", u.surname).toUpperCase().includes(searched.toUpperCase()));
  }

}
