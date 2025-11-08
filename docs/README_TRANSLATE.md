# Vocabulary Translation Script

Script để dịch từ vựng tiếng Anh sang tiếng Việt sử dụng Claude API.

## Setup

1. **Cài đặt dependencies** (đã được cài đặt):
   ```bash
   npm install
   ```

2. **Tạo file `.env`** trong thư mục gốc:
   ```env
   ANTHROPIC_API_KEY=your_api_key_here
   ```

   Lấy API key từ: https://console.anthropic.com/

## Cách sử dụng

Chạy script để dịch 10 từ đầu tiên (để test):
```bash
npm run translate-vocabulary
```

## Cấu trúc

- **Input**: Danh sách từ trong `docs/3000_WORDS.md`
- **Output**: JSON files trong `output/json/[word].json`

## Quy trình

1. **Prompt 1**: Lấy danh sách các nghĩa của từ (raw meanings)
2. **Prompt 2**: Chuyển đổi raw meanings thành JSON format với đầy đủ thông tin tiếng Việt

## Batch Processing

Script xử lý theo batch 10 từ để:
- Dễ kiểm soát
- Tránh tốn chi phí API quá nhiều
- Dễ debug khi có lỗi

## Kết quả

Mỗi từ sẽ tạo ra 1 file JSON trong `output/json/` với cấu trúc:
- `word`: Từ tiếng Anh
- `phonetics`: Phiên âm US/UK
- `definitions`: Mảng các định nghĩa với:
  - `word_vi`: Từ tiếng Việt tương đương
  - `part_of_speech`: Loại từ
  - `sense_label`: Nhãn nghĩa (en/vi)
  - `popularity`: Độ phổ biến (1-5)
  - `definition_en/vi`: Định nghĩa
  - `example_en/vi`: Ví dụ

## Lưu ý

- Script chỉ xử lý 10 từ đầu tiên để test
- Để xử lý toàn bộ 3000 từ, cần sửa `readWords(10)` thành `readWords()` trong script
- Có retry logic (3 lần) nếu API call thất bại
- Có delay 1 giây giữa các từ để tránh rate limiting

