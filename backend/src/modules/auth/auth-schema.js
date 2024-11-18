const { z } = require("zod");

const LoginSchema = z.object({
    body: z.object({
        username: z.string().min(1, "Username is required"),
        password: z.string().min(6, "Password must be at least 6 characters long")
    })
});

module.exports = {
    LoginSchema
};
