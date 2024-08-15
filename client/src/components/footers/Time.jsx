import React from "react";

function Time() {
  return (
    <div>
      <section className="big-deal">
        <div className="container">
          <h1 className="section-heading text-pure">
            Số ngày còn giảm giá trong tháng
          </h1>
          <h4 class="giveaway">
            Tặng phẩm sẽ kết thúc vào ngày Chủ nhật, 2 july 2021, 13:20 pm
          </h4>
          <div className="timer">
            <div className="deadline-format">
              <h4 className="days">02</h4>
              <span>Days</span>
            </div>
            <div className="deadline-format">
              <h4 className="hours">24</h4>
              <span>Hours</span>
            </div>
            <div className="deadline-format">
              <h4 className="mins">55</h4>
              <span>Minutes</span>
            </div>
            <div className="deadline-format">
              <h4 className="secs">58</h4>
              <span>Seconds</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Time;
