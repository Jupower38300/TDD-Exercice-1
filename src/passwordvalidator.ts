export class PasswordValidator {
  private specialChars = /[@#$%&*]/;
  private hasUppercase = /[A-Z]/;
  private hasLowercase = /[a-z]/;
  private hasDigit = /\d/;
  private hasSpace = /\s/;

  validate(
    password: string,
    username: string | null = null,
  ): [boolean, string[]] {
    const errors: string[] = [];

    if (!password) {
      errors.push("Le mot de passe ne peut pas être vide");
      return [false, errors];
    }

    if (password.length < 8) {
      errors.push("Doit contenir au moins 8 caractères");
    }

    if (!this.hasUppercase.test(password)) {
      errors.push("Doit contenir au moins une lettre majuscule");
    }

    if (!this.hasLowercase.test(password)) {
      errors.push("Doit contenir au moins une lettre minuscule");
    }

    if (!this.hasDigit.test(password)) {
      errors.push("Doit contenir au moins un chiffre");
    }

    if (!this.specialChars.test(password)) {
      errors.push("Doit contenir au moins un caractère spécial");
    }

    if (this.hasSpace.test(password)) {
      errors.push("Ne doit pas contenir d'espaces");
    }

    if (username && password.toLowerCase().includes(username.toLowerCase())) {
      errors.push("Ne doit pas contenir le nom d'utilisateur");
    }

    return [errors.length === 0, errors];
  }

  get_strength(password: string): string {
    if (!password) return "Faible";

    let score = 0;
    if (password.length >= 8) score++;
    if (this.hasUppercase.test(password)) score++;
    if (this.hasLowercase.test(password)) score++;
    if (this.hasDigit.test(password)) score++;
    if (this.specialChars.test(password)) score++;

    if (score <= 2) return "Faible";
    if (score === 3 || score === 4) return "Moyen";
    return "Fort";
  }
}
