import React from "react";
import Footer from "../../footers/Footer";
import { Link } from "react-router-dom";

function Introduce() {
  return (
    <div>
      <div className=" note">
        <div className="note-left">
          <p>Giới thiệu</p>
        </div>
        <div className="note-right">
          <Link to="/" id="link">
            Trang chủ
          </Link>{" "}
          / Giới thiệu
        </div>
      </div>
      <div className="container">
        <div class="about_us">
          <h2>CÔNG TY CHÚNG TÔI</h2>
          <p>
            <span className="abc">CÔNG TY TNHH CÔNG NGHỆ ADH</span> xin gửi tới
            Quý khách hàng lời chúc sức khỏe và lời chào trân trọng nhất, chân
            thành cảm ơn sự ủng hộ và tin tưởng của Quý khách hàng đã dành cho
            công ty chúng tôi trong suốt thời gian qua.
          </p>
          <hr />
          <span>Thưa Quý khách hàng !</span>
          <p>
            <span className="abc">CÔNG TY TNHH CÔNG NGHỆ ADH</span> là nhà phân
            phối chính thức với những thương hiệu nổi tiếng trong lĩnh vực cung
            cấp thiết bị và các giải pháp cho khách sạn và căn hộ cao cấp.
          </p>
          <h6>+ Bản lề tự động: I-ONE.</h6>
          <h6>+ Cửa xoay tự động: KBB.</h6>
          <h6>+ Thiết bị khách sạn: Uni-Sec.</h6>
          <h6>+ Khóa khách sạn, căn hộ cao cấp: Amadeo, Adel, Hune.</h6>
          <img
            src="https://scontent.fdad1-1.fna.fbcdn.net/v/t1.6435-9/86350240_104816881103761_1976444572665905152_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=730e14&_nc_ohc=PZncaofCY1MAX93yMaY&_nc_ht=scontent.fdad1-1.fna&oh=7629d805d0d7d9bbbdedd5995635c928&oe=60E1F3E7"
            width="900"
            alt=""
          />
          <p>
            Với bề dày trong lĩnh vực cung cấp thiết bị và giải pháp cho khách
            sạn, căn hộ cao cấp,…chúng tôi chọn lựa những thương hiệu nổi tiếng,
            uy tín, với chất lượng tốt nhất theo yêu cầu khắc khe về mặt kỹ
            thuật và được kiểm tra nghiêm ngặt trước khi đưa đến khách hàng sử
            dụng.
          </p>
          <p>
            Với phương châm khách hàng sẽ mang đến: ‘’ thành công ‘’ cho Công Ty
            chúng tôi, Công Ty chúng tôi mong muốn mang những sản phẩm tốt nhất,
            dịch vụ sau bán hàng tốt nhất để tri ân lại những tình cảm mà tất
            các khách hàng dành cho Công Ty chúng tôi.
          </p>
          <h3 class="at">
            <i>THE BEST SERVICE – THE BEST WAY TO SUCCESS !</i>
          </h3>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Introduce;
