import React, { useState } from "react";
import Contacer from "../../headers/icon/traveler.png";
import Bag from "../../icons/bag-2.svg";
import Phonee from "../../icons/phone-2.svg";
import Clock from "../../icons/clock-2.svg";
import Footer from "../../footers/Footer";
import { send } from "emailjs-com";
import Swal from "sweetalert2";

function ContactHome() {
  const [toSend, setToSend] = useState({
    from_name: "",
    subject: "",
    message: "",
    reply_to: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    send(
      "service_bbbuq9h",
      "template_rsli9su",
      toSend,
      "user_pWZsebKZKTzcm3UaleQYA"
    )
      .then((response) => {
        Swal.fire(
          "Gửi mail thành công",
          "Bạn hãy click vào nút này!",
          "success",
          response.status,
          response.text
        );
        window.location.replace("/");
      })
      .catch((err) => {
        alert("FAILED...", err);
      });
  };
  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <section className="contact-us d-flex mb-5 mt-5">
        <div className="contact-info-wrapper">
          <h1 className="section-heading">Liên hệ chúng tôi</h1>
          <div className="contact-info">
            <div>
              <div>
                <img src={Phonee} alt="" />
                <div>
                  <span>Gọi cho chúng tôi:</span>
                  <span className="phonee">(+84) 123 456 789</span>
                </div>
              </div>
              <div>
                <img src={Bag} alt="" />
                <div>
                  <span>E-mail ::</span>
                  <span>support@freshmeal.com</span>
                </div>
              </div>
              <div>
                <img src={Clock} alt="" />
                <div>
                  <span>Giờ làm việc:</span>
                  <span>Mon - Sat (8.00am - 17.00pm)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.4124841347093!2d109.1919672142985!3d12.287984932834913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317067fdd7773b47%3A0x1717c8f3f940dd8d!2zMjggxJBp4buHbiBCacOqbiBQaOG7pywgVsSpbmggSOG6o2ksIFRow6BuaCBwaOG7kSBOaGEgVHJhbmcsIEtow6FuaCBIw7JhIDY1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1621389876330!5m2!1svi!2s"
            width="100%"
            height="100%"
            frameBorder={0}
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
      </section>

      <div className="contact">
        <div className="container">
          <h5 className="section-head">
            <div className="heading">LIÊN HÊ</div>
            <span className="sub-heading">Hãy liên hệ với chúng tôi</span>
          </h5>
          <div className="contact-content">
            <div className="traveler-wrap">
              <img src={Contacer} alt="" />
            </div>
            <form className="form contact-form" onSubmit={onSubmit}>
              <div className="input-group-wrap">
                <div className="input-group">
                  <input
                    type="text"
                    className="input"
                    placeholder="Tên"
                    required
                    name="from_name"
                    value={toSend.from_name}
                    onChange={handleChange}
                  />
                  <span className="bar" />
                </div>
                <div className="input-group">
                  <input
                    name="reply_to"
                    value={toSend.reply_to}
                    onChange={handleChange}
                    type="email"
                    className="input"
                    placeholder="E-mail"
                    required
                  />
                  <span className="bar" />
                </div>
              </div>
              <div className="input-group">
                <input
                  name="subject"
                  value={toSend.subject}
                  onChange={handleChange}
                  type="text"
                  className="input"
                  placeholder="Tiêu đề"
                  required
                />
                <span className="bar" />
              </div>
              <div className="input-group">
                <textarea
                  name="message"
                  value={toSend.message}
                  onChange={handleChange}
                  cols={30}
                  rows={8}
                  type="text"
                  className="input"
                  placeholder="Nội dung"
                  required
                  defaultValue={""}
                />
                <span className="bar" />
              </div>
              <button type="submit" className="btn form-btn btn-purple mt-3">
                Gửi tin nhắn
                <span className="dots">
                  <i className="fas fa-ellipsis-h" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactHome;
