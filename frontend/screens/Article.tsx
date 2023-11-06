import { useState, useEffect } from "react";
import { TextInput, ActivityIndicator, Button, ToggleButton, Text, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, ScrollView} from "react-native";
import openWebPage from "../functions/openWebPage";
import callApi from "../functions/callApi";


const Article = ({ route }) => {
    const {_id, link} = route.params
    const [isLoading, setIsLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [userEmail, setUserEmail] = useState("");
  
    const toggleLike = async () => {
      if (userEmail) {
        const reqObj = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        }

        try {
          const res = await callApi(`/digest/${_id}/toggle_like`, reqObj);
          setLiked(!liked);
        }

        catch (error) {
          console.log(error);
        }
      }

      else {
        console.log(`can't like if you're not logged in`)
      }
    };
  
    const submitComment = async () => {
      if (userEmail) {
        const reqObj = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail,
            text: comment
          }),
        }

        try {
          const data = await callApi(`/digest/${_id}/comment`, reqObj);
          setComment("");
          setIsLoading(true);
        }

        catch (error) {
          console.log(error);
        }
      }

      else {
        console.log(`can't comment if you're not logged in `)
      }
    };
  
    const setArticle = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      const comments = await callApi(`/digest/${_id}/comments`);
      const likes = await callApi(`/digest/${_id}/likes`);
      if (likes.includes(userEmail)) {
        setLiked(true);
      }
      
      setComments(comments);
      setUserEmail(email);
      setIsLoading(false);

    }

    useEffect(() => {
      if (isLoading) {
        setArticle()
      }
    }, [isLoading]);
    
  
    return (
      <View style={styles.container}>
        <Text style={styles.articleText} onPress={() => openWebPage(link)}>{link}</Text>
        <ToggleButton
        icon={liked ? 'heart' : 'heart-outline'}
        size={32}
        onPress={() => {
            toggleLike();
        }}
        />
  
        <TextInput
          label="Email"
          value={userEmail}
          onChangeText={(text) => setUserEmail(text)}
          style={styles.commentInput}>
        </TextInput>
        <TextInput
          label="Add a comment"
          value={comment}
          onChangeText={(text) => setComment(text)}
          style={styles.commentInput}
        />
        <Button mode="contained" onPress={submitComment} >
          Comment
        </Button>
  
        <ScrollView>
        <List.Section title="Comments">
            {comments.map((comment) => (
                <List.Item title={comment.email} description={comment.text}/>
            ))}
        </List.Section>
        </ScrollView>
      </View>
    );
  };

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 16,
},
articleText: {
    fontSize: 16,
    marginBottom: 16,
},
commentInput: {
    marginBottom: 16,
},
});


export default Article;