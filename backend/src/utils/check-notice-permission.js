const checkNoticeEditPermission = (status, role, authorId, userId) => {
    if (role === 'admin') {
        return authorId === userId;
    }

    switch (status) {
        case 1:
        case 2:
        case 3:
        case 5:
            return authorId === userId;
        default:
            return false;
    }
}

const checkNoticeApprovePermission = (status, role) => {
    if (role === 'admin') {
        switch (status) {
            case 2:
            case 3:
                return true;
            default:
                return false;
        }
    }

    return false;
}

const checkNoticeRejectPermission = (status, role) => {
    if (role === 'admin') {
        switch (status) {
            case 2:
            case 3:
                return true;
            default:
                return false;
        }
    }

    return false;
}

const checkNoticeDeletePermission = (status, role, authorId, userId) => {
    if (role === 'admin') {
        switch (status) {
            case 1:
            case 6:
                return false;
            default:
                return true;
        }
    }

    return authorId === userId;
}
/* */                                                                                                                                                                                                                                                                                                                                                                                  
module.exports = {
    checkNoticeEditPermission,
    checkNoticeApprovePermission,
    checkNoticeDeletePermission,
    checkNoticeRejectPermission
};
