# Hướng dẫn Development Build

## Vấn đề

Lỗi: `No development build (com.yourco.vokamate) for this project is installed`

## Giải pháp

### Cách 1: Build Development Build cho iOS Simulator (Nhanh nhất)

```bash
# Build cho iOS Simulator
eas build --profile development --platform ios

# Sau khi build xong, cài đặt trên simulator
eas build:run -p ios --profile development
```

Hoặc nếu bạn đã có build, chỉ cần cài đặt:

```bash
eas build:run -p ios --profile development
```

### Cách 2: Build Development Build cho thiết bị thật

```bash
# Build cho iOS device
eas build --profile development --platform ios

# Sau khi build xong, tải về và cài đặt qua TestFlight hoặc link download
```

### Cách 3: Build local (Nhanh hơn, không cần EAS)

```bash
# Cài đặt EAS CLI nếu chưa có
npm install -g eas-cli

# Login vào EAS
eas login

# Build local cho iOS Simulator
eas build --profile development --platform ios --local
```

### Cách 4: Chạy trên Expo Go (Tạm thời)

Nếu bạn muốn test nhanh mà không cần build, có thể chạy trên Expo Go:

```bash
# Start Expo với Expo Go mode
npx expo start --go
```

**Lưu ý**: Một số native modules như `expo-secure-store` có thể không hoạt động đầy đủ trên Expo Go.

## Kiểm tra build hiện có

```bash
# Xem danh sách builds
eas build:list
```

## Troubleshooting

### Build bị lỗi credentials

- Đảm bảo đã login: `eas login`
- Kiểm tra credentials: `eas credentials`

### Muốn build cho Android

```bash
eas build --profile development --platform android
```

## Lưu ý

- Development build chỉ cần build 1 lần, sau đó có thể dùng lại
- Mỗi khi thay đổi native code, cần build lại
- Thay đổi JavaScript code không cần build lại, chỉ cần reload
