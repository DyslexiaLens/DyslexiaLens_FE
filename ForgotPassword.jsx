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
              <span className="back-to-login-link">Kembali ke Login</span>
              <div className="icon-e" />
            </div>
            <div className="container-f">
              <div className="container-10">
                <div className="container-11">
                  <div className="icon-12" />
                </div>
                <div className="heading">
                  <span className="page-title">Lupa Password?</span>
                </div>
                <div className="paragraph">
                  <span className="instruction">
                    Masukkan email Anda untuk menerima kode OTP
                  </span>
                </div>
              </div>
              <div className="form">
                <div className="container-13">
                  <div className="label">
                    <span className="email-label">Email</span>
                  </div>
                  <div className="container-14">
                    <div className="icon-15" />
                    <div className="email-input">
                      <span className="email-input-16">nama@email.com</span>
                    </div>
                  </div>
                  <div className="paragraph-17">
                    <span className="otp-info">
                      Kode OTP akan dikirim ke email ini
                    </span>
                  </div>
                </div>
                <div className="button-18">
                  <span className="send-otp-button">Kirim OTP</span>
                </div>
              </div>
              <div className="container-19">
                <div className="login-redirect">
                  <span className="remember-password">
                    Ingat password Anda?{" "}
                  </span>
                  <span className="login-here">Login di sini</span>
                </div>
              </div>
              <div className="container-1a">
                <div className="paragraph-1b">
                  <span className="demo-error-testing">
                    Demo Error Testing:
                  </span>
                </div>
                <div className="container-1c">
                  <div className="paragraph-1d">
                    <span className="format-invalid">• Format invalid: </span>
                    <div className="code">
                      <span className="error-code">invalid-email</span>
                    </div>
                  </div>
                  <div className="paragraph-1e">
                    <span className="koneksi-error">• Koneksi error: </span>
                    <div className="code-1f">
                      <span className="error-code-20">network@error.com</span>
                    </div>
                  </div>
                  <div className="paragraph-21">
                    <span className="server-error">• Server error: </span>
                    <div className="code-22">
                      <span className="error-code-23">server@error.com</span>
                    </div>
                  </div>
                  <div className="paragraph-24">
                    <span className="rate-limit-error">
                      • Rate limit: Kirim 3x dalam 1 menit
                    </span>
                  </div>
                  <div className="paragraph-25">
                    <span className="success-message">
                      • Sukses: Email valid lainnya
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
