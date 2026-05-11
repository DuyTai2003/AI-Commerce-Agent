/**
 * 1688 Data Feeder Bookmarklet
 *
 * Cách sử dụng:
 * 1. Mở file này, copy TOÀN BỘ nội dung
 * 2. Tạo bookmark mới trên Chrome, đặt tên "1688 Feeder"
 * 3. Dán toàn bộ code vào ô URL
 * 4. Khi đang xem sản phẩm trên 1688.com, click bookmarklet
 * 5. Dữ liệu sẽ tự động được trích xuất và gửi sang AI Commerce Agent
 *
 * Hỗ trợ: 1688.com, detail.1688.com
 */

javascript: (function () {
  const APP_URL = "https://truongduy-ai-commerce.netlify.app/";

  // ====== STEP 1: Trích xuất dữ liệu từ trang 1688 ======
  function extract1688Data() {
    const data = {
      title: "",
      price: "",
      images: [],
      description: "",
      specs: {},
      rawText: "",
    };

    // Lấy tiêu đề sản phẩm
    const titleEl =
      document.querySelector(
        'h1[data-testid="productTitle"], .product-title, .mod-detail-title, h1[class*="title"]'
      ) ||
      document.querySelector("h1") ||
      document.querySelector("title");
    if (titleEl) {
      data.title = titleEl.textContent?.trim() || "";
    }

    // Lấy giá
    const priceEl =
      document.querySelector(
        '[class*="price"], [class*="Price"], .mod-detail-price, span[class*="price"]'
      );
    if (priceEl) {
      data.price = priceEl.textContent?.trim() || "";
    }

    // Lấy ảnh sản phẩm (tối đa 5 ảnh)
    const imgElements = document.querySelectorAll(
      'img[class*="detail"], img[class*="product"], img[class*="lazyload"], .mod-detail-gallery img, [data-src]'
    );
    const seen = new Set();
    imgElements.forEach((img) => {
      const src = (img.getAttribute("src") || img.getAttribute("data-src") || "").replace(/\.webp.*$/, "");
      if (
        src &&
        !seen.has(src) &&
        !src.includes("data:image") &&
        !src.includes("avatar") &&
        !src.includes("icon") &&
        !src.includes("logo") &&
        !src.includes("banner") &&
        data.images.length < 5
      ) {
        seen.add(src);
        data.images.push(src);
      }
    });

    // Lấy mô tả chi tiết
    const descEl =
      document.querySelector(
        '[class*="description"], [class*="detail"], #desc-lazyload-container, .mod-detail-description'
      );
    if (descEl) {
      data.description = descEl.textContent?.trim() || "";
    }

    // Lấy thông số kỹ thuật (bảng specs)
    const specRows = document.querySelectorAll(
      'table[class*="spec"] tr, .mod-detail-attributes li, [class*="attribute"] li, .mod-detail-sku li'
    );
    specRows.forEach((row) => {
      const text = row.textContent?.trim() || "";
      const parts = text.split(/[：:]/);
      if (parts.length === 2) {
        const key = parts[0].trim();
        const value = parts[1].trim();
        if (key && value && key.length < 50) {
          data.specs[key] = value;
        }
      }
    });

    // Tổng hợp rawText
    const parts = [];
    if (data.title) parts.push(`【${data.title}】`);
    if (data.price) parts.push(`价格: ${data.price}`);
    Object.entries(data.specs).forEach(([k, v]) => {
      parts.push(`${k}: ${v}`);
    });
    if (data.description) parts.push(data.description);

    data.rawText = parts.join("\n");

    return data;
  }

  // ====== STEP 2: Hiển thị popup xác nhận ======
  const data = extract1688Data();

  if (!data.rawText || data.rawText.length < 20) {
    alert(
      "⚠️ Không tìm thấy dữ liệu sản phẩm.\n\n" +
        "Hãy đảm bảo bạn đang ở trang chi tiết sản phẩm trên 1688.com.\n" +
        "Nếu vẫn lỗi, hãy copy-paste thủ công vào app."
    );
    return;
  }

  const previewText =
    data.rawText.length > 300 ? data.rawText.substring(0, 300) + "..." : data.rawText;

  const confirmed = confirm(
    `📦 ĐÃ QUÉT ĐƯỢC SẢN PHẨM:\n\n` +
      `${previewText}\n\n` +
      `📸 Ảnh: ${data.images.length} ảnh\n\n` +
      `Nhấn OK để mở AI Commerce Agent với dữ liệu đã điền sẵn!`
  );

  if (!confirmed) return;

  // ====== STEP 3: Mã hóa và gửi dữ liệu sang web app ======
  const encodedData = encodeURIComponent(JSON.stringify(data));

  // Mở app trong tab mới với dữ liệu qua query param
  window.open(`${APP_URL}/?feed=${encodedData}`, "_blank");
})();
