export function TypeErrorAuthenticate(typeErr: string) {
  switch (typeErr) {
    case "UnconfirmEmail":
      return -1;
    case "AccountNotExist":
      return 2;
    default:
      return 1;
  }
}
