export interface DataState{
    name?: String;
    lastname?: String;
    email?: String;
    orders?: any
}

type ActionsProps = {type:"LOGIN",payload: any} | {type:"LOGOUT"}

export const DataReducer = (state:any, actions:any)=> {
    switch(actions.type){
        case "LOGIN":
            return {
                ...state,
                name: actions.payload.name,
                lastname: actions.payload.lastname,
                email: actions.payload.email,
                orders: actions.payload.orders
            }
        case "LOGOUT":
            return{
                ...state,
                name: null,
                lastname: null,
                email: null,
                orders: undefined
            }
        default:
            return state
    }
}