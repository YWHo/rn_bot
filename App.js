// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
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
    _id: botMessage.from.id,
    name: botMessage.from.name,
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

let count = 0;

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
    const activitySubscription = directLine.activity$.subscribe(botMessage => {
      setChatMessages(prevMessages => {
        const appendedMsg = GiftedChat.append(prevMessages, botMessageToGiftedMessage(botMessage));
        return appendedMsg;
      });
    });

    return () => {
      activitySubscription.unsubscribe();
    }
  }, []);

  const onSend = React.useCallback((messages = []) => {
    setChatMessages(prevMessages => GiftedChat.append(prevMessages, messages));
    messages.forEach(msg => {
      const msgToBot = giftedMessageToBotMessage(msg);
      directLine
        .postActivity(msgToBot)
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
