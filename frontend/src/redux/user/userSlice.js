import { createSlice } from '@reduxjs/toolkit'
import { refresh } from 'aos'
import { signOut } from 'firebase/auth'
import { Satellite } from 'lucide-react'
import { act } from 'react'

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
      state.error = null
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false
      state.error = null
    },
    signInFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
      refreshError: (state) => {
      state.loading = false ,
      state.error = null
    },
    updateStart: (state) => {
      state.loading = true
      state.error = null
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    updateFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    deleteStart(state) {
      state.loading = true
      state.error = null
    },
    deleteSuccess(state) {
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    deleteFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },

    signOutSuccess(state){
      state.currentUser=null
      state.error=null
      state.loading=false
    },

    deletePostFailure(state,action){
      state.loading=false
      state.error=action.payload
    },

    deletePostStart(state){
      state.loading=true
      state.error=null
    },

    deletePostSuccess(state){
      state.loading=false
      state.error=null
    }

  },
})

// Action creators are generated for each case reducer function
export const { signInFailure,
  signInStart,
  signInSuccess,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteFailure,
  deleteSuccess,
  signOutSuccess, 
  deletePostFailure,
  deletePostStart,
  deletePostSuccess,
  refreshError

} = userSlice.actions

export default userSlice.reducer