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
                      <span className="history-link">Riwayat</span>
                      <div className="icon-a" />
                    </div>
                  </div>
                  <div className="link-b">
                    <div className="button-c">
                      <span className="start-analysis-link">
                        Mulai Analisis
                      </span>
                    </div>
                  </div>
                  <div className="link-d">
                    <div className="icon-e" />
                    <div className="text">
                      <span className="test-link">test</span>
                    </div>
                  </div>
                  <div className="button-f">
                    <span className="logout-link">Keluar</span>
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
                        <span className="analysis-result">Hasil Analisis</span>
                      </div>
                      <div className="text-15">
                        <span className="indicator-percentage">
                          84% Indikasi
                        </span>
                      </div>
                    </div>
                    <div className="paragraph">
                      <span className="analysis-date">24 Oktober 2023</span>
                    </div>
                  </div>
                  <div className="button-16">
                    <span className="export-pdf-button">Export PDF</span>
                    <div className="icon-17" />
                  </div>
                </div>
                <div className="container-18">
                  <div className="image-text">
                    <div className="group">
                      <span className="image-text-19">kids</span>
                      <span className="image-text-1a">human</span>
                      <span className="handwriting-example">rada</span>
                    </div>
                    <div className="vector" />
                  </div>
                </div>
                <div className="container-1b">
                  <div className="heading-1c">
                    <span className="findings-heading">Temuan</span>
                  </div>
                  <div className="container-1d">
                    <div className="container-1e">
                      <div className="container-1f">
                        <div className="container-20">
                          <div className="heading-21">
                            <span className="letter-reversal">
                              Pembalikan Huruf
                            </span>
                          </div>
                          <div className="text-22">
                            <span className="text-f">Tinggi</span>
                          </div>
                        </div>
                        <div className="paragraph-23">
                          <span className="span">
                            Terdeteksi beberapa kebingungan huruf 'b/d' dan
                            'p/q'. Ini adalah indikator awal yang umum.
                          </span>
                        </div>
                      </div>
                      <div className="icon-24" />
                    </div>
                  </div>
                  <div className="container-25">
                    <div className="container-26">
                      <div className="container-27">
                        <div className="container-28">
                          <div className="heading-29">
                            <span className="irregular-spacing">
                              Jarak Tidak Teratur
                            </span>
                          </div>
                          <div className="text-2a">
                            <span className="level">Sedang</span>
                          </div>
                        </div>
                        <div className="paragraph-2b">
                          <span className="irregular-spacing-description">
                            Jarak antar kata tidak konsisten.
                          </span>
                        </div>
                      </div>
                      <div className="icon-2c" />
                    </div>
                  </div>
                </div>
                <div className="container-2d">
                  <div className="button-2e">
                    <span className="save-to-history-button">
                      Simpan ke Riwayat
                    </span>
                  </div>
                  <div className="link-2f">
                    <span className="analyze-again-button">Analisis Lagi</span>
                  </div>
                </div>
              </div>
              <div className="container-30">
                <div className="paragraph-31">
                  <span className="error-demo-header">Demo Error Testing:</span>
                </div>
                <div className="container-32">
                  <div className="paragraph-33">
                    <span className="load-failed">• Load Failed: </span>
                    <div className="code">
                      <span className="load-error-demo">
                        /result/1?error=load-failed
                      </span>
                    </div>
                  </div>
                  <div className="paragraph-34">
                    <span className="network-error">• Network Error: </span>
                    <div className="code-35">
                      <span className="network-error-demo">
                        /result/1?error=network
                      </span>
                    </div>
                  </div>
                  <div className="paragraph-36">
                    <span className="server-error">• Server Error: </span>
                    <div className="code-37">
                      <span className="server-error-demo">
                        /result/1?error=server
                      </span>
                    </div>
                  </div>
                  <div className="paragraph-38">
                    <span className="empty-state">• Empty State: </span>
                    <div className="code-39">
                      <span className="empty-state-demo">
                        /result/1?error=empty
                      </span>
                    </div>
                  </div>
                  <div className="paragraph-3a">
                    <span className="save-export-error">
                      • Save/Export Error: Klik tombol beberapa kali (30% chance
                      error)
                    </span>
                  </div>
                </div>
              </div>
              <div className="container-3b">
                <div className="paragraph-3c">
                  <div className="disclaimer">
                    <span className="disclaimer-3d">Disclaimer:</span>
                    <span className="disclaimer-text">
                      {" "}
                      Ini bukan diagnosis medis. Konsultasikan dengan
                      profesional untuk evaluasi klinis.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer">
              <div className="container-3e">
                <div className="container-3f">
                  <div className="container-40">
                    <div className="container-41">
                      <div className="container-42">
                        <div className="icon-43" />
                      </div>
                      <div className="text-44">
                        <span className="brand-name">DyslexiaLens</span>
                      </div>
                    </div>
                    <div className="paragraph-45">
                      <span className="dyslexia-lens">
                        Deteksi dini disleksia dengan AI untuk masa depan yang
                        lebih cerah.
                      </span>
                    </div>
                  </div>
                  <div className="container-46">
                    <div className="heading-47">
                      <span className="product-heading">Produk</span>
                    </div>
                    <div className="list">
                      <div className="list-item">
                        <span className="start-analysis">Mulai Analisis</span>
                      </div>
                      <div className="list-item-48">
                        <span className="history">Riwayat</span>
                      </div>
                      <div className="list-item-49">
                        <span className="help">Bantuan</span>
                      </div>
                    </div>
                  </div>
                  <div className="container-4a">
                    <div className="heading-4b">
                      <span className="company-heading">Perusahaan</span>
                    </div>
                    <div className="list-4c">
                      <div className="list-item-4d">
                        <span className="about-us-link">Tentang Kami</span>
                      </div>
                      <div className="list-item-4e">
                        <span className="privacy-link">Privasi</span>
                      </div>
                      <div className="list-item-4f">
                        <span className="terms-and-conditions-link">
                          Syarat & Ketentuan
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="container-50">
                    <div className="heading-51">
                      <span className="contact-heading">Kontak</span>
                    </div>
                    <div className="list-52">
                      <span className="support-email">
                        support@dyslexialens.com
                      </span>
                      <div className="icon-53" />
                    </div>
                    <div className="container-54">
                      <div className="link-55">
                        <div className="icon-56" />
                      </div>
                      <div className="link-57">
                        <div className="icon-58" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-59">
                  <div className="paragraph-5a">
                    <span className="copyright-notice">
                      © 2024 DyslexiaLens. All rights reserved.
                    </span>
                  </div>
                  <div className="paragraph-5b">
                    <span className="medical-disclaimer">
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
