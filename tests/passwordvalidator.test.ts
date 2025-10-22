import { PasswordValidator } from "../src/passwordvalidator";

describe("Validation du mot de passe", () => {
  let validator: PasswordValidator;

  beforeEach(() => {
    validator = new PasswordValidator();
  });

  it("test_validate_LessThan7Chars_ThrowError", () => {
    const [valid, errors] = validator.validate("Test1@");
    expect(valid).toBe(false);
    expect(errors).toContain("Doit contenir au moins 8 caractères");
  });

  it("test_validation_NoCapitalization_ThrowError", () => {
    const [valid, errors] = validator.validate("abcd122@");
    expect(valid).toBe(false);
    expect(errors).toContain("Doit contenir au moins une lettre majuscule");
  });

  it("test_validation_NoLowercaseLetters_ThrowError", () => {
    const [valid, errors] = validator.validate("AAAA@0AAA");
    expect(valid).toBe(false);
    expect(errors).toContain("Doit contenir au moins une lettre minuscule");
  });

  it("test_validation_NoNumbers_ThrowError", () => {
    const [valid, errors] = validator.validate("AAfsdsd@sfs");
    expect(valid).toBe(false);
    expect(errors).toContain("Doit contenir au moins un chiffre");
  });

  it("test_calidation_NoSpecialChar_ThrowError", () => {
    const [valid, errors] = validator.validate("A110AAaa");
    expect(valid).toBe(false);
    expect(errors).toContain("Doit contenir au moins un caractère spécial");
  });

  it("test_validation_SpaceInAPassword_ThrowError", () => {
    const [valid, errors] = validator.validate("Abc 122@");
    expect(valid).toBe(false);
    expect(errors).toContain("Ne doit pas contenir d'espaces");
  });

  it("test_validation_UserInPassword_ThrowError", () => {
    const [valid, errors] = validator.validate("Abc122@jules", "jules");
    expect(valid).toBe(false);
    expect(errors).toContain("Ne doit pas contenir le nom d'utilisateur");
  });

  it("test_validation_PasswordValid_ShouldAccept", () => {
    const [valid, errors] = validator.validate("Abc122@#");
    expect(valid).toBe(true);
    expect(errors).toEqual([]);
  });

  it("test_validation_PasswordEmpty_Throwerror", () => {
    const [valid, errors] = validator.validate("");
    expect(valid).toBe(false);
    expect(errors).toContain("Le mot de passe ne peut pas être vide");
  });

  it("test_validation_UndefinedOrNull_Throwerror", () => {
    // @ts-expect-error test volontaire
    const [valid] = validator.validate(null);
    expect(valid).toBe(false);
  });

  it("test_validation_AcceptAllSpecials_ShouldAccept", () => {
    const [valid] = validator.validate("Eléphant0@");
    expect(valid).toBe(true);
  });

  it("test_get_strength_PasswordWeak_ShouldReturn 'Faible'", () => {
    expect(validator.get_strength("abc")).toBe("Faible");
  });

  it("test_get_strength_PasswordMedium_ShouldReturn 'Moyen'", () => {
    expect(validator.get_strength("Abc122")).toBe("Moyen");
  });

  it("test_get_strength_PasswordStrong_ShouldReturn 'Fort'", () => {
    expect(validator.get_strength("Abc122@#")).toBe("Fort");
  });

  it("test_get_strength_PasswordEmpty_ShouldReturn 'Faible'", () => {
    expect(validator.get_strength("")).toBe("Faible");
  });
});
