
const Reducer = (state=0, action) =>{

    switch(action.type){

    case 'ProfileImage_preview':

        return {
            ...state,data:action.payload 
        }
    
        break;

case 'Profile_data' :
    
return{
    ...state,data:action.payload
}
    default:
        return state;

}

}

export default Reducer;