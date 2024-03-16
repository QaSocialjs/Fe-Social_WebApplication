export const enum TypeNotification {
  friendReq = 1,
  messageNo,
}

export function formatNotificationType(notificationType: TypeNotification) {
  switch (notificationType) {
    case TypeNotification.friendReq:
      return TypeNotification.friendReq;
    case TypeNotification.messageNo:
      return TypeNotification.messageNo;
  }
}
