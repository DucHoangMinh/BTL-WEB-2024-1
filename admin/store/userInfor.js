export const state = () => ({
    userInfor: null
})
export const mutations = {
    setUserInfor(state, userInfor) {
        state.userInfor = userInfor
    },
    remove(state) {
        state.userInfor = null
    }
}