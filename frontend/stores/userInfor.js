import { defineStore } from "pinia";
export const userInforStore = defineStore('userInfor', {
    state: () => ({
        userInfor: {
            id: 0,
            fullName: "",
            email: "",
            token: ""
        }
    }),
    getters: {
        getUserInfor(){
            return this.userInfor
        }
    },
    actions: {
        setUserInfor(userInfor){
            this.userInfor = userInfor
        }
    }
});