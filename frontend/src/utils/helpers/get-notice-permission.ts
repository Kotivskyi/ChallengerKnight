export const isEditPermissionAvailable = (
  authorId: number,
  statusId: number,
  userId: number | undefined
) => {
  if (authorId === userId) {
    return statusId == 6;
  }
  return authorId !== userId;
};

export const isApprovePermissionAvailable = (status: number) => {
  switch (status) {
    case 2:
      return false;
    default:
      return true;
  }
};

export const isRejectPermissionAvailable = (status: number) => {
  switch (status) {
    case 2:
    case 4:
    case 5:
      return false;
    default:
      return true;
  }
};

export const isDeletePermissionAvailable = (
  authorId: number,
  status: number,
  userId: number | undefined
) => {
  if (authorId === userId) {
    switch (status) {
      case 1:
      case 6:
        return true;
      default:
        return false;
    }
  }
  return authorId !== userId;
};
