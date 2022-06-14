// import {createStore, combineReducers, applyMiddleware, compose } from "redux"
// import post from "./modules/post"
// import user from './modules/user'
// import comment from './modules/comment'
// import thunk from 'redux-thunk'

// const middlewares = [thunk];
// const rootReducer = combineReducers({post,user,comment});
// const enhancer = applyMiddleware(...middlewares)
// const store = createStore(rootReducer, enhancer)

// export default store;

// 리덕스 툴킷!!
import {configureStore} from '@reduxjs/toolkit'
import contentReducer from './modules/contentSlice'
import userReducer from './modules/userSlice'
import heartReducer from './modules/heartSlice'

const store = configureStore({reducer: {
    content: contentReducer, user:userReducer, heart:heartReducer
}})

export default store