// Due this project being recruitment task, password is available here
// On final version it should be in .env file
const MASTER_PASSWORD = 'admin'
  /**
   * Tool that checks if user is logged.<br>
   * To prevent from using app after deleting ligon component in DevTools
  */
class SessionManager {
  constructor() {
    this.authenticated = false
  }

  /**
   * Autentication method
   * @param {String} password Password given by user
   * @returns Boolean
   */
  authenticate(password) {
    if (password === MASTER_PASSWORD) {
      this.authenticated = true
    }

    return this.authenticated
  }

  /**
   * Authetntication getter
   * returns whether user is logged or not
   */
  get isAuthenticated() {
    return this.authenticated
  }
}

export default new SessionManager()