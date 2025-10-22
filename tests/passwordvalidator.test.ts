import { PasswordValidator } from "../src/passwordvalidator";

describe("Validation du mot de passe", () => {
  let validator: PasswordValidator;

  beforeEach(() => {
    validator = new PasswordValidator();
  });

  it("test_validate_LessThan8Chars_ThrowError", () => {
    const [valid, errors] = validator.validate("Test");
    expect(valid).toBe(false);
    expect(errors).toContain("Doit contenir au moins 8 caractères");
  });
});
