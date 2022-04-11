//18h13 11/4/2022
import {useReducer, useRef} from 'react';

//init state
const initState = {
  list: '',
  lists: []
}

// action
const SET_LIST = 'set_list'
const ADD_LIST = 'add_list'
const REMOVE_LIST = 'remove_list'

const setList = payload =>{
  return{
    type: SET_LIST,
    payload
  } 
}
const addList = payload =>{
  return {
    type: ADD_LIST,
    payload
  }
}
const removeList = payload =>{
  return {
    type: REMOVE_LIST,
    payload
  }
}

// reducer
const reducer = (state, action) =>{
  let newState 
  switch (action.type){
    case SET_LIST:
      newState = {
        ...state,
        list: action.payload
      }
      break;
    case ADD_LIST:
      newState = {
        ...state,
        lists: [...state.lists, action.payload]
      }
      break;
    case REMOVE_LIST:
      const currentList = [...state.lists]
      currentList.splice(action.payload, 1)
      newState = {
        ...state,
        lists: [...currentList]
      }
      break;
  }
  return newState

}


function App() {
  const [state, dispatch] = useReducer(reducer, initState)
  const {list, lists} = state
  const inputRef = useRef()
  const handleAdd = () =>{
    dispatch(addList(list))
    dispatch(setList(''))
    inputRef.current.focus()
  }

  return (
    <div className="App" style={{padding: 30}}>
      <h3>To Do App</h3>
      <input 
        value={list}
        placeholder='Enter list....'
        onChange={e =>{ dispatch( setList(e.target.value) ) }}
        ref={inputRef}
      />
      <button onClick={handleAdd}>ADD</button>
      <ul>{lists.map((list, index) =>(
        <li key={index}>{list}
          <span class="remove__list-btn"onClick={() =>dispatch(removeList(index))}>&times;</span>
        </li>
      ))}</ul>      
    </div>
  );
}

export default App;


