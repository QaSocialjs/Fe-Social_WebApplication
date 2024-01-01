export function TypeErrorAuthenticate(typeErr: string) {
  switch (typeErr) {
    case "UnconfirmEmail":
      return -1;
    default:
      return 1;
  }
}
