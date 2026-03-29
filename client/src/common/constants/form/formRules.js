import { RULE_MESSAGES } from "./ruleMessages";
import { emailRegex } from "../regex/regex";
import { passwordRegex } from "../regex/regex";

export const FORM_RULES = {
  TEXT: {
    required: RULE_MESSAGES.TEXT.REQUIRED,
  },
  EMAIL: {
    required: RULE_MESSAGES.EMAIL.REQUIRED,
    pattern: {
      value: emailRegex,
      message: RULE_MESSAGES.EMAIL.INVALID,
    },
  },
  PASSWORD_LOGIN: {
    required: RULE_MESSAGES.PASSWORD.REQUIRED
  },
  PASSWORD_REGISTER: {
    required: RULE_MESSAGES.PASSWORD.REQUIRED,
    pattern: {
      value: passwordRegex,
      message: RULE_MESSAGES.PASSWORD.INVALID,
    },
  },
  TYPE: {
    required: RULE_MESSAGES.TEXT.REQUIRED,
  },
};
