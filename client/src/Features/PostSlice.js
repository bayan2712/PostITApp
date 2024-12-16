import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  comments: [],
  likes: [],
};

export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
  try {
    const response = await axios.post(`${ENV.SERVER_URL}/savePost', {
      postMsg: postData.postMsg,
      email: postData.email,
    });
    const post = response.data.post; 

    return post; 
  } catch (error) {
    console.log(error);
  }
});

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/getPosts`);
    return response.data.posts;
    
  } catch (error) {
    console.log(error);
  }
});

export const likePost = createAsyncThunk("posts/likePost", async (postData) => {
  try {
    
    const response = await axios.put(
      `http://localhost:3001/likePost/${postData.postId}`,
      {
        userId: postData.userId,
      }
    );
    const post = response.data.post;
    return post;
  } catch (error) {
    console.log(error);
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(savePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(savePost.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        state.posts.unshift(action.payload);
      })
      .addCase(savePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(likePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedPostIndex = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (updatedPostIndex !== -1) {
          state.posts[updatedPostIndex].likes = action.payload.likes;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
