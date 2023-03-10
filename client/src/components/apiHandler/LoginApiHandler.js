import Axios from 'axios';
import {Component} from 'react';

class LoginApiHandler extends Component {
    //Login consultant
    async loginConsultant(consultant){
        try {
            var response = await Axios.post('http://localhost:3001/login/consultant', consultant)
            return response
        } catch (error){
            return error.response
        } 
    }
    
}
export default new LoginApiHandler();