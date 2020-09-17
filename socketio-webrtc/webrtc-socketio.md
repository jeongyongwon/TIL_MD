# Web RTC 및 Socket io

---

> **참고한 github
>
> https://github.com/ehdrms2034/WebRtcTutorial
>
> 
>
> **Socket io란**
>
> - socket.io란 실시간으로 상호작용하는 웹 서비스를 만드는 기술인 웹소켓을 쉽게 사용할 수 있게 해주는 모듈
> - Socket.io는 node.js 기반으로 만들어진 기술로, 거의 모든 웹 브라우저와 모바일 장치를 지원하는 실시간 웹 애플리케이션
> - Socket.io는 자바스크립트를 이용하여 브라우저 종류에 상관없이 실시간 웹을 구현할 수 있도록 한 기술
>
> 
>
> 그렇다면 **Socket은 뭘까 ?**
>
> - 웹소켓(WebSochet)은 **서버와 클라이언트 간의 효율적인 양방향 통신**을 실현하기 위한 구조
> - 웹소켓을 이용하면 **하나의 HTTP 접속**으로 양방향 메시지를 자유롭게 주고받을 수 있습
> - 웹소켓은 별도의 포트를 사용하지 않고 HTTP와 같은 **80번 포트를 사용**하고 있는데, 이 때문에 클라이언트인 웹 브라우저뿐만 아니라 웹 서버도 기능을 지원하고 있어야만 합니다. 



> **WebRTC(Web Real-Time Communications)란**
>
> - P2P에 최적화
>
> - 웹 어플리케이션(모바일도 지원) 및 사이트들이 별도의 소프트웨어 없이 음성, 영상 미디어 혹은 텍스트, 파일 같은 데이터를 브라우져끼리 주고 받을 수 있게 만든 기술
>
> - Web RTC에 사용되는 기술은 여러가지가 있지만 크게 3가지의 클래스에 의해서 실시간 데이터 교환이 일어남
>
>   #### 1. MediaStream - 카메라/마이크 등 데이터 스트림 접근
>
>   #### 2. RTCPeerConnection - 암호화 및 대역폭 관리 및 오디오 또는 비디오 연결
>
>   ##### -  RTCPeerConnection들이 적절하게 데이터 교환을 할 수 있도록 하는것을 `Signaling`이라함
>
>   #### 3. RTCDataChannel - 일반적인 데이터 P2P통신
>
> - #### `peerConnection`은 두명의 유저가 스트림을 주고 받은 것이므로 연결을 요청한 `Caller` 와 연결을 받는 `Callee`가 존재함
>
>   => `Caller`와 `Callee`가 통신을 하기 위해서는  **중간 역할을 하는 서버가 필요**하고 서버를 통해서 `SessionDescription`을 서로 주고 받아야함

### 

## Web RTC의 method 및 용어(간략함)

### 1. stun Server, turn Server

- Web RTC는 P2P에 최적화 되어있음 => 즉, Peer들 간의 IP를 알아 데이터 교환을 해야하는데, 방화벽 등과 같은 보호장치 때문에 쉽지 않음 => 이를 위해 서로간의 연결을 위한 정보를 공유하여 가능케 해주는 것이 `stun Server`, `turn Server`이다

### 2. SDP (Session Description Protocol)

- 스트리밍 미디어의 초기화 인수를 기술하기 위한 포맷
- 실제로 WEB RTC는 SDP format 에 맞춰져 영상,음성 데이터를 교환

### 3. Ice(Interactive Connectivity Establishment)

- NAT환경에서 자신의 Public IP를 파악하고 상대방에게 데이터를 전송하기 위한 Peer간의 응답 프로토콜로 일반적으로 STUN/TURN을 이용해서 구축



## Web RTC를 이용하여 화상통화 구현하기(대략적임)

### rtc.html

```html
<html>
<head>
    <meta charset="utf-8" />
    <title>WebRtc tutorial</title>
</head>

<body>
    <div>
        <video id="localVideo" autoplay width="480px"></video>
        <video id="remoteVideo" width="480px" autoplay></video>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <!-- 시그널링을 위한 socketio cdn -->
    <script src="./rtc.js"></script>
</body>

</html>
```



### rtc.js

- #### Navigator 객체

  navigator 객체는 브라우저 공급자 및 버전 정보 등을 포함한 브라우저에 대한 다양한 정보를 저장하는 객체

```js
// 우선 캠화면을 id로 잡고
let localVideo = document.getElementById("localVideo");
let remoteVideo = document.getElementById("remoteVideo");
let localStream;
\
//사용자의 미디어 데이터를 스트림으로 받아옴
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: false,
  })
  .then(gotStream)
  .catch((error) => console.error(error));

//hoisting 처리가 되서 위에서 실행
function gotStream(stream) {
  console.log("Adding local stream");
  localStream = stream;
  localVideo.srcObject = stream;
    //다른 perr로의 데이터를 전송하는 method
  sendMessage("got user media");
  if (isInitiator) {
    maybeStart();
  }
}
```

- **RTC Peer 연결하기**

```js
function createPeerConnection() {
  try {
      //RTCPeerConnettion 객체 형성
    pc = new RTCPeerConnection(null);
      // iceCandidate는 데이터 교환을 할 대상의 EndPoint 정보
      // 따라서 iceCandidate를 할 대상이 생긴다면 handleIceCandidate 메서드 실행
      // 이 부분은 signaling 서버로 넘겨줘 상대방 peer가 내 stream으로 연결할 수 있도록함
    pc.onicecandidate = handleIceCandidate;
      // 연결된 Peer는 handleRemoteStreamAdded 메서드를 통해서 remoteVideo 뷰에 띄어도록함
    pc.onaddstream = handleRemoteStreamAdded;
    console.log("Created RTCPeerConnection");
  } catch (e) {
    alert("connot create RTCPeerConnection object");
    return;
  }
}

function handleIceCandidate(event) {
  console.log("iceCandidateEvent", event);
  if (event.candidate) {
    sendMessage({
      type: "candidate",
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate,
    });
  } else {
    console.log("end of candidates");
  }
}

function handleCreateOfferError(event) {
  console.log("createOffer() error: ", event);
}

function handleRemoteStreamAdded(event) {
  console.log("remote stream added");
  remoteStream = event.stream;
  remoteVideo.srcObject = remoteStream;
}
```

```js
//  자신의 RTCPeerConnection을 초기화하고 상대방의 RTCPeerConnection과 연결하는 함수
function maybeStart() {
  console.log(">>MaybeStart() : ", isStarted, localStream, isChannelReady);
  if (!isStarted && typeof localStream !== "undefined" && isChannelReady) {
    console.log(">>>>> creating peer connection");
    createPeerConnection();
    pc.addStream(localStream);
    isStarted = true;
    console.log("isInitiator : ", isInitiator);
    if (isInitiator) {
        // 실제로 연결이 됐다면 doCall함수를 실행시켜 데이터를 주고 받음
      doCall();
    }
  }else{
    console.error('maybeStart not Started!');
  }
}

// doCall과 doAnswer를 통해서 Description을 교환하고 이 과정을 통해서 내 화상 정보가 상대방에게, 상대방의 화상정보가 내 뷰에 출력할 수 있게 되는 것
function doCall() {
  console.log("Sending offer to peer");
  pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
}

function doAnswer() {
  console.log("Sending answer to peer");
  pc.createAnswer().then(
    setLocalAndSendMessage,
    onCreateSessionDescriptionError
  );
}

function setLocalAndSendMessage(sessionDescription) {
  pc.setLocalDescription(sessionDescription);
  sendMessage(sessionDescription);
}
```



### Socket 통신에 대한 부분 정의

```js
let pcConfig = {
    'iceServers': [{
        'urls': 'stun:stun.l.google.com:19302'
      }]
}

socket.on('message', (message)=>{
  console.log('Client received message :',message);
  if(message === 'got user media'){
    maybeStart();
  }else if(message.type === 'offer'){
    if(!isInitiator && !isStarted){
      maybeStart();
    }
    pc.setRemoteDescription(new RTCSessionDescription(message));
    doAnswer();
  }else if(message.type ==='answer' && isStarted){
    pc.setRemoteDescription(new RTCSessionDescription(message));
  }else if(message.type ==='candidate' &&isStarted){
    const candidate = new RTCIceCandidate({
      sdpMLineIndex : message.label,
      candidate:message.candidate
    });

    pc.addIceCandidate(candidate);
  }
})
```

