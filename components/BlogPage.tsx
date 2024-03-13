import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from './CustomButton';
import { theme } from './theme';

// Example posts data
const posts = [
  {
    id: '1',
    user: 'Alex',
    timestamp: '2024-03-02T09:20:00.000Z',
    content: 'Loved my healthy avocado toast for breakfast!',
    imageUrl: 'https://www.eatingwell.com/thmb/CTSAuY2CRbo0Ivw4wbfIydhy7Qw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1807w-avocado-toast-recipe-8029771-2000-aefaa92c11e74e80b0bfc15788a61465.jpg',
  },
  {
    id: '2',
    user: 'Sam',
    timestamp: '2024-03-02T12:45:00.000Z',
    content: 'Just tried a new protein shake recipe, and it was delicious!',
    imageUrl: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/65b07d07-f394-4759-98e6-f9ca32dc2e80/Derivates/67394c62-fa3b-4271-9c36-6e107752e584.jpg',
  },
  {
    id: '3',
    user: 'Morgan',
    timestamp: '2024-03-02T14:30:00.000Z',
    content: 'I’ve been consistent with my diet for a month now, feeling proud and energized!',
    imageUrl: 'https://www.shutterstock.com/image-photo/diet-woman-measuring-body-weight-600nw-543917185.jpg',
  },
  {
    id: '4',
    user: 'Casey',
    timestamp: '2024-03-02T16:00:00.000Z',
    content: 'Who knew that vegan desserts could taste so good? Just made some banana ice cream!',
    imageUrl: 'https://media.istockphoto.com/id/1188234798/photo/healthy-dessert-homemade-oatmeal-cookies-with-dates-and-nuts-do-not-contain-sugar-butter-and.jpg?s=612x612&w=0&k=20&c=6iyfRCkZ8iOhclgC-dYETfmgcTlp40sQbz40vRFJHnA=',
  },
  {
    id: '5',
    user: 'Jordan',
    timestamp: '2024-03-02T17:15:00.000Z',
    content: 'This week’s meal prep is done! Ready to take on the week with some nutritious meals.',
    imageUrl: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-07/26/11/asset/buzzfeed-prod-fastlane01/sub-buzz-2729-1469546047-8.png',
  },
  {
    id: '6',
    user: 'Taylor',
    timestamp: '2024-03-02T19:45:00.000Z',
    content: 'Surpassed my personal best at the gym today. Hard work pays off!',
    imageUrl: 'https://media.istockphoto.com/id/1132006407/photo/empty-gym.jpg?s=612x612&w=0&k=20&c=si73-OzIvdfuD7J82-WGJogpxgulXHVxmzldCjopuno=',
  },
  // More posts...
];

const sortedPosts = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

// Post component
const Post = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.user}>{post.user}</Text>
      <Text style={styles.timestamp}>{new Date(post.timestamp).toLocaleString()}</Text>
      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
      <Text style={styles.content}>{post.content}</Text>
    </View>
  );
};

// Blog page component
const BlogPage = () => {
  return (
    <LinearGradient
      colors={['#ffcf87', '#485beb']}
      style={{flex: 1}}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.postContainer}>
          <View style={styles.postAdd}>
            <TextInput
              style={styles.input}
              placeholder="Type your message here..."
            />  
            <CustomButton
              title="Add Image"
              onPress={() => null}
            />
          </View>
          <CustomButton
            title="Post"
            onPress={() => null}
          />
        </View>
        {sortedPosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </ScrollView>
    </LinearGradient>
    
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    // backgroundColor: '#f7f7f7',
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 60, // Adjust this value based on the height of your bottom navbar
    // You can also add other styling here that you want to apply to the content of the ScrollView
    // alignItems: 'center',
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
  },
  user: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  postAdd: {
    flexDirection: 'row',
  },
  content: {
    fontSize: 14,
    color: '#333',
  },
  input: {
    flex: 1,
    borderColor: theme.colors.secondary, // Purple border for the input
    borderWidth: 2,
    marginRight: 10,
    marginBottom: 0,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFFFFF', // White background for the input for readability
    color: theme.colors.secondaryText, // Black text for contrast
  },
});

export default BlogPage;