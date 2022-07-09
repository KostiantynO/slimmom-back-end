const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 254,
    },
    token: {
      type: String,
      default: null,
    },
    userData: {
      currentWeight: { type: Number, required: true, default: 0 },
      height: { type: Number, required: true, default: 0 },
      age: { type: Number, required: true, default: 0 },
      desiredWeight: { type: Number, required: true, default: 0 },
      bloodType: { type: Number, enum: [1, 2, 3, 4], default: 1 },
      dailyRate: { type: Number, required: true, default: 0 },
      notAllowedProducts: { type: Array },
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiRegisterSchema = Joi.object({
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{8,100}$/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(3)
    .max(254)
    .required()
    .messages({
      "string.email": "email should be a type of 'email'",
      "string.empty": "email cannot be an empty field",
    }),
  name: Joi.string().min(3).max(254).required().messages({
    "string.base": "name should be a type of 'text'",
    "string.empty": "name cannot be an empty field",
    "any.required": "missing required name field",
  }),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().alphanum().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "email should be a type of 'email'",
      "string.empty": "email cannot be an empty field",
    }),
});

const User = model("user", userSchema);

module.exports = { User, joiRegisterSchema, joiLoginSchema };