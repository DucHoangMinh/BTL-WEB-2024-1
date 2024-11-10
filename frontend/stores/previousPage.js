import { defineStore } from "pinia";
export const previousPageStore = defineStore('previousPage', {
    state: () => ({
        previousPage: ""
    }),
    getters: {
        getPreviousPage(){
            return this.previousPage
        }
    },
    actions: {
        setPreviousPage(previousPage){
            this.previousPage = previousPage
        }
    }
});