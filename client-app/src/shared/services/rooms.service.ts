import { config } from "../../config";

export default class RoomService{
 public async getRoomsByUserId(id:string){
    return await fetch(config.apiUrl+'/api/users/'+id+'/rooms').then(response => response.json());
 }
}