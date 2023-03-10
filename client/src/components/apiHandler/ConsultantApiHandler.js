import Axios from 'axios';
import {Component} from 'react';

class ConsultantApiHandler extends Component {
    //Login consultant
    async getProfile(){
        try {
            const config = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            var response = await Axios
            .get('http://localhost:3001/consultant/profile',
            config)
            return response
        } catch (error){
            return error.response
        } 
    }
    
}
export default new ConsultantApiHandler();