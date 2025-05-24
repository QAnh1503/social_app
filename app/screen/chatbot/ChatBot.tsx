import { View, Text } from "react-native";
import React, { useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const YOUR_CHATGPT_API_KEY =
    "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";
  const handleSend = async (newMessages: IMessage[] = []) => {
    try {
      // Get the user message
      const userMessage = newMessages[0];

      // Add the user's message to the messages state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [userMessage])
      );
      const messageText = userMessage.text.toLowerCase();
      const keywords = [
        "food",
        "drink",
        "recipe",
        "yoga",
        "gym",
        "jogging",
        "medicine",
      ];

      console.log("messageText:", messageText);
      console.log("keywords:", keywords);
      console.log(
        "match found:",
        keywords.some((keyword) => messageText.includes(keyword))
      );

      // add more keyword as needed
      if (!keywords.some((keyword) => messageText.includes(keyword))) {
        // if message does not contain keyword
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "I'm your healthy Bot, ask me anything related to healthy",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Healthy Bot",
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [botMessage])
        );
        return;
      }

      // if message contain keyword
    //   const response= await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    //     const response= await axios.post('https://api.openai.com/v1/chat/completions', {
    
    
    //       prompt : `Get me a recipe for ${messageText}`,
    //       max_tokens: 1200,
    //       temperature : 0.2,
    //       n: 1,
    //   }, {
    //       headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${YOUR_CHATGPT_API_KEY}`
    //       }
    //   });
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: `Get me a recipe for ${messageText}` },
          ],
          max_tokens: 1200,
          temperature: 0.2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${YOUR_CHATGPT_API_KEY}`,
          },
        }
      );

      console.log(response.data);

      const recipe = response.data.choices[0].text.trim();
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: recipe,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Healthy Bot",
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [botMessage])
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#F5F5F5",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          marginBottom: 5,
        }}
      >
        <Text>Chat Bot</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
      />
    </View>
  );
};

export default ChatBot;

// import axios from 'axios';
// import React, { useState } from 'react';
// import { View, TextInput, Button, Text } from 'react-native';

// export default function ChatBot() {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');

//   const askGPT = async () => {
//     try {
//       const res = await axios.post(
//         'https://api.openai.com/v1/chat/completions',
//         {
//           model: 'gpt-3.5-turbo',
//           messages: [{ role: 'user', content: question }],
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: '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', // <-- Thay bằng API Key
//           },
//         }
//       );
//       setAnswer(res.data.choices[0].message.content.trim());
//     } catch (err) {
//       console.error(err);
//       setAnswer('Có lỗi xảy ra khi gọi API.');
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <TextInput
//         value={question}
//         onChangeText={setQuestion}
//         placeholder="Nhập câu hỏi..."
//         style={{ borderWidth: 1, marginBottom: 10 }}
//       />
//       <Button title="Gửi" onPress={askGPT} />
//       <Text style={{ marginTop: 20 }}>{answer}</Text>
//     </View>
//   );
// }

// import { View, Text } from 'react-native';
// import React, { useState } from 'react';
// import { GiftedChat, IMessage } from 'react-native-gifted-chat';
// import axios from 'axios';

// const ChatBot = () => {
//     const [messages, setMessages] = useState<IMessage[]>([]);
//     const YOUR_CHATGPT_API_KEY = "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"; // tránh chia sẻ public

//     const handleSend = async (newMessages: IMessage[] = []) => {
//         try {
//             const userMessage = newMessages[0];

//             // Add user message to UI
//             setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));

//             const messageText = userMessage.text.toLowerCase();

//             // Call ChatGPT API
//             const response = await axios.post(
//                 'https://api.openai.com/v1/chat/completions',
//                 {
//                     model: 'gpt-3.5-turbo',
//                     messages: [{ role: 'user', content: messageText }],
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${YOUR_CHATGPT_API_KEY}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             const botReply = response.data.choices[0].message.content;

//             const botMessage: IMessage = {
//                 _id: Math.random().toString(36).substring(7),
//                 text: botReply,
//                 createdAt: new Date(),
//                 user: {
//                     _id: 2,
//                     name: 'ChatGPT',
//                 },
//             };

//             setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
//         } catch (error) {
//             console.error("API error: ", error);
//         }
//     };

//     return (
//         <GiftedChat
//             messages={messages}
//             onSend={handleSend}
//             user={{ _id: 1 }}
//         />
//     );
// };

// export default ChatBot;
