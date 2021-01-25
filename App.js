// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import { DirectLine } from "botframework-directlinejs";

const directLine = new DirectLine({
  secret: "YOUR_SECRET_GOES_HERE"
});

const botMessageToGiftedMessage = botMessage => ({
  ...botMessage,
  _id: botMessage.id,
  createdAt: botMessage.timestamp,
  user: {
    _id: 2,
    name: "React Native",
    avatar:
      "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-business-man-399587fe24739d5a-512x512.png"
  }
});

function giftedMessageToBotMessage(message) {
  return {
    from: { id: 1, name: "John Doe" },
    type: "message",
    text: message.text
  };
}

export default function App() {
  const [chatMessages, setChatMessages] = React.useState([]);

  React.useEffect(() => {
    setChatMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
    directLine.activity$.subscribe(botMessage => {
      const newMessage = botMessageToGiftedMessage(botMessage);
      setChatMessages([newMessage, ...chatMessages]);
    });
  }, [])

  const onSend = React.useCallback((messages = []) => {
    setChatMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    messages.forEach(msg => {
      directLine
        .postActivity(giftedMessageToBotMessage(msg))
        .subscribe(() => console.log('success'), () => console.log('failed'));
    });
  }, [])

  return (
    <View style={styles.container}>
      <GiftedChat
        user={{
          _id: 1
        }}
        messages={chatMessages}
        onSend={messages => onSend(messages)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
