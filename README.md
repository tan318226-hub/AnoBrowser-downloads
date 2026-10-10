# AnoBrowser downloads

Website download chính thức cho nhóm dùng thử AnoBrowser. Bộ cài Windows và Ubuntu được lưu ở [GitHub Releases](https://github.com/tan318226-hub/AnoBrowser-downloads/releases); macOS sẽ được bổ sung sau.

Repository này chỉ chứa website và bản phân phối đã đóng gói. Mã nguồn ứng dụng được quản lý riêng.

## Website

Bật **Settings → Pages → Source → GitHub Actions**. Workflow `Publish download website` triển khai trang khi cập nhật nhánh `main`.

## Đăng bản phát hành

Tạo Release theo từng nền tảng:

- Windows: `windows/v0.14.13-r1-beta.1`, đánh dấu pre-release; đính kèm `AnoBrowser-0.14.13-windows.1-beta.1-x64-setup.exe`, file `.sha256` và `BETA-README.txt`.
- Ubuntu: `ubuntu/v0.14.13-r0`; đính kèm gói `_amd64.deb`, archive (nếu có) và `SHA256SUMS`.

Website chọn Release đã publish gần nhất của mỗi nền tảng có bộ cài đúng định dạng. Draft chưa xuất hiện trên website. File tên `-x64-setup.exe` được dùng cho Windows, `_amd64.deb` cho Ubuntu. Bản beta được hỗ trợ; không dùng `/releases/latest` vì hai nền tảng phát hành độc lập.

Windows beta hiện chưa ký số. Xem ghi chú của bản phát hành trước khi cài. Gửi feedback tại Issues, không đưa cookie, mật khẩu hoặc credential proxy vào báo lỗi.

macOS Intel card đọc release macos/ có DMG. Chọn core/revision trước ngày publish; draft không hiển thị. Chỉ website và asset logo được chép sang repo public.
