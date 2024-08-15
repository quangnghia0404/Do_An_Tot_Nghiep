import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import Loading from "../../mainspage/utils/loading/Loading";
import axios from "axios";

function Members() {
  const state = useContext(GlobalState);
  const [members, setMembers] = state.membersAPI.members;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.membersAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    members.forEach((member) => {
      if (member._id === id) member.checked = !member.checked;
    });
    setMembers([...members]);
  };

  const deleteMember = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = await axios.post(
        "api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteMember = await axios.delete(`api/members/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteMember;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    members.forEach((member) => {
      member.checked = !isCheck;
    });
    setMembers([...members]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    members.forEach((member) => {
      if (member.checked) deleteMember(member._id, member.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div>
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete All</button>
        </div>
      )}
      <div className="teacher">
        <div className="title text-center">
          <h3 className="title-heading">ĐỘI NGŨ NHÂN VIÊN</h3>
          <div className="line" />
          <p className="title-sub">
            Chúng tôi là những con người trẻ trung và năng động. Luôn đem đến
            cho khách hàng những trải nghiệm tốt nhất.
          </p>
        </div>
        <div className="container">
          <div className="row teacher text-center">
            {members.map((member) => (
              <div className="col-12 col-xl-3 _1teacher" key={member._id}>
                {isAdmin && (
                  <input
                    type="checkbox"
                    type="checkbox"
                    checked={member.checked}
                    onChange={() => handleCheck(member._id)}
                  />
                )}
                <div className="imagess">
                  <img
                    src={member.images.url}
                    alt=""
                    className="teacher img-fluid"
                  />
                </div>
                <div className="nameteacher">{member.name}</div>
                <div className="position">{member.duty}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isAdmin ? (
        <div className="products">
          {members.map((member) => {
            return (
              <div className="box" key={member._id}>
                <div className="product_card">
                  {isAdmin && (
                    <input
                      type="checkbox"
                      type="checkbox"
                      checked={member.checked}
                      onChange={() => handleCheck(member._id)}
                    />
                  )}
                  <img src={member.images.url} />
                  <div className="product_box">
                    <h2>{member.name}</h2>
                    <p>{member.content}</p>
                    <span>{member.duty}</span>
                  </div>
                  {isAdmin ? (
                    <div className="row_btn">
                      <Link
                        id="btn_buy"
                        to="#!"
                        onClick={() =>
                          deleteMember(member._id, member.images.public_id)
                        }
                      >
                        Delete
                      </Link>
                      <Link id="btn_view" to={`/edit_member/${member._id}`}>
                        Edit
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Members;
