import { async } from "@firebase/util";
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
//middlewares

export const loadContentDB = () => {
    return async function(dispatch){
        await axios.get('http://localhost:5001/content').then(response => {
        dispatch(loadContent(response.data))
      })
    }
}
export const createContentDB = (data) => {
    return async function(dispatch){
        await axios.post('http://localhost:5001/content',data).then(response => {
        console.log(response)    
        dispatch(createContent(response.data))
        })
    }
}
export const updateContentDB = (data) => {
    return async function(dispatch){
        console.log('수정하러왔어')
        console.log(data)
        await axios.put(`http://localhost:5001/content/${data.id}`,data).then(response => {
            dispatch(updateContent(response.data))
            // console.log(response)
        })
    }
}
export const deleteContentDB = () => {
    return async function(dispatch){
        
    }
}
export const addHeartDB = (content_id,user_id) => {
    return async function(dispatch){
        await axios.put(`http://localhost:5001/content/${content_id}`,
        {heart_count: [user_id]}).then(reponse => {
            console.log(reponse)
        })
        
        }
    }



const contentSlice = createSlice({
    name:'content',
    initialState : {
        content_list:[]
    },
    reducers: {
        loadContent: (state, action) => {
            state.content_list= action.payload
        },
        createContent:(state,action) =>{
            state.content_list.push(action.payload)
        },
        updateContent:(state,action) =>{
            const index = state.content_list.findIndex(v => v.id === action.payload.id)
            state.content_list[index]=action.payload
        },
        addHeart:(state,action) => {

        }
    }
})

export const {loadContent,createContent,updateContent,addHeart} = contentSlice.actions
export default contentSlice.reducer