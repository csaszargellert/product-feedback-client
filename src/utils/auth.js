import { axiosBase, axiosPrivate } from "./axios";
import jwt_decode from "jwt-decode";

class AuthProvider {
  #jwt = null;
  #id = null;
  #isAuthenticated = false;
  #user = null;

  get jwt() {
    return this.#jwt;
  }

  get id() {
    return this.#id;
  }

  get user() {
    return this.#user;
  }

  get isAuthenticated() {
    return this.#isAuthenticated;
  }

  set #User(value) {
    this.#user = value;
  }

  set #Jwt(value) {
    this.#jwt = value;
  }

  set #IsAuthenticated(value) {
    this.#isAuthenticated = value;
  }

  set #Id(value) {
    this.#id = value;
  }

  async signout() {
    try {
      await axiosPrivate({
        method: "POST",
        url: "/user/logout",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } finally {
      this.#updateFields(null, null, false, null);
    }
  }

  async signin(username, password) {
    const response = await axiosBase({
      method: "POST",
      url: "/user/login",
      data: {
        username,
        password,
      },
    });

    const { jwt } = response.data;

    const { userId, user } = this.#decodeJwt(jwt);

    this.#updateFields(jwt, userId, true, user);
  }

  setJwt(jwt) {
    this.#Jwt = jwt;
  }

  #decodeJwt(jwt) {
    return jwt_decode(jwt);
  }

  #updateFields(jwt, id, isAuthenticated, user) {
    this.#Jwt = jwt;
    this.#IsAuthenticated = isAuthenticated;
    this.#Id = id;
    this.#User = user;
  }
}

export default new AuthProvider();
