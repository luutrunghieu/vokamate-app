# Hướng dẫn cấu hình Google OAuth cho Supabase mới

## Tổng quan

App sử dụng Google OAuth để đăng nhập. Khi chuyển sang Supabase project mới, cần cấu hình lại Google OAuth provider.

## Các bước cấu hình

### 1. Lấy Google OAuth Credentials

Nếu bạn đã có Google OAuth credentials từ project cũ, có thể sử dụng lại. Nếu chưa có:

1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project của bạn (hoặc tạo mới)
3. Vào **APIs & Services** → **Credentials**
4. Tạo **OAuth 2.0 Client ID** (nếu chưa có)
5. Copy **Client ID** và **Client Secret**

### 2. Cấu hình trong Supabase Dashboard

1. Vào Supabase Dashboard → Project mới của bạn
2. Vào **Authentication** → **Providers**
3. Tìm và bật **Google** provider
4. Điền thông tin:
   - **Client ID (for OAuth)**: Dán Client ID từ Google Cloud Console
   - **Client Secret (for OAuth)**: Dán Client Secret từ Google Cloud Console
5. Lưu lại

### 3. Cấu hình Redirect URLs

Trong Supabase Dashboard → **Authentication** → **URL Configuration**:

**Site URL:**

```
vokamateapp://
```

**Redirect URLs** - Thêm các URL sau:

```
vokamateapp://google-auth
https://lpdoukyidxlasfcthfpl.supabase.co/auth/v1/callback
```

> **Lưu ý**: Thay `lpdoukyidxlasfcthfpl` bằng project reference ID của bạn (có thể tìm trong URL của Supabase project)

### 4. Cấu hình Google Cloud Console

Trong Google Cloud Console → **APIs & Services** → **Credentials** → Chọn OAuth Client của bạn:

**Authorized redirect URIs** - Thêm:

```
https://lpdoukyidxlasfcthfpl.supabase.co/auth/v1/callback
```

> **Lưu ý**: Thay `lpdoukyidxlasfcthfpl` bằng project reference ID của bạn

### 5. Kiểm tra file .env.local

Đảm bảo file `.env.local` có các biến sau:

```env
EXPO_PUBLIC_SUPABASE_URL=https://lpdoukyidxlasfcthfpl.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID=<your-google-client-id>
```

### 6. Test đăng nhập

1. Restart Expo development server:

   ```bash
   npx expo start
   ```

2. Thử đăng nhập bằng Google trong app

3. Kiểm tra xem có lỗi gì không trong console

## Troubleshooting

### Lỗi: "redirect_uri_mismatch"

- Kiểm tra lại Redirect URLs trong Supabase Dashboard
- Kiểm tra lại Authorized redirect URIs trong Google Cloud Console
- Đảm bảo URL chính xác (không có trailing slash)

### Lỗi: "invalid_client"

- Kiểm tra lại Client ID và Client Secret trong Supabase
- Đảm bảo đã enable Google provider trong Supabase

### Session không được tạo

- Kiểm tra xem bảng `profiles` đã được tạo chưa
- Kiểm tra trigger `on_auth_user_created` có hoạt động không
- Xem logs trong Supabase Dashboard → Logs → Auth

## Thông tin quan trọng

- **App Scheme**: `vokamateapp` (từ `app.json`)
- **Redirect URL**: `vokamateapp://google-auth`
- **Supabase Project URL**: `https://lpdoukyidxlasfcthfpl.supabase.co` (thay bằng URL của bạn)

## Checklist

- [ ] Google OAuth credentials đã được tạo trong Google Cloud Console
- [ ] Google provider đã được enable trong Supabase
- [ ] Client ID và Client Secret đã được cấu hình trong Supabase
- [ ] Redirect URLs đã được thêm vào Supabase
- [ ] Authorized redirect URIs đã được thêm vào Google Cloud Console
- [ ] File `.env.local` đã được cập nhật với thông tin mới
- [ ] Đã test đăng nhập thành công
