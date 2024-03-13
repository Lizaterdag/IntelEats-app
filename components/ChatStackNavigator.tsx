import { createStackNavigator } from '@react-navigation/stack';
import ChatPage from './ChatBotPage';

const ChatStack = createStackNavigator();

function ChatStackNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen 
        name="Chat" 
        component={ChatPage} 
        options={{ headerShown: false }} // Hides the header
      />
    </ChatStack.Navigator>
  );
}

export default ChatStackNavigator;
