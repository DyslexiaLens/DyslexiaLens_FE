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
                    <span className="navbar-brand-name">DyslexiaLens</span>
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
                      <span className="navbar-history">Riwayat</span>
                      <div className="icon-a" />
                    </div>
                  </div>
                  <div className="link-b">
                    <div className="button-c">
                      <span className="navbar-start-analysis">
                        Mulai Analisis
                      </span>
                    </div>
                  </div>
                  <div className="link-d">
                    <div className="icon-e" />
                    <div className="text">
                      <span className="navbar-test">test</span>
                    </div>
                  </div>
                  <div className="button-f">
                    <span className="logout">Keluar</span>
                    <div className="icon-10" />
                  </div>
                </div>
              </div>
            </div>
            <div className="main-content">
              <div className="container-11">
                <div className="container-12">
                  <div className="container-13">
                    <div className="container-14">
                      <div className="heading">
                        <span className="translation-result-heading">
                          Hasil Terjemahan
                        </span>
                      </div>
                      <div className="text-15">
                        <span className="done">Selesai</span>
                      </div>
                    </div>
                    <div className="paragraph">
                      <span className="translation-date">4 Mei 2026</span>
                    </div>
                  </div>
                  <div className="button-16">
                    <span className="button-export-pdf">Export PDF</span>
                    <div className="icon-17" />
                  </div>
                </div>
                <div className="container-18">
                  <div className="container-19">
                    <div className="heading-1a">
                      <span className="original-text-heading">
                        Tulisan Asli
                      </span>
                    </div>
                    <div className="container-1b">
                      <div className="image-original-text">
                        <div className="vector" />
                        <div className="group">
                          <span className="original-text-part">kids</span>
                          <span className="original-text-part-1c">human</span>
                          <span className="original-text-part-1d">rada</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-1e">
                    <div className="heading-1f">
                      <span className="translated-text-heading">
                        Teks Normal
                      </span>
                      <div className="icon-20" />
                    </div>
                    <div className="container-21">
                      <div className="container-22">
                        <div className="paragraph-23">
                          <span className="translated-text-part">kids</span>
                        </div>
                        <div className="paragraph-24">
                          <span className="translated-text-part-25">human</span>
                        </div>
                        <div className="paragraph-26">
                          <span className="translated-text-part-27">read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-28">
                  <div className="heading-29">
                    <span className="full-text-heading">Teks Lengkap</span>
                  </div>
                  <div className="paragraph-2a">
                    <span className="full-text">kids human read</span>
                  </div>
                </div>
                <div className="container-2b">
                  <div className="heading-2c">
                    <span className="notes-heading">Catatan</span>
                  </div>
                  <div className="list">
                    <div className="list-item">
                      <span className="context-needed">
                        Beberapa kata mungkin memerlukan konteks untuk akurasi
                        penuh
                      </span>
                    </div>
                    <div className="translation-pattern">
                      <span className="check-results">
                        Terjemahan didasarkan pada pola tulisan yang terdeteksi
                      </span>
                    </div>
                    <div className="container-2d">
                      <span className="button-2e">
                        Periksa kembali hasil untuk memastikan keakuratan
                      </span>
                    </div>
                  </div>
                </div>
                <div className="save-to-history">
                  <div className="translate-again">
                    <span className="container-2f">Simpan ke Riwayat</span>
                  </div>
                  <div className="paragraph-30">
                    <span className="demo-error-testing-heading">
                      Translate Lagi
                    </span>
                  </div>
                </div>
              </div>
              <div className="container-31">
                <div className="paragraph-32">
                  <span className="load-failed">Demo Error Testing:</span>
                </div>
                <div className="container-33">
                  <div className="paragraph-34">
                    <span className="load-failed-35">• Load Failed: </span>
                    <div className="code">
                      <span className="load-failed-36">
                        /translate-result/1?error=load-failed
                      </span>
                    </div>
                  </div>
                  <div className="paragraph-37">
                    <span className="network-error">• Network Error: </span>
                    <div className="code-38">
                      <span className="network-error-39">
                        /translate-result/1?error=network
                      </span>
                    </div>
                  </div>
                  <div className="paragraph-3a">
                    <span className="server-error">• Server Error: </span>
                    <div className="code-3b">
                      <span className="server-error-3c">
                        /translate-result/1?error=server
                      </span>
                    </div>
                  </div>
                  <div className="paragraph-3d">
                    <span className="empty-state">• Empty State: </span>
                    <div className="code-3e">
                      <span className="empty-state-3f">
                        /translate-result/1?error=empty
                      </span>
                    </div>
                  </div>
                  <div className="paragraph-40">
                    <span className="save-export-error">
                      • Save/Export Error: Klik tombol beberapa kali (30% chance
                      error)
                    </span>
                  </div>
                </div>
              </div>
              <div className="container-41">
                <div className="paragraph-42">
                  <div className="catatan">
                    <span className="catatan-43">Catatan:</span>
                    <span className="catatan-44">
                      {" "}
                      Hasil terjemahan mungkin tidak 100% akurat. Verifikasi
                      manual disarankan untuk dokumen penting.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer">
              <div className="container-45">
                <div className="container-46">
                  <div className="container-47">
                    <div className="container-48">
                      <div className="container-49">
                        <div className="icon-4a" />
                      </div>
                      <div className="text-4b">
                        <span className="footer-brand-name">DyslexiaLens</span>
                      </div>
                    </div>
                    <div className="paragraph-4c">
                      <span className="dyslexialens">
                        Deteksi dini disleksia dengan AI untuk masa depan yang
                        lebih cerah.
                      </span>
                    </div>
                  </div>
                  <div className="container-4d">
                    <div className="heading-4e">
                      <span className="products-heading">Produk</span>
                    </div>
                    <div className="list-4f">
                      <div className="list-item-50">
                        <span className="start-analysis">Mulai Analisis</span>
                      </div>
                      <div className="list-item-51">
                        <span className="history">Riwayat</span>
                      </div>
                      <div className="list-item-52">
                        <span className="help">Bantuan</span>
                      </div>
                    </div>
                  </div>
                  <div className="container-53">
                    <div className="heading-54">
                      <span className="company-heading">Perusahaan</span>
                    </div>
                    <div className="list-55">
                      <div className="list-item-56">
                        <span className="about-us">Tentang Kami</span>
                      </div>
                      <div className="list-item-57">
                        <span className="privacy-policy">Privasi</span>
                      </div>
                      <div className="terms-and-conditions">
                        <span className="container-58">Syarat & Ketentuan</span>
                      </div>
                    </div>
                  </div>
                  <div className="heading-59">
                    <div className="contact-heading">
                      <span className="list-5a">Kontak</span>
                    </div>
                    <div className="support-email">
                      <span className="icon-5b">support@dyslexialens.com</span>
                      <div className="container-5c" />
                    </div>
                    <div className="link-5d">
                      <div className="icon-5e">
                        <div className="link-5f" />
                      </div>
                      <div className="icon-60">
                        <div className="container-61" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="paragraph-62">
                  <div className="footer-copyright">
                    <span className="paragraph-63">
                      © 2024 DyslexiaLens. All rights reserved.
                    </span>
                  </div>
                  <div className="medical-disclaimer">
                    <span className="text-33">
                      Ini bukan diagnosis medis. Konsultasikan dengan
                      profesional untuk evaluasi klinis.
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
