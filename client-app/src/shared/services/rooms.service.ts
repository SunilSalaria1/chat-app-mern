import { config } from "../../config";

export default class RoomService{
 public async getRooms(){
    return await fetch(config.apiUrl+'/api/room').then(response => response.json());
 }
}