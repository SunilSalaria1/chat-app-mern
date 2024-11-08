import { config } from "../../config";

export default class MessageService{
    public async postMessage(payload:{message:string,room?:string | null,contactName?:string|null,sender:string,isContentEntity:boolean}){
        return await fetch(config.apiUrl+'/api/message',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
        }).then(response => response.json());
     }

     public async getMessageByRoomId(roomId:string,isContentEntity:boolean = false):Promise<any>{
        return await fetch(config.apiUrl+'/api/message/'+roomId+''+(isContentEntity ? '?isContentEntity=true':'')).then(response => response.json());
     }
}