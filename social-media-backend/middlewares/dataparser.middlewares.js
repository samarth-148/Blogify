/** @format */

const { z } = require("zod");

const userValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$#]/),
});

const postdataValidationSchema = z.object({
  description: z.string().max(100),
  postType: z.string(),
});

function validatePost(req, res, next) {
  const data = req.body;
  const result = postdataValidationSchema.safeParse(data);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  next();
}
function validateUser(req, res, next) {
  const user = req.body;
  const result = userValidationSchema.safeParse(user);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  next();
}

module.exports = {
  validateUser,
  validatePost,
};
