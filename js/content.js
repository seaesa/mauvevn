/* Content for static pages, blog and shipping popup.
   NOTE: the wording below is a short, original summary written for this clone —
   it is NOT the shop's official text. Replace each `html` value with the real copy. */
(function () {
  "use strict";
  var IMG = "https://file.hstatic.net/200000408461/";

  var shippingHtml =
    '<p>Đơn hàng được vận chuyển qua đơn vị <span class="accent">Giao Hàng Nhanh</span>.</p>' +
    "<p>Sau khi đặt hàng thành công trên website, khách hàng nhận email xác nhận đơn hàng.</p>" +
    "<p>Khi đơn được bàn giao cho đơn vị vận chuyển, khách hàng nhận thêm email kèm mã vận đơn.</p>" +
    "<p>Thời gian và phí giao hàng:</p>" +
    '<table class="ship-table"><thead><tr><th>Địa điểm</th><th>Thời gian giao hàng dự kiến</th><th>Phí giao hàng</th></tr></thead>' +
    "<tbody><tr><td>Nội thành Hồ Chí Minh</td><td>1-2 ngày</td><td>20,000</td></tr>" +
    "<tr><td>Các Tỉnh &amp; Thành phố khác</td><td>3-5 ngày</td><td>20,000</td></tr></tbody></table>" +
    '<h3 class="accent">CHÍNH SÁCH KIỂM HÀNG</h3>' +
    "<ul><li>Khách hàng có thể yêu cầu đồng kiểm cùng nhân viên giao hàng.</li>" +
    "<li>Được mở hộp kiểm tra mẫu mã, size và số lượng; không hỗ trợ thử sản phẩm.</li>" +
    "<li>Nếu từ chối nhận hàng, khách hàng thanh toán phí vận chuyển hai chiều.</li></ul>";

  var PAGES = {
    "thuong-hieu": {
      title: "Thương hiệu",
      html:
        "<p>Mauve là thương hiệu thời trang thiết kế dành cho phụ nữ Việt, thành lập năm 2018 tại TP. Hồ Chí Minh.</p>" +
        "<p>Phong cách của Mauve kết hợp chất liệu và hoạ tiết mang tinh thần Á Đông với phom dáng hiện đại, ứng dụng hằng ngày.</p>" +
        "<p>Mỗi thiết kế chú trọng vào chất liệu, chi tiết và sự thoải mái khi mặc.</p>" +
        "<hr>" +
        "<p>Mauve — Vietnamese local brand for women's clothing.</p>" +
        "<p>Instagram: mauve.vn</p>" +
        "<p>Store: 136/6 Lê Thánh Tôn, Bến Thành, District 1, HCMC</p>" +
        '<img src="' + IMG + 'file/ch1_58421e34d178496d8aad197f046500b3.jpg" alt="Mauve store">'
    },
    "bang-kich-co": {
      title: "Bảng kích cỡ",
      html: '<img src="' + IMG + 'file/size_chart_-_new_d8d3394d1a004174983d0b77b2700ee6.jpg" alt="Size chart">'
    },
    "chinh-sach-doi-hang": {
      title: "Chính sách đổi hàng",
      html:
        '<p>Mauve <span class="accent">hỗ trợ đổi size hoặc kiểu dáng khác trong 07 ngày</span> kể từ ngày nhận hàng, với sản phẩm:</p>' +
        "<ul><li>Nguyên giá</li><li>Còn nguyên form, chưa qua chỉnh sửa</li><li>Chưa qua sử dụng, giặt hoặc sấy</li></ul>" +
        "<h3>Cách thức đổi hàng</h3>" +
        "<p><u>Bước 1:</u> Liên hệ Mauve, cung cấp thông tin đơn hàng và sản phẩm cần đổi.</p>" +
        "<p><u>Bước 2:</u> Đóng gói và gửi sản phẩm về Mauve theo hướng dẫn.</p>" +
        "<p><u>Bước 3:</u> Mauve kiểm tra và xác nhận tình trạng sản phẩm.</p>" +
        "<p><u>Bước 4:</u> Mauve gửi sản phẩm mới (hoặc hoàn trả sản phẩm nếu không đủ điều kiện).</p>" +
        "<h3>Phương thức thanh toán</h3>" +
        "<p>Khách hàng hỗ trợ phí vận chuyển hai chiều khi đổi hàng.</p>" +
        "<ul><li>Sản phẩm mới có giá cao hơn: thanh toán thêm phần chênh lệch.</li>" +
        "<li>Sản phẩm mới có giá thấp hơn: phần chênh lệch được hoàn bằng voucher điện tử.</li></ul>" +
        '<p>*** Mauve <span class="accent">không hỗ trợ trả hàng - hoàn tiền</span>.</p>'
    },
    "chinh-sach-giao-hang": { title: "Chính sách giao hàng", html: shippingHtml },
    "phuong-thuc-thanh-toan": {
      title: "Phương thức thanh toán",
      html:
        "<p>Mauve nhận thanh toán theo các hình thức sau:</p>" +
        "<ul><li>Thanh toán khi nhận hàng (COD).</li><li>Chuyển khoản ngân hàng.</li><li>Thanh toán trực tiếp tại cửa hàng.</li></ul>" +
        "<p>Thông tin chi tiết được hiển thị ở bước thanh toán.</p>"
    },
    "chinh-sach-bao-mat": {
      title: "Chính sách bảo mật",
      html:
        "<h3>1. Mục đích và phạm vi thu thập thông tin</h3><p>Thông tin cần thiết để xử lý đơn hàng: họ tên, số điện thoại, email, địa chỉ.</p>" +
        "<h3>2. Phạm vi sử dụng thông tin</h3><p>Dùng để giao hàng, chăm sóc khách hàng và gửi thông tin khuyến mãi khi được đồng ý.</p>" +
        "<h3>3. Thời gian lưu trữ thông tin</h3><p>Lưu trữ đến khi khách hàng yêu cầu huỷ.</p>" +
        "<h3>4. Bên thứ ba</h3><p>Chỉ chia sẻ với đơn vị vận chuyển và thanh toán để hoàn tất đơn hàng.</p>" +
        "<h3>5. Địa chỉ đơn vị thu thập &amp; quản lý thông tin</h3><p>Hộ kinh doanh Mauve — 136/6 Lê Thánh Tôn, Bến Thành, Quận 1, TP.HCM.</p>" +
        "<h3>6. Quyền của khách hàng</h3><p>Khách hàng có quyền kiểm tra, cập nhật hoặc yêu cầu xoá thông tin cá nhân.</p>" +
        "<h3>7. Cam kết bảo mật thông tin</h3><p>Mauve cam kết bảo mật thông tin khách hàng.</p>" +
        "<h3>8. Liên hệ với chúng tôi</h3><p>Hotline: 0896620599 — Email: mauve.order@gmail.com</p>"
    }
  };

  var ARTICLES = [
    {
      handle: "triangle-dress-version-sangria-red-for-christmas",
      blog: "news",
      title: "Triangle dress - version ‘Sangria Red for Christmas’",
      date: "03.12.2021",
      cover: IMG + "article/cv_web_2dfb354df7694a369132d2d04ca63c61_master.png",
      excerpt: "Phiên bản Triangle dress màu đỏ Sangria cho mùa lễ hội cuối năm.",
      images: [
        IMG + "file/sangria__1__5576ef732a994d1a8389ef332b5ce9fb_grande.png",
        IMG + "file/web_1acb64f5be81423daf2623cec6b70bfe_grande.png",
        IMG + "file/web__1__e77c3217e81d40ae9263fcf4f78eed7f_grande.png",
        IMG + "file/ynf_0d4098768506436897992a91a5ae16c2_grande.jpg"
      ]
    },
    {
      handle: "12-dieu-thu-vi-ve-dam-mauve-signature-co-the-chi-chua-biet-tai-mauve",
      blog: "news",
      title: "10 điều thú vị về đầm Mauve Signature có thể chị chưa biết tại Mauve",
      date: "18.11.2021",
      cover: IMG + "article/1__1__57c4248dc3eb4729b165b88c746b00f4_master.png",
      excerpt: "Những điều thú vị về thiết kế đầm Mauve Signature.",
      images: [
        IMG + "file/screen_shot_2021-11-19_at_9.16.24_am_c5a4c0988b684603b268ed32130c7da5_grande.png",
        IMG + "file/blog_4b9c1acc2a58470c971bdd0e0b7bcf0a_grande.png",
        IMG + "file/blog__bai_dang_instagram__81840572f87c491eb7c169bc9efb5b46_grande.png",
        IMG + "file/blog__1__1537056d5ab444cb9f71ff4c42c6390a_grande.png",
        IMG + "file/blog__2__c1941246d6b74acfa2575e71fee2d24e_grande.png",
        IMG + "file/blog__3__23c031c8052d46bea1473916b133cbcc_grande.png",
        IMG + "file/blog__4__3d319f69d9a84e2fa36bb44fb05e2419_grande.png"
      ]
    }
  ];

  window.MauveContent = { PAGES: PAGES, ARTICLES: ARTICLES, shippingHtml: shippingHtml };
})();
