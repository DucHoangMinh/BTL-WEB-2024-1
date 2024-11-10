import {userInforStore} from "~/stores/userInfor.js";
const userInforStoreRef = userInforStore()

export const checkUserLoggined = () => {
    return userInforStoreRef.getUserInfor != null && userInforStoreRef.getUserInfor.token !== ""
}