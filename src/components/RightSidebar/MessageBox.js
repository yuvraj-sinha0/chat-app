import React, { useEffect, useState } from "react";

import LeftChatBubble from "./LeftChatBubble";
import { useDispatch } from "react-redux";
import RightChatBubble from "./RightChatBubble";
import MessageInput from "./MessageInput";
import { addNewMessage } from "../../actions/contact";
import ProfileHeader from "../LeftSidebar/ProfileHeader";
function MessageBox(props) {
  const [chat, setChat] = useState([]);
  const [length, setLength] = useState();
  const dispatch = useDispatch();
  useEffect(() => {


    setChat(props.user.chatlog);
    setLength(props.user.chatlog.length);
  }, [props]);
  var time;
  var hours;
  var minutes;
  function currentTime() {
  var currentDate = new Date();
  hours = currentDate.getHours();
  hours = hours % 12 || 12;
  hours = appendZero(hours);

  // hours = appendZero(currentDate.getHours());
  minutes = appendZero(currentDate.getMinutes());
  var seconds = appendZero(currentDate.getSeconds());
  const am = "AM";
  const pm = "PM";
   const timeZone = hours <= 12 ? am : pm;

  time = `${hours}:${minutes}:${seconds} ${timeZone}`;

  }

  function appendZero(time) {
  if (time < 10 && time.length != 2) {
    return "0" + time;
  }
  return time;
}


setInterval(currentTime, 1000);



  let updateMesssages = (message) => {
    let object = {
      text: message,
      timestamp: time,
      sender: "me",
      message_id: length + 1,
    };
    dispatch(addNewMessage(object, props.user.id));
    // updatelength
    setLength(object.message_id);

    setChat([...chat, object]);
  };

  return (
    <>
      <div className="message-box">
        <div className="message-box-header" xs={6} sm={7} md={8} lg={7} xl={8}>
          <ProfileHeader user={props.user} />
        </div>
        {chat.length === 0 && (
          <p className="no-message-alert">NO MESSAGES FOUND</p>
        )}
        {chat.length > 0 && (
          <div className="messages-section">
            {chat.map((m, index) =>
              m.sender === "me" ? (
                <RightChatBubble
                  message={m}
                  key={index}
                  name={"Yuvraj Sinha"}
                  image={"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhWd_oxHpEHs_rnameJpWraWgCG7kirptWPId5rcYhgv01ejHU3DjrwdZpK0ZyoSPyXGnqX7WtPY9bvXetfVLJgrP11gugn-NbhYL6_bfUVqBfQ_Fu4OK-p-Vp4oHllutDkS3GLk9Rg1bepiglVabahb4MrFAR2mhJjD7gCqCs3lRc4M4v2XI9S75wKbRA/s1005/HD-wallpaper-arjith-singh-bollywood-singer.jpg"}
                />
              ) : (
                <LeftChatBubble
                  message={m}
                  key={index}
                  name={props.user.name}
                  image={props.user.image}
                />
              )
            )}
          </div>
        )}

        <MessageInput newMessageHandler={updateMesssages} user={props.user} />
      </div>
    </>
  );
}

export default MessageBox;