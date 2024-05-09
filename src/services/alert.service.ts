import { BehaviorSubject } from "rxjs";

const alertSubject: any = new BehaviorSubject(null);

export const alertService = {
  alert: alertSubject.asObservable(),
  success,
  error,
  clear,
};

function success(message: any, showAfterRedirect = false) {
  alertSubject.next({
    type: "alert-success",
    message,
    showAfterRedirect,
  });
}

function error(message: any, showAfterRedirect = false) {
  alertSubject.next({
    type: "alert-danger",
    message,
    showAfterRedirect,
  });
}

// clear alerts
function clear() {
  // if showAfterRedirect flag is true the alert is not cleared
  // for one route change (e.g. after successful registration)
  let alert = alertSubject.value;
  if (alert?.showAfterRedirect) {
    alert.showAfterRedirect = false;
  } else {
    alert = null;
  }
  alertSubject.next(alert);
}
