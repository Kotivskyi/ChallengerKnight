const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });

        next();
    } catch (error) {
        const formattedErrors = error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
        }));

        return res.status(400).json({
            error: "Validation error",
            detail: formattedErrors
        });
    }
}

module.exports = {
    validateRequest
};
