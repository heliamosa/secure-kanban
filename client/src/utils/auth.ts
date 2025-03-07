class AuthService {
    static setToken(token: string) {
        localStorage.setItem("token", token);
    }

    static getToken() {
        return localStorage.getItem("token");
    }

    static logout() {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    static isAuthenticated() {
        return !!this.getToken();
    }
}

export default AuthService;
