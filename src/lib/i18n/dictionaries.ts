import type { UILanguage } from "../types";

export type TranslationKey = keyof typeof dictionaries.vi;

export const dictionaries: Record<UILanguage, Record<string, string>> = {
  vi: {
    // Header
    "app.name": "AI Commerce Agent",
    "app.tagline": "Bản địa hóa sản phẩm 1688",
    "app.badge": "Gemini Flash",

    // Hero
    "hero.title": "Bản địa hóa sản phẩm 1688 bằng AI",
    "hero.description":
      "Dán dữ liệu thô từ 1688.com, chọn giọng văn. AI sẽ trích xuất thông số, viết mô tả chuẩn SEO tiếng Việt, và đề xuất tiêu đề hấp dẫn.",

    // Input Panel
    "input.tone_label": "Giọng văn",
    "input.placeholder":
      "Dán dữ liệu sản phẩm từ 1688 vào đây...\n\nVí dụ:\n【新款上市】韩版宽松显瘦纯棉T恤女短袖 2024夏季新款\n面料: 100%纯棉 (Cotton 100%)\n尺码: S M L XL XXL\n颜色: 白色 黑色 灰色 粉色\n重量: 0.25kg\n价格: ¥15.80 - ¥22.50\n起批量: 5件\n货号: WX-2405-T001",
    "input.char_count": "/50 ký tự tối thiểu",
    "input.submit": "Xử lý sản phẩm",
    "input.processing": "Đang xử lý với AI...",

    // Output Panel
    "output.result_title": "Kết quả xử lý",
    "output.new_product": "← Xử lý sản phẩm mới",
    "output.tab_description": "Mô tả",
    "output.tab_specs": "Thông số",
    "output.tab_titles": "Tiêu đề",
    "output.tab_keywords": "Từ khóa",
    "output.powered_by": "Được tối ưu hóa dựa trên thuật ngữ ngành dệt may (Garment Industry Glossaries) — bởi Nguyễn Duy, 2 năm kinh nghiệm sản xuất dệt may",

    // Output Empty
    "output.empty_title": "Chưa có kết quả",
    "output.empty_description":
      "Dán dữ liệu sản phẩm từ 1688 vào ô bên trên, chọn giọng văn và nhấn \"Xử lý sản phẩm\" để AI phân tích.",

    // Output Error
    "output.error_title": "Đã xảy ra lỗi",
    "output.error_retry": "Thử lại",

    // Copy Button
    "copy.button": "Copy",
    "copy.copied": "Đã copy!",
    "copy.description": "Copy mô tả",
    "copy.specs": "Copy thông số",
    "copy.all": "Copy tất cả",
    "copy.keywords": "Copy từ khóa",

    // Image Upload
    "image.title": "AI Slogan cho ảnh sản phẩm",
    "image.description":
      "Upload ảnh sản phẩm, AI sẽ phân tích và đề xuất slogan quảng cáo bằng tiếng Việt phù hợp để chèn trực tiếp lên ảnh.",
    "image.dropzone": "Kéo thả ảnh vào đây hoặc click để chọn",
    "image.limit": "JPG, PNG, WebP • Tối đa 10MB",
    "image.analyzing": "Đang phân tích ảnh...",
    "image.analyze": "Phân tích ảnh",
    "image.change": "Đổi ảnh",
    "image.slogan_label": "Slogan",
    "image.product_name": "Tên sản phẩm",
    "image.style": "Phong cách",
    "image.keywords_label": "Từ khóa",

    // Image Tone
    "image.tone_label": "Phong cách slogan",

    // Footer
    "footer.text": "AI Commerce Agent • Sử dụng Gemini 1.5 Flash • Hỗ trợ 4 ngôn ngữ • Phân tích ảnh bằng AI",

    // SEO
    "seo.title": "AI Commerce Agent | Bản địa hóa sản phẩm 1688",
    "seo.description":
      "Công cụ AI giúp bạn dịch và viết lại nội dung sản phẩm từ 1688.com sang tiếng Việt chuẩn SEO cho Shopee, TikTok Shop.",

    // Language Switcher
    "lang.switcher": "Ngôn ngữ",
  },

  en: {
    // Header
    "app.name": "AI Commerce Agent",
    "app.tagline": "1688 Product Localization",
    "app.badge": "Gemini Flash",

    // Hero
    "hero.title": "Localize 1688 Products with AI",
    "hero.description":
      "Paste raw data from 1688.com, choose a tone. AI extracts specs, writes SEO-optimized Vietnamese descriptions, and suggests catchy titles.",

    // Input Panel
    "input.tone_label": "Tone",
    "input.placeholder":
      "Paste product data from 1688 here...\n\nExample:\n【New Arrival】Korean Style Loose Fit Cotton T-Shirt Women Summer 2024\nFabric: 100% Cotton\nSize: S M L XL XXL\nColor: White Black Gray Pink\nWeight: 0.25kg\nPrice: ¥15.80 - ¥22.50\nMOQ: 5 pcs\nSKU: WX-2405-T001",
    "input.char_count": "/50 characters minimum",
    "input.submit": "Process Product",
    "input.processing": "Processing with AI...",

    // Output Panel
    "output.result_title": "Processing Result",
    "output.new_product": "← Process New Product",
    "output.tab_description": "Description",
    "output.tab_specs": "Specifications",
    "output.tab_titles": "Titles",
    "output.tab_keywords": "Keywords",
    "output.powered_by": "Optimized using Garment Industry Glossaries — by Nguyen Duy, 2 years textile manufacturing experience",

    // Output Empty
    "output.empty_title": "No Results Yet",
    "output.empty_description":
      'Paste product data from 1688 into the box above, choose a tone, and click "Process Product" for AI analysis.',

    // Output Error
    "output.error_title": "An Error Occurred",
    "output.error_retry": "Retry",

    // Copy Button
    "copy.button": "Copy",
    "copy.copied": "Copied!",
    "copy.description": "Copy description",
    "copy.specs": "Copy specs",
    "copy.all": "Copy all",
    "copy.keywords": "Copy keywords",

    // Image Upload
    "image.title": "AI Slogan for Product Images",
    "image.description":
      "Upload a product image, AI will analyze it and suggest Vietnamese advertising slogans ready to overlay on the image.",
    "image.dropzone": "Drag & drop an image here or click to select",
    "image.limit": "JPG, PNG, WebP • Max 10MB",
    "image.analyzing": "Analyzing image...",
    "image.analyze": "Analyze Image",
    "image.change": "Change Image",
    "image.slogan_label": "Slogans",
    "image.product_name": "Product Name",
    "image.style": "Style",
    "image.keywords_label": "Keywords",

    // Image Tone
    "image.tone_label": "Slogan Style",

    // Footer
    "footer.text": "AI Commerce Agent • Powered by Gemini 1.5 Flash • 4-language UI • AI Image Analysis",

    // SEO
    "seo.title": "AI Commerce Agent | 1688 Product Localization",
    "seo.description":
      "AI tool to translate and rewrite 1688.com product content into Vietnamese, optimized for Shopee and TikTok Shop.",

    // Language Switcher
    "lang.switcher": "Language",
  },

  "zh-CN": {
    // Header
    "app.name": "AI Commerce Agent",
    "app.tagline": "1688 产品本地化",
    "app.badge": "Gemini Flash",

    // Hero
    "hero.title": "用 AI 本地化 1688 产品",
    "hero.description":
      "粘贴 1688.com 的原始数据，选择文风。AI 将提取参数、撰写越南语 SEO 描述，并推荐吸睛标题。",

    // Input Panel
    "input.tone_label": "文风",
    "input.placeholder":
      "在此粘贴 1688 产品数据...\n\n示例：\n【新款上市】韩版宽松显瘦纯棉T恤女短袖 2024夏季新款\n面料: 100%纯棉\n尺码: S M L XL XXL\n颜色: 白色 黑色 灰色 粉色\n重量: 0.25kg\n价格: ¥15.80 - ¥22.50\n起批量: 5件\n货号: WX-2405-T001",
    "input.char_count": "/最少 50 个字符",
    "input.submit": "处理产品",
    "input.processing": "AI 正在处理...",

    // Output Panel
    "output.result_title": "处理结果",
    "output.new_product": "← 处理新产品",
    "output.tab_description": "描述",
    "output.tab_specs": "参数",
    "output.tab_titles": "标题",
    "output.tab_keywords": "关键词",
    "output.powered_by": "基于纺织行业术语库优化（Garment Industry Glossaries）— Nguyen Duy，2年纺织制造经验",

    // Output Empty
    "output.empty_title": "暂无结果",
    "output.empty_description":
      "将 1688 产品数据粘贴到上方输入框，选择文风，点击「处理产品」让 AI 进行分析。",

    // Output Error
    "output.error_title": "发生错误",
    "output.error_retry": "重试",

    // Copy Button
    "copy.button": "复制",
    "copy.copied": "已复制！",
    "copy.description": "复制描述",
    "copy.specs": "复制参数",
    "copy.all": "复制全部",
    "copy.keywords": "复制关键词",

    // Image Upload
    "image.title": "AI 产品图片标语",
    "image.description":
      "上传产品图片，AI 将分析并推荐可直接叠加到图片上的越南语广告标语。",
    "image.dropzone": "拖放图片到此处或点击选择",
    "image.limit": "JPG、PNG、WebP • 最大 10MB",
    "image.analyzing": "正在分析图片...",
    "image.analyze": "分析图片",
    "image.change": "更换图片",
    "image.slogan_label": "标语",
    "image.product_name": "产品名称",
    "image.style": "风格",
    "image.keywords_label": "关键词",

    // Image Tone
    "image.tone_label": "标语风格",

    // Footer
    "footer.text": "AI Commerce Agent • 使用 Gemini 1.5 Flash • 支持 4 种语言 • AI 图片分析",

    // SEO
    "seo.title": "AI Commerce Agent | 1688 产品本地化",
    "seo.description":
      "AI 工具，帮助您将 1688.com 产品内容翻译并改写为越南语，针对 Shopee 和 TikTok Shop 进行 SEO 优化。",

    // Language Switcher
    "lang.switcher": "语言",
  },

  "zh-TW": {
    // Header
    "app.name": "AI Commerce Agent",
    "app.tagline": "1688 產品本地化",
    "app.badge": "Gemini Flash",

    // Hero
    "hero.title": "用 AI 本地化 1688 產品",
    "hero.description":
      "貼上 1688.com 的原始資料，選擇文風。AI 將提取參數、撰寫越南語 SEO 描述，並推薦吸睛標題。",

    // Input Panel
    "input.tone_label": "文風",
    "input.placeholder":
      "在此貼上 1688 產品資料...\n\n範例：\n【新款上市】韓版寬鬆顯瘦純棉T恤女短袖 2024夏季新款\n面料: 100%純棉\n尺碼: S M L XL XXL\n顏色: 白色 黑色 灰色 粉色\n重量: 0.25kg\n價格: ¥15.80 - ¥22.50\n起批量: 5件\n貨號: WX-2405-T001",
    "input.char_count": "/最少 50 個字元",
    "input.submit": "處理產品",
    "input.processing": "AI 正在處理...",

    // Output Panel
    "output.result_title": "處理結果",
    "output.new_product": "← 處理新產品",
    "output.tab_description": "描述",
    "output.tab_specs": "參數",
    "output.tab_titles": "標題",
    "output.tab_keywords": "關鍵詞",
    "output.powered_by": "基於紡織行業術語庫優化（Garment Industry Glossaries）— Nguyen Duy，2年紡織製造經驗",

    // Output Empty
    "output.empty_title": "暫無結果",
    "output.empty_description":
      "將 1688 產品資料貼到上方輸入框，選擇文風，點擊「處理產品」讓 AI 進行分析。",

    // Output Error
    "output.error_title": "發生錯誤",
    "output.error_retry": "重試",

    // Copy Button
    "copy.button": "複製",
    "copy.copied": "已複製！",
    "copy.description": "複製描述",
    "copy.specs": "複製參數",
    "copy.all": "複製全部",
    "copy.keywords": "複製關鍵詞",

    // Image Upload
    "image.title": "AI 產品圖片標語",
    "image.description":
      "上傳產品圖片，AI 將分析並推薦可直接疊加到圖片上的越南語廣告標語。",
    "image.dropzone": "拖放圖片到此處或點擊選擇",
    "image.limit": "JPG、PNG、WebP • 最大 10MB",
    "image.analyzing": "正在分析圖片...",
    "image.analyze": "分析圖片",
    "image.change": "更換圖片",
    "image.slogan_label": "標語",
    "image.product_name": "產品名稱",
    "image.style": "風格",
    "image.keywords_label": "關鍵詞",

    // Image Tone
    "image.tone_label": "標語風格",

    // Footer
    "footer.text": "AI Commerce Agent • 使用 Gemini 1.5 Flash • 支援 4 種語言 • AI 圖片分析",

    // SEO
    "seo.title": "AI Commerce Agent | 1688 產品本地化",
    "seo.description":
      "AI 工具，幫助您將 1688.com 產品內容翻譯並改寫為越南語，針對 Shopee 和 TikTok Shop 進行 SEO 優化。",

    // Language Switcher
    "lang.switcher": "語言",
  },
};
