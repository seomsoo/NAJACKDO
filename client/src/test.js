let socket = new SockJS('/ws'); // WebSocket 엔드포인트 연결
let stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);

    // 특정 채팅방 구독
    stompClient.subscribe('/exchange/chat.exchange/room.665364b2-14a2-4ea0-8107-a81017fbab13', function(message) {
        console.log(JSON.parse(message.body)); // 메시지 수신
    });

    // 메시지 보내기
    stompClient.send("/pub/chat.message.665364b2-14a2-4ea0-8107-a81017fbab13", {}, JSON.stringify({
        senderId: 'user1',
        message: 'Hello everyone!'
    }));
});
