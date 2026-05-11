# 🚀 Hướng dẫn Deploy lên Netlify (0 đồng)

## Cách 1: Deploy bằng Netlify CLI (Khuyên dùng)

### Bước 1: Cài Netlify CLI
```bash
npm install -g netlify-cli
```

### Bước 2: Đăng nhập Netlify
```bash
netlify login
```
Trình duyệt sẽ mở ra, đăng nhập bằng GitHub của bạn.

### Bước 3: Khởi tạo dự án
```bash
cd "AI COMMERCE AGENT"
netlify init
```
- Chọn "Create & configure a new site"
- Chọn team của bạn
- Đặt tên site (VD: `ai-commerce-agent`)

### Bước 4: Thiết lập Environment Variables
```bash
netlify env:set GEMINI_API_KEY "your_api_key_here"
```
Hoặc vào Netlify Dashboard → Site Settings → Environment Variables → Add variable:
```
Key: GEMINI_API_KEY
Value: AIzaSy...
```

### Bước 5: Deploy!
```bash
netlify deploy --prod --build
```
Sau khi deploy xong, app sẽ có link dạng: `https://ai-commerce-agent.netlify.app`

---

## Cách 2: Deploy bằng Netlify Web UI (Dễ nhất)

### Bước 1: Đẩy code lên GitHub
```bash
git add .
git commit -m "Ready for Netlify deploy"
git push origin main
```

### Bước 2: Vào Netlify
1. Truy cập: https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Chọn GitHub → Chọn repository `ai-commerce-agent`
4. Cấu hình build:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Click "Show advanced" → "Add environment variables":
   - Key: `GEMINI_API_KEY`
   - Value: `AIzaSy...` (API key của bạn)
6. Click "Deploy site"

### Bước 3: Đợi build
Netlify sẽ tự động build và deploy. Sau khi xong, bạn sẽ có link dạng:
`https://[tên-site].netlify.app`

---

## ⚠️ LƯU Ý QUAN TRỌNG

### API Key
- **KHÔNG BAO GIỜ** commit file `.env.local` lên GitHub
- File `.env.local` đã được thêm vào `.gitignore`
- Chỉ thiết lập API key qua Netlify Dashboard hoặc CLI

### Build lần đầu
- Netlify sẽ tự động cài `@netlify/plugin-nextjs` nếu cần
- Nếu gặp lỗi build, kiểm tra log trong Netlify Dashboard

### Custom Domain (Tùy chọn)
- Netlify hỗ trợ custom domain miễn phí
- Vào Domain Settings → Add custom domain

---

## 🔄 Cập nhật sau khi deploy

Mỗi lần push code mới lên GitHub, Netlify sẽ tự động build và deploy lại.
Không cần làm gì thêm!
