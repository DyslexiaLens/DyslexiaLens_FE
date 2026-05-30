import React from 'react';
import './index.css';

export default function Main() {
  return (
    <div className="main-container">
      <div className="body">
        <div className="app">
          <div className="container">

            {/* Navbar */}
            <div className="navbar">
              <div className="container-1">
                <div className="link">
                  <div className="navbar-2">
                    <div className="icon"></div>
                  </div>
                  <div className="navbar-3">
                    <span className="navbar-logo-text">DyslexiaLens</span>
                  </div>
                </div>
                <div className="container-4">
                  <div className="link-5">
                    <div className="icon-6"></div>
                  </div>
                  <div className="button">
                    <div className="icon-7"></div>
                  </div>
                  <div className="link-8">
                    <div className="button-9">
                      <span className="history-button">Riwayat</span>
                      <div className="icon-a"></div>
                    </div>
                  </div>
                  <div className="link-b">
                    <div className="button-c">
                      <span className="start-analysis-button">Mulai Analisis</span>
                    </div>
                  </div>
                  <div className="link-d">
                    <div className="icon-e"></div>
                    <div className="text">
                      <span className="test-button">test</span>
                    </div>
                  </div>
                  <div className="button-f">
                    <span className="logout-button">Keluar</span>
                    <div className="icon-10"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
              <div className="link-11">
                <span className="back-link">Kembali</span>
                <div className="icon-12"></div>
              </div>

              <div className="container-13">
                <div className="heading">
                  <span className="upload-photo-heading">Upload Foto Tulisan Tangan</span>
                </div>
                <div className="paragraph">
                  <span className="instructions">Pilih mode analisis dan upload foto yang jelas</span>
                </div>

                <div className="link-14">
                  <div className="upload-screen">
                    <div className="container-15">
                      <div className="icon-16"></div>
                    </div>
                    <div className="container-17">
                      <div className="heading-18">
                        <span className="photo-tips-heading">Tips Foto yang Baik</span>
                      </div>
                      <div className="paragraph-19">
                        <span className="photo-tips-description">
                          Lihat panduan untuk hasil analisis terbaik
                        </span>
                      </div>
                    </div>
                    <div className="icon-1a"></div>
                  </div>
                </div>

                {/* Mode Selection */}
                <div className="container-1b">
                  <div className="label">
                    <span className="mode-selection-label">Pilih Mode</span>
                  </div>
                  <div className="container-1c">
                    <div className="button-1d">
                      <div className="container-1e">
                        <div className="container-1f">
                          <div className="icon-20"></div>
                        </div>
                        <div className="container-21">
                          <div className="heading-22">
                            <span className="detect-heading">Deteksi</span>
                          </div>
                          <div className="paragraph-23">
                            <span className="detect-description">Analisis disleksia</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="button-24">
                      <div className="container-25">
                        <div className="container-26">
                          <div className="icon-27"></div>
                        </div>
                        <div className="container-28">
                          <div className="heading-29">
                            <span className="translate-heading">Translate</span>
                          </div>
                          <div className="paragraph-2a">
                            <span className="translate-description">Terjemahkan tulisan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Area */}
                <div className="container-2b">
                  <div className="container-2c">
                    <div className="label-2d">
                      <div className="icon-2e"></div>
                    </div>
                    <div className="container-2f">
                      <div className="paragraph-30">
                        <span className="upload-foto">Upload Foto</span>
                      </div>
                      <div className="paragraph-31">
                        <span className="upload-requirements">JPG, PNG &bull; Max 10MB</span>
                      </div>
                    </div>
                    <div className="slot-clone">
                      <span className="choose-file">Pilih File</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="container-32">
                  <div className="link-33">
                    <div className="button-34">
                      <span className="cancel-button">Batal</span>
                    </div>
                  </div>
                  <div className="button-35">
                    <span className="analyze-button">Analisis</span>
                  </div>
                </div>

                {/* Demo Error Testing */}
                <div className="container-36">
                  <div className="paragraph-37">
                    <span className="demo-error-title">Demo Error Testing:</span>
                  </div>
                  <div className="container-38">
                    <div className="paragraph-39">
                      <span className="format-invalid">
                        Format invalid: Upload file selain JPG/PNG (cth: .pdf, .txt)
                      </span>
                    </div>
                    <div className="paragraph-3a">
                      <span className="file-too-large">
                        File terlalu besar: Upload file &gt; 10MB
                      </span>
                    </div>
                    <div className="paragraph-3b">
                      <span className="koneksi-error">
                        Koneksi error: Upload file dengan nama mengandung &quot;network&quot;
                      </span>
                    </div>
                    <div className="paragraph-3c">
                      <span className="server-error">
                        Server error: Upload file dengan nama mengandung &quot;server&quot;
                      </span>
                    </div>
                    <div className="paragraph-3d">
                      <span className="success-message">
                        Sukses: Upload JPG/PNG &lt; 10MB dengan nama biasa
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="footer">
              <div className="container-3e">
                <div className="container-3f">
                  <div className="container-40">
                    <div className="container-41">
                      <div className="container-42">
                        <div className="icon-43"></div>
                      </div>
                      <div className="text-44">
                        <span className="logo-text">DyslexiaLens</span>
                      </div>
                    </div>
                    <div className="paragraph-45">
                      <span className="deteksi-dini-disleksia">
                        Deteksi dini disleksia dengan AI untuk masa depan yang lebih cerah.
                      </span>
                    </div>
                  </div>

                  <div className="container-46">
                    <div className="heading-47">
                      <span className="products-heading">Produk</span>
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
                        <span className="about-us">Tentang Kami</span>
                      </div>
                      <div className="privacy-policy">
                        <span className="terms-and-conditions">Privasi</span>
                      </div>
                      <div className="container-4e">
                        <span className="heading-4f">Syarat &amp; Ketentuan</span>
                      </div>
                    </div>
                  </div>

                  <div className="wrapper-14">
                    <div className="wrapper-15">
                      <span className="contact-heading">Kontak</span>
                    </div>
                    <div className="list-50">
                      <span className="support-email">support@dyslexialens.com</span>
                      <div className="icon-51"></div>
                    </div>
                    <div className="container-52">
                      <div className="link-53">
                        <div className="icon-54"></div>
                      </div>
                      <div className="link-55">
                        <div className="icon-56"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container-57">
                  <div className="paragraph-58">
                    <span className="copyright-text">
                      &copy; 2026 DyslexiaLens. All rights reserved.
                    </span>
                  </div>
                  <div className="paragraph-59">
                    <span className="medical-disclaimer">
                      Ini bukan diagnosis medis. Konsultasikan dengan profesional untuk evaluasi klinis.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="upload-screen-5a"></div>
    </div>
  );
}
