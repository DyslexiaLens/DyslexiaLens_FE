import logoMark from "../../assets/logoMark.svg";
import checklistGreen from "../../assets/checklistGreen.svg";
import ChecklistWhite from "../../assets/ChecklistWhite.svg";
import shieldAsset from "../../assets/Shield.svg";
import starAsset from "../../assets/Star.svg";
import lightingAsset from "../../assets/Lighting.svg";
import clockAsset from "../../assets/Clock.svg";
import dollarAsset from "../../assets/Dollar.svg";
import askLightAsset from "../../assets/AskLight.svg";
import askDarkAsset from "../../assets/AskDark.svg";
import peopleAsset from "../../assets/People.svg";
import moonAsset from "../../assets/Moon.svg";
import sunAsset from "../../assets/Sun.svg";
import twitterLogo from "../../assets/TwitterLogo.svg";
import githubLogo from "../../assets/GitHubLogo.svg";
import twitterLogoDark from "../../assets/TwitterLogoDark.svg";
import githubLogoDark from "../../assets/GitHubLogoDark.svg";
import analysisAsset from "../../assets/Analysis.svg";
import analysisLiveAsset from "../../assets/AnalysisLive.svg";

const svgDataUri = (markup) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markup)}`;

const makeSvg = (content, viewBox = "0 0 24 24") =>
  svgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none">${content}</svg>`,
  );

const headerSearch = makeSvg(
  '<circle cx="10" cy="10" r="5.75" stroke="#4a5565" stroke-width="1.75"/><path d="M14.25 14.25 19 19" stroke="#4a5565" stroke-width="1.75" stroke-linecap="round"/>',
);

const arrowRightIcon = makeSvg(
  '<path d="M5 12h11" stroke="#155dfc" stroke-width="2" stroke-linecap="round"/><path d="m12 7 4.5 5-4.5 5" stroke="#155dfc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
);

const mailIcon = makeSvg(
  '<rect x="4" y="6" width="16" height="12" rx="2.5" stroke="#6a7282" stroke-width="1.75"/><path d="m5.5 8.5 6.5 4.5 6.5-4.5" stroke="#6a7282" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>',
);

const disclaimerInfoIcon = makeSvg(
  '<circle cx="12" cy="12" r="8" stroke="#6a7282" stroke-width="1.75"/><path d="M12 10.25v5" stroke="#6a7282" stroke-width="1.75" stroke-linecap="round"/><circle cx="12" cy="8.25" r=".9" fill="#6a7282"/>',
);

const solutionBlueIcon = lightingAsset;
const solutionGreenIcon = shieldAsset;
const solutionPurpleIcon = starAsset;

export const assets = {
  logoMark,
  navSearch: headerSearch,
  navHelpLight: askLightAsset,
  navHelpDark: askDarkAsset,
  themeSun: sunAsset,
  themeMoon: moonAsset,
  headerSearchOuter: headerSearch,
  headerSearchInner: headerSearch,
  heroArrow: arrowRightIcon,
  ctaArrow: arrowRightIcon,
  heroShield: shieldAsset,
  heroCheck: checklistGreen,
  heroCheckWhite: ChecklistWhite,
  analysis: analysisAsset,
  analysisLive: analysisLiveAsset,
  analysisDot: lightingAsset,
  analysisPulse: shieldAsset,
  problemRed: clockAsset,
  problemAmber: dollarAsset,
  problemOrange: peopleAsset,
  solutionBlue: solutionBlueIcon,
  solutionGreen: solutionGreenIcon,
  solutionPurple: solutionPurpleIcon,
  footerMail: mailIcon,
  footerSocial1: twitterLogo,
  footerSocial2: githubLogo,
  footerSocial1Dark: twitterLogoDark,
  footerSocial2Dark: githubLogoDark,
  footerInfo: disclaimerInfoIcon,
  disclaimerIcon: disclaimerInfoIcon,
};

export const navigation = [
  { label: "Masuk", href: "/login" },
  { label: "Daftar", href: "/register", highlight: true },
];

export const heroHighlights = ["100% Gratis", "Data Aman", "Hasil Cepat"];

export const problemCards = [
  {
    icon: assets.problemRed,
    iconTone: "red",
    title: "Deteksi Terlambat",
    description:
      "Banyak anak dengan disleksia tidak terdiagnosis hingga kelas tinggi, kehilangan kesempatan intervensi dini yang krusial.",
  },
  {
    icon: assets.problemAmber,
    iconTone: "amber",
    title: "Biaya Mahal",
    description:
      "Tes disleksia profesional memerlukan biaya tinggi dan waktu tunggu yang lama, tidak semua orang tua mampu mengaksesnya.",
  },
  {
    icon: assets.problemOrange,
    iconTone: "orange",
    title: "Rendahnya Kesadaran",
    description:
      "Kurangnya pemahaman tentang tanda-tanda disleksia membuat orang tua sering tidak menyadari anak mereka membutuhkan bantuan.",
  },
];

export const solutionCards = [
  {
    icon: assets.solutionBlue,
    iconTone: "blue",
    bulletIconSrc: checklistGreen,
    iconWrapClass: "h-14 w-14 px-[14px] py-[14px]",
    iconImgClass: "h-7 w-7",
    title: "Cepat & Praktis",
    description:
      "Hasil analisis dalam 2 menit. Cukup upload foto tulisan tangan, tanpa perlu pergi ke klinik atau menunggu antrian panjang.",
    bullets: ["Upload foto tulisan", "Analisis otomatis", "Hasil instan"],
  },
  {
    icon: assets.solutionGreen,
    iconTone: "green",
    bulletIconSrc: checklistGreen,
    iconWrapClass: "h-14 w-14 px-[14px] py-[14px]",
    iconImgClass: "h-7 w-7",
    title: "Aman & Privat",
    description:
      "Data Anda terlindungi dengan enkripsi tingkat tinggi. Kami tidak menyimpan foto tulisan tangan secara permanen.",
    bullets: ["Enkripsi end-to-end", "Data tidak dijual", "GDPR compliant"],
  },
  {
    icon: assets.solutionPurple,
    iconTone: "purple",
    bulletIconSrc: checklistGreen,
    iconWrapClass: "h-14 w-14 px-[14px] py-[14px]",
    iconImgClass: "h-7 w-7",
    title: "Akurat & Terpercaya",
    description:
      "Teknologi AI kami dilatih dengan ribuan sampel untuk memberikan hasil yang akurat dan dapat diandalkan.",
    bullets: ["AI terlatih", "Akurasi tinggi", "Terus diperbarui"],
  },
];

export const testimonials = [
  {
    quote:
      "Sebagai seorang ibu, saya sangat khawatir dengan kesulitan menulis Raffa. DyslexiaLens memberikan jawaban dalam hitungan menit. Sekarang dia mendapat terapi yang tepat dan progresnya luar biasa!",
    name: "Sarah Maulida",
    title: "Ibu dari Raffa, 8 tahun",
    avatarLetter: "S",
    avatarTone:
      "bg-gradient-to-br from-[#2b7fff] to-[#ad46ff] shadow-[0px_10px_7.5px_rgba(43,127,255,0.3),0px_4px_3px_rgba(43,127,255,0.3)]",
  },
  {
    quote:
      "Saya awalnya ragu dengan tools online, tapi hasilnya mengejutkan. Cepat, akurat, dan gratis! Saya langsung merekomendasikan ke sesama orang tua di grup sekolah.",
    name: "Budi Prasetyo",
    title: "Ayah dari Aisyah, 7 tahun",
    avatarLetter: "B",
    avatarTone:
      "bg-gradient-to-br from-[#00c950] to-[#00bba7] shadow-[0px_10px_7.5px_rgba(0,201,80,0.3),0px_4px_3px_rgba(0,201,80,0.3)]",
  },
  {
    quote:
      "Sebagai guru, saya sering melihat murid yang kesulitan menulis. Tool ini membantu saya memberikan rekomendasi awal kepada orang tua dengan data yang jelas. Sangat membantu!",
    name: "Dewi Kartika",
    title: "Guru SD Negeri 05 Jakarta",
    avatarLetter: "D",
    avatarTone:
      "bg-gradient-to-br from-[#f6339a] to-[#ff6900] shadow-[0px_10px_7.5px_rgba(246,51,154,0.3),0px_4px_3px_rgba(246,51,154,0.3)]",
  },
];

export const footerLinks = {
  products: ["Mulai Analisis", "Riwayat", "Bantuan"],
  company: ["Tentang Kami", "Privasi", "Syarat & Ketentuan"],
};
