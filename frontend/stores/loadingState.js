import { defineStore } from "pinia";
export const loadingStateStore = defineStore('loadingState', {
    state: () => ({
        loadingState: false
    }),
    getters: {
        getLoadingState(){
            return this.loadingState
        }
    },
    actions: {
        setLoadingState(loadingState){
            this.loadingState = loadingState
        }
    }
});