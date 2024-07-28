import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const addBlog = createAsyncThunk('blogs/addBlog', async ({ title, content, token }, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5000/api/blog/add-blog', { title, content }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async (user, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5000/api/blog/get-blogs', {
      headers: { Authorization: `Bearer ${user}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const fetchBlog = createAsyncThunk('blogs/fetchBlog', async ({ id, token }, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/blog/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const editBlog = createAsyncThunk('blogs/editBlog', async ({ id, blogData, token }, thunkAPI) => {
  try {
    console.log("EDIT Blog: ", id);
    console.log("EDIT Blog blogData: ", blogData);
    console.log("EDIT Blog token: ", token);

    const response = await axios.post(`http://localhost:5000/api/blog/update/${id}`, blogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const lockBlog = createAsyncThunk('blogs/lockBlog', async ({ id, token }, thunkAPI) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/blog/lock/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const unlockBlog = createAsyncThunk('blogs/unlockBlog', async ({ id, token }, thunkAPI) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/blog/unlock/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Slice
const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    blog: null,
    status: 'idle',
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBlog.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.blogs.push(payload.data);
        state.successMessage = payload.message;
      })
      .addCase(addBlog.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.blogs = payload.data;
      })
      .addCase(fetchBlogs.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(fetchBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlog.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.blog = payload.data;
      })
      .addCase(fetchBlog.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(editBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editBlog.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        const index = state.blogs.findIndex(blog => blog._id === payload.data._id);
        if (index !== -1) {
          state.blogs[index] = payload.data;
        }
        state.successMessage = payload.message;
      })
      .addCase(editBlog.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(lockBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(lockBlog.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        const index = state.blogs.findIndex(blog => blog._id === payload.data._id);
        if (index !== -1) {
          state.blogs[index] = payload.data;
        }
        state.successMessage = payload.message;
      })
      .addCase(lockBlog.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(unlockBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(unlockBlog.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        const index = state.blogs.findIndex(blog => blog._id === payload.data._id);
        if (index !== -1) {
          state.blogs[index] = payload.data;
        }
        state.successMessage = payload.message;
      })
      .addCase(unlockBlog.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});

export const { clearMessages } = blogSlice.actions;

export default blogSlice.reducer;
