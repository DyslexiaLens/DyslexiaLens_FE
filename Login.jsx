import React from "react";
import "./index.css";

export default function Main() {
  return (
    <div className="main-container">
      <div className="app">
        <div className="container">
          <div className="navbar">
            <div className="container-1">
              <div className="link">
                <div className="navbar-2">
                  <div className="icon" />
                </div>
                <div className="navbar-3">
                  <span className="logo">DyslexiaLens</span>
                </div>
              </div>
              <div className="container-4">
                <div className="link-5">
                  <div className="icon-6" />
                </div>
                <div className="button">
                  <div className="icon-7" />
                </div>
                <div className="link-8">
                  <div className="button-9">
                    <span className="login-button">Masuk</span>
                  </div>
                </div>
                <div className="link-a">
                  <div className="button-b">
                    <span className="signup-link">Daftar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-c">
            <div className="link-d">
              <span className="kembali">Kembali</span>
              <div className="icon-e" />
            </div>
            <div className="container-f">
              <div className="container-10">
                <div className="heading">
                  <span className="welcome-message">Selamat Datang</span>
                </div>
                <div className="paragraph">
                  <span className="login-message">Masuk ke akun Anda</span>
                </div>
              </div>
              <div className="form">
                <div className="container-11">
                  <div className="label">
                    <span className="email-label">Email</span>
                  </div>
                  <div className="container-12">
                    <div className="icon-13" />
                    <div className="email-input">
                      <span className="email-input-14">nama@email.com</span>
                    </div>
                  </div>
                </div>
                <div className="container-15">
                  <div className="label-16">
                    <span className="password">Password</span>
                  </div>
                  <div className="container-17">
                    <div className="password-input">
                      <span className="password-18">Password</span>
                    </div>
                    <div className="icon-19" />
                    <div className="button-1a">
                      <div className="icon-1b" />
                    </div>
                  </div>
                </div>
                <div className="container-1c">
                  <div className="label-1d">
                    <div className="checkbox" />
                    <div className="text">
                      <span className="ingat-saya">Ingat saya</span>
                    </div>
                  </div>
                  <div className="link-1e">
                    <span className="lupa-password">Lupa password?</span>
                  </div>
                </div>
                <div className="button-1f">
                  <span className="login">Masuk</span>
                </div>
              </div>
              <div className="container-20">
                <div className="register-now">
                  <span className="no-account">Belum punya akun? </span>
                  <span className="register-button">Daftar sekarang</span>
                </div>
              </div>
              <div className="container-21">
                <div className="paragraph-22">
                  <div className="demo">
                    <span className="use-any-email-password">Demo:</span>
                    <span className="text-11">
                      {" "}
                      Gunakan email dan password apa saja
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
