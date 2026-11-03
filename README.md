# Nền Tảng Đố Vui An Toàn Số - Chiến Dịch Không Một Mình - Kết Nối Không Tổn Thương

Nền tảng kiểm tra kiến thức và đố vui tương tác về an toàn thông tin, phòng chống lừa đảo trực tuyến. Hệ thống được clone dữ liệu chính thức từ [niemtinsogialai.vn/do-vui](https://niemtinsogialai.vn/do-vui), hỗ trợ cấp Giấy Chứng Nhận (PDF & PNG) tự động khi đạt từ **8/10 điểm**.

---

## 🌟 Tính Năng Nổi Bật

1. **Bộ câu hỏi chính thức (305+ câu)**:
   - **Hiệp sĩ nhí** (Tiểu học): 55 câu
   - **Vệ binh số** (THCS): 41 câu
   - **Chiến binh mạng** (THPT): 43 câu (Phổ biến nhất)
   - **Thủ lĩnh kết nối** (Sau THPT / Sinh viên): 41 câu
   - **Lá chắn yêu thương** (Phụ huynh): 45 câu
   - **Người dẫn đường** (Giáo viên): 40 câu
   - **Phát hiện thật / giả** (Tình huống thực tế tin nhắn, video, hình ảnh): 40 câu

2. **Form thông tin thí sinh trước khi thi**:
   - Yêu cầu nhập **Họ và tên** cùng **Đơn vị / Trường học / Cơ quan**.
   - Lưu trữ tự động vào trình duyệt, hiển thị trực tiếp lên Giấy Chứng Nhận.

3. **Tính tương tác cao**:
   - Hiệu ứng âm thanh chân thực bằng Web Audio API (không cần tải file ngoài, hoạt động mượt mà offline).
   - Streak combo lửa (x2, x3,... combo đúng liên tiếp).
   - Phản hồi giải thích chuyên sâu ngay sau mỗi câu hỏi.
   - Hỗ trợ phím tắt (1, 2, 3, 4 hoặc A, B, C, D để chọn đáp án; Enter để qua câu tiếp theo).
   - Pháo hoa chúc mừng (Confetti) khi đạt điều kiện nhận chứng nhận.
   - Bảng xem lại chi tiết bài làm và đáp án đúng.

4. **Cấp Giấy Chứng Nhận Điện Tử (PDF & PNG)**:
   - Điều kiện: Đạt từ **8/10 điểm trở lên** (&ge; 80%).
   - Định dạng chuẩn: Khổ A4 nằm ngang, hoa văn viền vàng hoàng gia (Guilloché), con dấu đỏ bảo chứng, mã xác thực duy nhất, QR code và chữ ký số.
   - Xuất file **PDF chất lượng cao** để in ấn hoặc lưu hồ sơ.
   - Xuất file **Ảnh PNG nét căng** để dễ dàng chia sẻ lên Zalo, Facebook, Story.

5. **Tối ưu Mobile & Web**:
   - Giao diện Dark theme sang trọng, tương thích hoàn toàn trên iPhone, iPad, Android và Desktop.
   - Nút bấm to, rõ, chống zoom ngoài ý muốn trên trình duyệt di động.

---

## 🚀 Hướng Dẫn Khởi Chạy

Ứng dụng đang chạy sẵn tại:
- **Trên máy tính**: [http://localhost:5173/](http://localhost:5173/)
- **Trên điện thoại di động (cùng mạng Wi-Fi)**: [http://192.168.0.55:5173/](http://192.168.0.55:5173/)

### Lệnh quản lý:
```bash
# Chạy môi trường phát triển (Dev)
npm run dev

# Đóng gói sản phẩm (Build Production)
npm run build

# Xem bản đóng gói (Preview)
npm run preview

# Cào lại dữ liệu mới nhất từ niemtinsogialai.vn (nếu cần)
node crawler.js
```
