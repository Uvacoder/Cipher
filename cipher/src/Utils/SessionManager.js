const MASTER_PASSWORD = 'admin'

class SessionManager {
  constructor() {
    this.authenticated = false
  }

  authenticate(password) {
    if (password === MASTER_PASSWORD) {
      this.authenticated = true
    }

    return this.authenticated
  }

  get isAuthenticated() {
    return this.authenticated
  }

}

export default new SessionManager()