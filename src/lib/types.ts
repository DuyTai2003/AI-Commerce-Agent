export type UILanguage = "vi" | "en" | "zh-CN" | "zh-TW";
export type Tone = "humorous" | "formal" | "sensational";

export interface ProductInput {
  rawText: string;
  tone: Tone;
}

export interface ProductOutput {
  specs: Record<string, string>;
  description: string;
  titles: string[];
  category: string;
  keywords: string[];
}

export interface ProcessingState {
  status: "idle" | "loading" | "success" | "error";
  data: ProductOutput | null;
  error: string | null;
}

export const UI_LANGUAGE_OPTIONS: { value: UILanguage; label: string; flag: string }[] = [
  { value: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "zh-CN", label: "简体中文", flag: "🇨🇳" },
  { value: "zh-TW", label: "繁體中文", flag: "🇹🇼" },
];

export type SloganTone = "humorous" | "professional" | "young";

export interface ImageSloganOutput {
  productName: string;
  slogans: string[];
  style: string;
  keywords: string[];
}

export interface ImageAnalysisState {
  status: "idle" | "uploading" | "analyzing" | "success" | "error";
  imageUrl: string | null;
  data: ImageSloganOutput | null;
  error: string | null;
}

export const SLOGAN_TONE_OPTIONS: { value: SloganTone; label: string; icon: string; desc: string }[] = [
  { value: "humorous", label: "Hài hước", icon: "😄", desc: "Vui nhộn, bắt trend, dùng ngôn ngữ gen Z" },
  { value: "professional", label: "Chuyên nghiệp", icon: "💼", desc: "Lịch sự, tin cậy, phù hợp thương hiệu cao cấp" },
  { value: "young", label: "Trẻ trung", icon: "🌟", desc: "Năng động, thời trang, phong cách hot trend" },
];

export const TONE_OPTIONS: { value: Tone; label: string; icon: string; desc: string }[] = [
  { value: "humorous", label: "Hài hước", icon: "😄", desc: "Văn phong vui nhộn, gần gũi, có thể dùng emoji và tiếng lóng" },
  { value: "formal", label: "Trang trọng", icon: "✨", desc: "Chuyên nghiệp, tin cậy, chi tiết thông số kỹ thuật" },
  { value: "sensational", label: "Giật gân", icon: "🔥", desc: "Khẩn trương, khan hiếm, tạo cảm giác FOMO" },
];
