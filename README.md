# AI TAMIL Company

Hệ thống SaaS AI hoàn chỉnh với Next.js 14, Supabase và OpenAI.

## Yêu cầu

- Node.js 18+
- Supabase project
- OpenAI API key

## Hướng dẫn cài đặt và chạy (Local)

1. Tải code về và mở folder project.
2. Tạo file `.env.local` tại thư mục gốc với các thông tin sau:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```
3. Khởi tạo Database trên Supabase:
   - Copy toàn bộ nội dung trong file `supabase/schema.sql`.
   - Paste và chạy trong SQL Editor của Supabase project của bạn.
   - Kiểm tra xem Email Login Provider đã bật (enable) trên Dashboard Supabase.
4. Cài đặt thư viện:
   ```bash
   npm install
   ```
5. Chạy server (trình độ localhost):
   ```bash
   npm run dev
   ```
6. Truy cập `http://localhost:3000` trên trình duyệt.

## Vercel Deployment

Dự án tương thích và sẵn sàng deploy lên Vercel để chạy production:
1. Đẩy code lên môi trường quản lí như GitHub.
2. Login vào Vercel, "Add New Project" để kết nối đến repo.
3. Thêm các Biến Môi trường (Environment Variables) trong phần Setting.
4. Bấm tiến hành **Deploy**.
