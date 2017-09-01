import SlackApi from "../utils/SlackAPI";
import { compileTpl } from "../utils/RenderTemplate";

let slackApi = new SlackApi();

let $$ = str => document.querySelector(str);
let readTemplate = str => $$(`#${str}`).innerHTML;

class MainPage {
  constructor() {
    this.onClickSelectLocationBinded = this.onClickSelectLocationBinded.bind(
      this
    );
  }

  replaceMsg(text, count, name, img, placeMsg, messageUser) {
    text = text.replace(/<(http.+?)>/g, '<a href="$1" target="_blank">$1</a>');
    if (text.indexOf("&lt;map&gt;") == 0) {
      text = text.split("&lt;map&gt;");
      text = text.splice(1, 11).join(",");
      text = text.split(",");
      text.push(count);

      let div = `<div id="mapSend${count}" style="width: 100%; height: 200px"></div>`;
      let isMyMessage = localStorage.getItem("user") == messageUser;
      let tplName = isMyMessage ? "myMsg" : "opponentMsg";
      let tpl = readTemplate(tplName);

      let newMsgHtml = compileTpl(tpl, {
        name: name,
        img: img,
        text: div
      });
      let newMsgHtmlDiv = document.createElement("div");
      newMsgHtmlDiv.innerHTML = newMsgHtml;

      placeMsg.appendChild(newMsgHtmlDiv);

      this.sendCoords(text);
      text = undefined;
      placeMsg.scrollTop = placeMsg.scrollHeight;
    }
    return text;
  }

  drawMsg(text, messageUser, sendImg, placeMsg, name, img) {
    if (text == undefined) return;
    let isMyMessage = localStorage.getItem("user") == messageUser;
    let tplName = isMyMessage ? "myMsg" : "opponentMsg";
    let tpl = readTemplate(tplName);
    text = sendImg ? `<img src="${sendImg}">` : text;
    let newMsgHtml = compileTpl(tpl, {
      name: name,
      img: img,
      text: text
    });
    let newMsgHtmlDiv = document.createElement("div");
    newMsgHtmlDiv.innerHTML = newMsgHtml;

    placeMsg.appendChild(newMsgHtmlDiv);
  }

  printMessages(userInfo, message, placeMsg) {
    let name, img;
    let text = message.text;
    let sendImg =
      message.file && message.file.thumb_360
        ? message.file.thumb_360
        : undefined;
    let isMyMessage = localStorage.getItem("user") == message.user;
    let idUser = isMyMessage ? localStorage.getItem("user") : message.user;
    for (let i = 0; i < userInfo.members.length; i++) {
      if (userInfo.members[i].id == idUser) {
        name = userInfo.members[i].name;
        img = userInfo.members[i].profile.image_32;
      }
    }
    text = this.replaceMsg(text, message.ts, name, img, placeMsg, message.user);
    this.drawMsg(text, message.user, sendImg, placeMsg, name, img);
    let arr = [];
    arr.push(isMyMessage, name);
    return arr;
  }

  loadDirectMsg(choosingRoom) {
    let room = choosingRoom.join("");
    let token = localStorage.getItem("token");
    let placeMsg = $$(".workPlace");
    slackApi.readRoomMessages(room).then(data => {
      let leng = data.messages.length - 1;
      if (leng == -1) return;
      slackApi.userList(token).then(userInfo => {
        do {
          let message = data.messages[leng];
          let arr = this.printMessages(userInfo, message, placeMsg);
          if (!arr[0]) $$(".nameGroup").innerHTML = "@ " + arr[1];
          leng = leng - 1;
        } while (leng >= 0);
      });
      placeMsg.scrollTop = placeMsg.scrollHeight;
    });
  }

  readLocalToken() {
    let token = localStorage.getItem("token");
    if (token == "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("channel");
      localStorage.removeItem("user");
      location.hash = "";
    }
    return token;
  }

  check() {
    if (localStorage.getItem("token")) {
      localStorage.getItem("channel") ||
        localStorage.setItem("channel", "C0ESHJAKX");

      let token = this.readLocalToken();
      slackApi
        .checkTocken(token)
        .then(this.render())
        .then(this.handlers())
        .then(this.userInfo())
        .then(() => {
          let choosingRoom = localStorage.getItem("channel");
          choosingRoom = choosingRoom.split("");
          if (choosingRoom[0] == "D") {
            this.loadDirectMsg(choosingRoom);
          } else if (choosingRoom[0] == "C") {
            this.loadhistoryMessage();
          } else if (choosingRoom[0] == "U") {
            localStorage.setItem("channel", "C0ESHJAKX");
            this.loadhistoryMessage();
          }
        });
      this.loadUsers();
      this.channelList();
      this.wsMsg();
      this.exit();
      this.handlerMenuChatBtn();
      this.getYandexMap();
    } else {
      slackApi
        .oAuthAccess()
        .then(data => {
          localStorage.setItem("channel", "C0ESHJAKX");
          let token = data.access_token;
          localStorage.setItem("token", `${token}`);
          localStorage.setItem("user", `${data.user_id}`);
        })
        .then(() => this.render())
        .then(() => this.handlers())
        .then(() => this.userInfo())
        .then(() => this.loadhistoryMessage())
        .then(() => this.loadUsers())
        .then(() => this.channelList())
        .then(() => this.wsMsg())
        .then(() => this.exit())
        .then(() => this.handlerMenuChatBtn())
        .then(() => this.getYandexMap());
    }
  }

  render() {
    let place = $$("div.conteiner");
    place.innerHTML = document.getElementById("mainChat").innerHTML;
  }

  handlers() {
    $$(".sendMessage").addEventListener("keypress", e => {
      let key = e.which || e.keyCode;
      if (key === 13) {
        e.preventDefault();
        this.sendMessage();
      }
    });
  }

  sendMessage(coords) {
    let token = localStorage.getItem("token");
    let channel = localStorage.getItem("channel");
    let message = $$(".sendMessage").value;
    let user = localStorage.getItem("user");
    message =
      !coords && message
        ? message.replace(/\&/g, "%26").replace(/\?/g, "%20%3F")
        : `<map> ${coords}`;
    slackApi.chatPostMsg(token, channel, message, user);
  }

  userInfo() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    slackApi.userInfo(token, user).then(data => {
      $$(".userName").innerHTML = `<img src="${data.user.profile
        .image_32}"> ${data.user.name}`;
    });
  }

  loadhistoryMessage() {
    let token = localStorage.getItem("token");
    let channel = localStorage.getItem("channel");
    let placeMsg = $$(".workPlace");
    let img, name;
    slackApi.channelsHistory(token, channel).then(data => {
      slackApi.userList(token).then(userInfo => {
        let leng = data.messages.length - 1;
        placeMsg.innerHTML = " ";
        if (leng == -1) return;
        do {
          let message = data.messages[leng];
          this.printMessages(userInfo, message, placeMsg);
          leng = leng - 1;
        } while (leng >= 0);
        placeMsg.scrollTop = placeMsg.scrollHeight;
      });
    });
  }

  loadUsers() {
    let userId, userName, img;
    let divContacts = $$(".contacts");
    let token = localStorage.getItem("token");
    slackApi
      .userList(token)
      .then(data => {
        for (let i = 0; i < data.members.length; i++) {
          userId = data.members[i].id;
          userName = data.members[i].name;
          img = data.members[i].profile.image_32;
          let tpl = readTemplate("contacts");
          divContacts.innerHTML += compileTpl(tpl, {
            userId: userId,
            userName: userName,
            img: img
          });
        }
      })
      .then(() => this.heandlerMsgUsersClick(divContacts));
  }

  channelList() {
    let token = localStorage.getItem("token");
    let divChannels = $$(".channels");
    let nameGroup = $$(".nameGroup");
    slackApi
      .channelList(token)
      .then(data => {
        for (let i = 0; i < data.channels.length; i++) {
          if (data.channels[i].id == localStorage.getItem("channel")) {
            nameGroup.innerHTML = `# ${data.channels[i].name_normalized}`;
          }
          if (data.channels[i].is_archived != false) continue;
          let tpl = readTemplate("channelsList");
          divChannels.innerHTML += compileTpl(tpl, {
            channelId: data.channels[i].id,
            channelName: data.channels[i].name
          });
        }
      })
      .then(() => this.heandlerChannelsClick(divChannels));
  }

  renderNewChannel(typeMessage) {
    let divChannels = $$(".channels");
    let tpl = readTemplate("channelsList");
    divChannels.innerHTML += compileTpl(tpl, {
      channelId: typeMessage.channel.id,
      channelName: typeMessage.channel.name
    });
  }

  removeChannelDOM(typeMessage) {
    let channel = typeMessage.channel;
    $$(`.channel_${channel}`).remove();
  }

  renderMsg(message, token) {
    if (
      message.ts == "1501544614.596385" ||
      message.ts == "1501796123.395835"
    ) {
      return;
    }
    let placeMsg = $$(".workPlace");
    let sound = $$("#audio");
    let sendImg =
      message.file && message.file.thumb_360
        ? message.file.thumb_360
        : undefined;
    let userName = message.user;
    slackApi.userInfo(token, userName).then(data => {
      if (data.user == undefined) return;
      let name = data.user.name;
      let img = data.user.profile.image_32;
      let text = message.text;
      text = this.replaceMsg(text, message.ts, name, img, placeMsg, userName);
      this.drawMsg(text, userName, sendImg, placeMsg, name, img);
      let isMyMessage = localStorage.getItem("user") == userName;
      let tplName = isMyMessage ? "myMsg" : "opponentMsg";
      if (tplName === "opponentMsg") sound.play();
      placeMsg.scrollTop = placeMsg.scrollHeight;
    });
  }

  wsMsg() {
    let ur;
    let token = localStorage.getItem("token");
    slackApi.rtmConnect(token, ur).then(data => (ur = data.url)).then(() => {
      let ws = new WebSocket(`${ur}`);
      ws.onopen = function() {};
      ws.onmessage = this.onWsMessage.bind(this);
    });
  }

  onWsMessage(event) {
    let message;
    let token = localStorage.getItem("token");
    let typeMessage = JSON.parse(event.data);
    if (typeMessage.type === "channel_archive") {
      this.removeChannelDOM(typeMessage);
    } else if (typeMessage.type === "channel_created") {
      this.renderNewChannel(typeMessage);
    } else if (typeMessage.type === "message") {
      message = JSON.parse(event.data);
      if (localStorage.getItem("channel") !== message.channel) return;
      this.renderMsg(message, token);
    }
  }

  heandlerChannelsClick(divChannels) {
    let token = localStorage.getItem("token");
    divChannels.addEventListener("click", e => {
      let target = e.target;
      if (target.tagName == "I" && target.id == "addChannel") {
        this.addNewChannel();
      }
      if (target.tagName == "I" && target.id == "removeChannel") {
        this.removeChannel(token, target.className);
      }
      if (target.tagName == "SPAN" || target.tagName == "IMG") {
        this.joinChannel(token, target.className);
      }
    });
  }

  heandlerMsgUsersClick(divContacts) {
    let token = localStorage.getItem("token");
    let room;
    divContacts.addEventListener("click", e => {
      let target = e.target;
      if (target.tagName == "SPAN" || target.tagName == "IMG") {
        let className = target.className;
        className = className.split("user_")[1];
        let nameGroupTag = $$(".nameGroup");
        let channelName = className.split("userName_")[1];
        nameGroupTag.innerHTML = "@ " + channelName;
        slackApi.imList(token).then(data => {
          let userId = className.split("userName_")[0].slice(0, -1);
          for (let i = 0; i < data.ims.length; i++) {
            if (userId == data.ims[i].user) {
              room = data.ims[i].id;
              slackApi.imHistory(token, room).then(data => {
                localStorage.setItem("channel", room);
                let leng = data.messages.length - 1;
                let placeMsg = $$(".workPlace");
                let text, name, img;
                placeMsg.innerHTML = "";
                if (leng != -1) {
                  slackApi.userList(token).then(userInfo => {
                    do {
                      let message = data.messages[leng];
                      this.printMessages(userInfo, message, placeMsg);
                      leng = leng - 1;
                    } while (leng >= 0);
                    placeMsg.scrollTop = placeMsg.scrollHeight;
                  });
                }
              });
              break;
            }
          }
        });
      }
    });
  }

  addNewChannel() {
    let dialog = $$("#dialogForNewChannel");
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    } else dialog.showModal();
    dialog
      .querySelector("button:not([disabled])")
      .addEventListener("click", () => {
        dialog.close();
      });
    let acceptButton = dialog.querySelector(".accept");
    acceptButton.addEventListener("click", () => {
      let nameChannel = dialog.querySelector(".nameChannel");
      nameChannel = nameChannel.value;
      let token = localStorage.getItem("token");
      if (!nameChannel) return;
      slackApi.channelCreate(token, nameChannel).then(() => dialog.close());
    });
  }

  removeChannel(token, className) {
    className = className.split("channel_")[1];
    slackApi
      .channelArchive(token, className)
      .then(
        slackApi
          .channelLeave(token, className)
          .then(localStorage.setItem("channel", "C0ESHJAKX"))
          .then(this.loadhistoryMessage())
      );
  }

  joinChannel(token, className) {
    className = className.split("channel_")[1];
    localStorage.setItem(
      "channel",
      className.split("channelName_")[0].slice(0, -1)
    );
    let nameGroupTag = $$(".nameGroup");
    let channelName = className.split("channelName_")[1];
    nameGroupTag.innerHTML = "# " + channelName;
    slackApi.channelJoin(token, channelName);
    this.loadhistoryMessage();
  }

  exit() {
    $$(".exit").addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("channel");
      localStorage.removeItem("user");
      location.hash = "";
    });
  }

  getDialogForChat() {
    let dialogInfoChat = $$("#dialogForChat");
    if (!dialogInfoChat.showModal) {
      dialogPolyfill.registerDialog(dialogInfoChat);
    }
    return dialogInfoChat;
  }

  onClickSelectLocationBinded() {
    let dialogInfoChat = this.getDialogForChat();
    this.getLocation();
    dialogInfoChat.close();
  }

  handlerMenuChatBtn() {
    let btn = $$(".menuChat");
    let dialogInfoChat = this.getDialogForChat();
    btn.addEventListener("click", () => {
      dialogInfoChat.showModal();
      let location = dialogInfoChat.querySelector(".location");
      let senFile = dialogInfoChat.querySelector("#file-select");
      location.removeEventListener("click", this.onClickSelectLocationBinded);
      location.addEventListener("click", this.onClickSelectLocationBinded);
      senFile.addEventListener("click", () => {
        this.attachFile();
        dialogInfoChat.close();
      });
    });
    dialogInfoChat
      .querySelector("button:not([disabled])")
      .addEventListener("click", () => {
        dialogInfoChat.close();
      });
  }

  getDialogForSetMap() {
    let dialogForSetMap = $$("#dialogForSetMap");
    dialogForSetMap.close();
  }

  getLocation() {
    let dialogForSetMap = $$("#dialogForSetMap");
    if (!dialogForSetMap.showModal) {
      dialogPolyfill.registerDialog(dialogForSetMap);
    }
    dialogForSetMap.showModal();
    dialogForSetMap
      .querySelector("button:not([disabled])")
      .removeEventListener("click", this.getDialogForSetMap);
    dialogForSetMap
      .querySelector("button:not([disabled])")
      .addEventListener("click", this.getDialogForSetMap);
  }

  getYandexMap() {
    ymaps.ready(init.bind(this));

    function init() {
      let myMap;
      myMap = new ymaps.Map(
        "map",
        {
          center: [53.902236, 27.56184], // Minsk
          zoom: 11,
          controls: [
            "zoomControl",
            "searchControl",
            "typeSelector",
            "geolocationControl"
          ]
        },
        {
          balloonMaxWidth: 150,
          searchControlProvider: "yandex#search"
        }
      );
      $$("#map").addEventListener("click", ev => {
        if (!ev.target.matches(".sendCoords")) return;
        if (myMap.balloon && myMap.balloon.onSendCoordsClick) {
          myMap.balloon.onSendCoordsClick();
        }
      });
      myMap.events.add("click", e => {
        if (!myMap.balloon.isOpen()) {
          let coords = e.get("coords");
          myMap.balloon.open(coords, {
            contentHeader: "Event",
            contentBody:
              "<p>Data to send.</p><p>This coordinates: " +
              [coords[0].toPrecision(6), coords[1].toPrecision(6)].join(", ") +
              "</p>" +
              `<button class="sendCoords">Send this coordinates</button>`
          });
          myMap.balloon.onSendCoordsClick = () => this.sendMessage(coords);
        } else {
          myMap.balloon.close();
        }
      });
      myMap.events.add("contextmenu", function(e) {
        myMap.hint.open(e.get("coords"), "Someone right-clicked");
      });
      myMap.events.add("balloonopen", function(e) {
        myMap.hint.close();
      });
    }
  }

  sendCoords(coords) {
    let init = function() {
      let myMap, myPlacemark;
      myMap = new ymaps.Map(`mapSend${coords[2]}`, {
        center: [coords[0], coords[1]],
        zoom: 7,
        controls: []
      });

      myPlacemark = new ymaps.Placemark([coords[0], coords[1]], {
        balloonContent: "Я тут!"
      });

      myMap.geoObjects.add(myPlacemark);
    };
    ymaps.Map ? init() : ymaps.ready(init.bind(this));
  }

  onFileSelect(ev) {
    let token = localStorage.getItem("token");
    let channel = localStorage.getItem("channel");
    let file = ev.target.files[0];
    let formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("token", `${token}`);
    formData.append("channels", `${channel}`);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://slack.com/api/files.upload", true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        // File(s) uploaded.
      } else {
        alert("An error occurred!");
      }
    };
    xhr.send(formData);
  }

  attachFile() {
    let fileSelect = document.getElementById("file-select");
    fileSelect.removeEventListener("change", this.onFileSelect);
    fileSelect.addEventListener("change", this.onFileSelect);
  }
}
export default MainPage;
