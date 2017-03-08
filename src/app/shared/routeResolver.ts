import {ActivatedRoute, UrlSegment, Router} from "@angular/router";

export class RouteResolver {
  private static currentPath(route: ActivatedRoute):string[] {
    let pathParts: string [] = [];
    const activatedRouteParts = route.pathFromRoot;
    for(let activatedRoutePart of activatedRouteParts) {
      const subs = activatedRoutePart.url.subscribe(
        (routeSegments: UrlSegment[]) => {
          for(let routeSegment of routeSegments) {
            pathParts.push(routeSegment.path);
          }
        }
      );
      subs.unsubscribe();
    }
    return pathParts;
  }

  static goToFragment(router: Router, route: ActivatedRoute, fragmentName: string) {
    router.navigate(RouteResolver.currentPath(route), {fragment: fragmentName});
    const subs = route.fragment.subscribe(
      f => {
        const element = document.querySelector("#" + f);
        if(element) element.scrollIntoView(element);
      }
    );
    subs.unsubscribe();
  }



}
