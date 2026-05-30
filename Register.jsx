import React from "react";
import "./index.css";

export default function Main() {
  return (
    <div className="main-container">
      <div className="body">
        <div className="app">
          <div className="container">
            <div className="navbar">
              <div className="container-1">
                <div className="link">
                  <div className="navbar-2">
                    <div className="icon" />
                  </div>
                  <div className="navbar-3">
                    <span className="brand-name">DyslexiaLens</span>
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
                      <span className="register-button">Daftar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-c">
              <div className="link-d">
                <span className="back-link">Kembali</span>
                <div className="icon-e" />
              </div>
              <div className="container-f">
                <div className="container-10">
                  <div className="heading">
                    <span className="heading-11">Buat Akun Baru</span>
                  </div>
                  <div className="paragraph">
                    <span className="subtitle">Daftar gratis sekarang</span>
                  </div>
                </div>
                <div className="form">
                  <div className="container-12">
                    <div className="label">
                      <span className="input-label">Nama</span>
                    </div>
                    <div className="container-13">
                      <div className="icon-14" />
                      <div className="text-input">
                        <span className="placeholder-text">Nama lengkap</span>
                      </div>
                    </div>
                  </div>
                  <div className="container-15">
                    <div className="label-16">
                      <span className="input-label-17">Email</span>
                    </div>
                    <div className="container-18">
                      <div className="icon-19" />
                      <div className="email-input">
                        <span className="email">nama@email.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="container-1a">
                    <div className="label-1b">
                      <span className="input-label-1c">Password</span>
                    </div>
                    <div className="container-1d">
                      <div className="password-input">
                        <span className="placeholder-text-1e">
                          Min. 6 karakter, huruf & angka
                        </span>
                      </div>
                      <div className="icon-1f" />
                      <div className="button-20">
                        <div className="icon-21" />
                      </div>
                    </div>
                  </div>
                  <div className="container-22">
                    <div className="label-23">
                      <span className="input-label-24">
                        Konfirmasi Password
                      </span>
                    </div>
                    <div className="container-25">
                      <div className="icon-26" />
                      <div className="password-input-27">
                        <span className="placeholder-text-28">
                          Ulangi password
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="container-29">
                    <div className="label-2a">
                      <span className="terms-and-conditions">
                        Saya setuju dengan syarat dan ketentuan
                      </span>
                    </div>
                    <div className="checkbox" />
                  </div>
                  <div className="button-2b">
                    <span className="submit-button">Daftar Sekarang</span>
                  </div>
                </div>
                <div className="container-2c">
                  <div className="login-link">
                    <span className="existing-account">Sudah punya akun? </span>
                    <span className="login">Masuk</span>
                  </div>
                </div>
                <div className="container-2d">
                  <div className="paragraph-2e">
                    <span className="section-title">
                      Mode Demo - Test Error Flow:
                    </span>
                  </div>
                  <div className="list">
                    <div className="list-item">
                      <span className="email-2f">• Email: </span>
                      <span className="connection-error"> → Error koneksi</span>
                      <div className="code">
                        <span className="email-address">network@error.com</span>
                      </div>
                    </div>
                    <div className="list-item-30">
                      <span className="email-info">• Email: </span>
                      <span className="server-error"> → Server error</span>
                      <div className="code-31">
                        <span className="email-address-32">
                          server@error.com
                        </span>
                      </div>
                    </div>
                    <div className="list-item-33">
                      <span className="email-info-34">• Email: </span>
                      <span className="email-registered">
                        {" "}
                        → Email sudah terdaftar
                      </span>
                      <div className="code-35">
                        <span className="email-address-36">
                          exists@test.com
                        </span>
                      </div>
                    </div>
                    <div className="list-item-37">
                      <span className="rate-limit">
                        • Coba daftar 5x → Rate limit
                      </span>
                    </div>
                    <div className="password-validation">
                      <span className="password-validation-38">
                        • Password tanpa angka/huruf → Validasi gagal
                      </span>
                    </div>
                    <div className="name-validation">
                      <span className="text-1f">
                        • Nama dengan angka/simbol → Validasi gagal
                      </span>
                    </div>
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
