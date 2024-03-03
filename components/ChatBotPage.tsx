import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, View, TextInput, Button, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from './theme'; // Import your theme object

const ChatBotPage = () => {
    
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ content: "Hi, I'm your personal nutritionist. How can I help you?", isUser: false }]);
  const [threadId, setThreadId] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    startThread();
  }, []);

  useEffect(() => {
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages]);

  const startThread = async () => {
    setIsWaiting(true);
    try {
      const response = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`, // Use your actual OpenAI API key
          'OpenAI-Beta': 'assistants=v1',
        },
      });
      const data = await response.json();
  
      // Log the response data to debug
      console.log(data);
  
      // Check if the response includes the id field directly
      if (data && data.id) {
        setThreadId(data.id);
      } else {
        // If the id field is not found, log an error or handle accordingly
        console.error('Thread ID not found in response:', data);
      }
    } catch (error) {
      console.error('Error starting thread:', error);
    } finally {
      setIsWaiting(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !threadId) return;
    setIsWaiting(true);
    addMessage(input, true); // Display user message
    setInput("");

    // Add a typing indicator as a message
    addMessage("Assistant is typing...", false, true); // 'true' could indicate this is a temporary message
  
    try {
      // Send a message to the thread
      await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`, // Ensure secure handling
          'OpenAI-Beta': 'assistants=v1',
        },
        body: JSON.stringify({
          role: "user",
          content: input,
        }),
      });
  
      // Initiate a run
      const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`, // Ensure secure handling
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v1',
        },
        body: JSON.stringify({
          assistant_id: "asst_20guHEzZ0W82Ce8yz9zz9Wvt", // Use the correct assistant ID
        }),
      });
      const runData = await runResponse.json();
      const runId = runData.id;

      const maxPollAttempts = 10;
      let currentPollAttempt = 0;
  
      // Function to poll for the Run's status
      const pollRunStatus = async () => {
        if (currentPollAttempt >= maxPollAttempts) {
            console.error('Max polling attempts reached.');
            setIsWaiting(false);
            return;
          }

        currentPollAttempt++;

        const statusResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
          headers: {
            'Authorization': `Bearer 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`,
            'OpenAI-Beta': 'assistants=v1',
          },
        });
        const statusData = await statusResponse.json();

        if (statusData.status === "completed" || statusData.status === "failed") {
          // Fetch the assistant's response if the run is completed or failed
          const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
            headers: {
              'Authorization': `Bearer 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`,
              'OpenAI-Beta': 'assistants=v1',
            },
          });
            const messagesData = await messagesResponse.json();

            // Assuming each message's content is an array where the first item is of type "text"
            const assistantMessage = messagesData.data.find(m => m.role === "assistant" && m.run_id === runId);
            if (assistantMessage && assistantMessage.content.length > 0 && assistantMessage.content[0].type === "text") {
                setMessages(prevMessages => prevMessages.filter(message => !message.isTemporary));
                addMessage(assistantMessage.content[0].text.value, false); // Display assistant response
            } else {
            console.log("No valid assistant message found or message format is unexpected", assistantMessage);
            }
            setIsWaiting(false);
        } else {
            // Poll again after a short delay if the run has not completed
            setTimeout(pollRunStatus, 2000);
        }
      };
      setInput("");
      // Start polling for the run's status
      pollRunStatus();
    } catch (error) {
      console.error('Error:', error);
      setIsWaiting(false);
    }
  };

  const addMessage = (content, isUser, isTemporary = false) => {
    setMessages(prevMessages => [
        ...prevMessages, 
        { content, isUser, isTemporary }
      ]);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust the offset on iOS
    >
      <ScrollView ref={scrollViewRef} style={styles.messagesContainer} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }} >
        {messages.map((message, index) => (
            <View key={index} style={[styles.message, message.isUser ? styles.userMessage : styles.botMessage]}>
                {message.isTemporary ? (
                <Text style={styles.typingIndicator}>Assistant is typing...</Text>
                ) : (
                <Text style={styles.messageText}>{message.content}</Text>
                )}
            </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setInput}
          value={input}
          placeholder="Type your message here..."
          editable={!isWaiting}
        />
        <Button
          onPress={sendMessage}
          title={isWaiting ? "Waiting..." : "Send"}
          color="#007bff"
          disabled={isWaiting || !input.trim()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffff', // Use the lighter background color
  },
  messagesContainer: {
    flex: 1,
  },
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d4ffc2' // Use the primary purple for user messages
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#c2d5ff', // A lighter shade for contrast with bot messages
    marginVertical: 5,
    marginRight: 'auto', // Ensure it sticks to the left
    padding: 10,
    borderRadius: 20, // Rounded corners for bubble effect
    maxWidth: '80%', // Ensure long messages don't stretch too far
  },
  messageText: {
    color: theme.colors.secondaryText,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: theme.colors.primary, // Purple border for the input
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFFFFF', // White background for the input for readability
    color: theme.colors.secondaryText, // Black text for contrast
  },
  loadingContainer: {
    position: 'absolute', // Position over the chat or in a fixed area
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)', // Light overlay
  },
  typingIndicator: {
    fontStyle: 'italic',
    color: theme.colors.primary, // Purple text for the typing indicator
    // Add any additional styling you prefer for the typing indicator
  },
});

export default ChatBotPage;
