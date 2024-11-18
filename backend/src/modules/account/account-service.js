const { v4: uuidV4 } = require("uuid");
const { env, db } = require("../../config");

const {
  ApiError,
  generateHashedPassword,
  generateToken,
  generateCsrfHmacHash,
  verifyPassword,
} = require("../../utils");
const {
  changePassword,
  getUserRoleNameByUserId,
  getStudentAccountDetail,
  getStaffAccountDetail,
} = require("./account-repository");
const { insertRefreshToken, findUserById } = require("../../shared/repository");

const processPasswordChange = async (payload) => {
  const client = await db.connect();
  try {
    const { userId, oldPassword, newPassword } = payload;
    await client.query("BEGIN");

    const user = await findUserById(userId);
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    const { password: passwordFromDB } = user;
    await verifyPassword(passwordFromDB, oldPassword);

    const roleName = await getUserRoleNameByUserId(userId, client);
    if (!roleName) {
      throw new ApiError(404, "Role does not exist for user");
    }

    const hashedPassword = await generateHashedPassword(newPassword);
    await changePassword({ userId, hashedPassword }, client);

    const csrfToken = uuidV4();
    const csrfHmacHash = generateCsrfHmacHash(csrfToken);
    const accessToken = generateToken(
      { id: userId, role: roleName, csrf_hmac: csrfHmacHash },
      env.JWT_ACCESS_TOKEN_SECRET,
      env.JWT_ACCESS_TOKEN_TIME_IN_MS
    );
    const refreshToken = generateToken(
      { id: userId },
      env.JWT_REFRESH_TOKEN_SECRET,
      env.JWT_REFRESH_TOKEN_TIME_IN_MS
    );

    await insertRefreshToken({ userId, refreshToken }, client);

    await client.query("COMMIT");

    return {
      refreshToken,
      accessToken,
      csrfToken,
      message: "Password changed successfully",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const processGetAccountDetail = async (userId) => {
  const user = await findUserById(userId);
  if (!user || !user.id) {
    throw new ApiError(404, "User does not exist");
  }

  const { role_id } = user;
  if (role_id === 3) {
    const studentAccountDetail = await getStudentAccountDetail(userId);
    if (!studentAccountDetail) {
      throw new ApiError(404, "Account detail not found");
    }

    return studentAccountDetail;
  }

  const staffAccountDetail = await getStaffAccountDetail(userId, role_id);
  if (!staffAccountDetail) {
    throw new ApiError(404, "Account detail not found");
  }
  return staffAccountDetail;
};

module.exports = {
  processPasswordChange,
  processGetAccountDetail,
};
