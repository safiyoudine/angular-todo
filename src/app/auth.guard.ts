import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)//when i have function i cant use constructor in that case use inject

  let isLoggedIn = sessionStorage.getItem("authToken");
  if (isLoggedIn == null || isLoggedIn == "") {
    alert("Please Login,Redirecting to Login Page !!")
    router.navigate(['login'])
    return false;
  }
  return true;
};
