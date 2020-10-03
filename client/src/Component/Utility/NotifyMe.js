import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotifyMe = (response,msg) => {

    toast.configure();//this is important for running u can pass configurations or leave it empty;
switch(response){

    case 'success':  return toast.success(msg);
    break;

    case 'error' : return toast.error(msg);
    break;

    case 'info' : return toast.info(msg);
    break;

    case 'success' : return toast.success(msg);
    break;
}


   
}
