import { config } from "../../config";

export default class RoomService{
 public async getRooms(){
    return await fetch(config.apiUrl+'/api/rooms').then(response => response.json());
 }
}