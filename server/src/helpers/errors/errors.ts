import {
  UserInputError,
  ApolloError,
  AuthenticationError,
} from "apollo-server-express";

export const makeAuthenticationError = () => {
  return new AuthenticationError("Not authorized. Login required.");
};

export const makeLoginError = () => {
  const validationErrors = { input: "Password and Email not matching" };
  return new UserInputError("Login failed.", { validationErrors });
};

export const serverError = new ApolloError("Internal server error.");

export const makeUserInputError = (errorFields?: {}) => {
  const validationErrors = errorFields ? { ...errorFields } : null;
  if (errorFields) {
    return new UserInputError("Bad User input.", { validationErrors });
  }
  return new UserInputError("Bad User input.");
};

export class UniqueConstraintError extends Error {
  constructor(value: string) {
    super(`${value} must be unique.`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError);
    }
  }
}

export class InvalidPropertyError extends Error {
  constructor(msg: string) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPropertyError);
    }
  }
}

export class RequiredParameterError extends Error {
  constructor(param: string) {
    super(`${param} can not be null or undefined.`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParameterError);
    }
  }
}
