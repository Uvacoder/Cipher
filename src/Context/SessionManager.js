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
   * @param {String} password 
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