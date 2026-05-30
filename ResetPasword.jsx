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
            <div className="container-d">
              <div className="container-e">
                <div className="heading">
                  <span className="page-title">Buat Password Baru</span>
                </div>
                <div className="paragraph">
                  <span className="page-description">
                    Masukkan password baru Anda
                  </span>
                </div>
              </div>
              <div className="form">
                <div className="container-f">
                  <div className="label">
                    <span className="password-label">Password Baru</span>
                  </div>
                  <div className="container-10">
                    <div className="password-input">
                      <span className="new-password-message">
                        Minimal 6 karakter
                      </span>
                    </div>
                    <div className="icon-11" />
                    <div className="button-12">
                      <div className="icon-13" />
                    </div>
                  </div>
                </div>
                <div className="container-14">
                  <div className="label-15">
                    <span className="confirm-password-label">
                      Konfirmasi Password
                    </span>
                  </div>
                  <div className="container-16">
                    <div className="icon-17" />
                    <div className="password-input-18">
                      <span className="confirm-password-message">
                        Ulangi password
                      </span>
                    </div>
                  </div>
                </div>
                <div className="button-19">
                  <span className="save-password-button">Simpan Password</span>
                </div>
              </div>
              <div className="container-1a">
                <div className="paragraph-1b">
                  <span className="error-title">Demo Error Testing:</span>
                </div>
                <div className="container-1c">
                  <div className="paragraph-1d">
                    <span className="koneksi-error-password">
                      • Koneksi error: Password{" "}
                    </span>
                    <div className="code">
                      <span className="error-code">network123</span>
                    </div>
                  </div>
                  <div className="paragraph-1e">
                    <span className="server-error-password">
                      • Server error: Password{" "}
                    </span>
                    <div className="code-1f">
                      <span className="error-code-20">server123</span>
                    </div>
                  </div>
                  <div className="paragraph-21">
                    <span className="error-message">
                      • Sukses: Password lainnya (min 6 karakter)
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
