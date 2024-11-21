export interface DataState{
    name?: String;
    lastname?: String;
    email?: String;
    orders?: any
    card?: [];
}

type ActionsProps = {type:"GET",payload: any} | {type:"LOGOUT"}

export const DataReducer = (state:any, actions:any)=> {
    switch(actions.type){
        case "GET":
            return {
                ...state,
                name: actions.payload.name,
                lastname: actions.payload.lastname,
                email: actions.payload.email,
                orders: actions.payload.orders,
                card: actions.payload.card

            }
        case "LOGOUT":
            return{
                ...state,
                name: null,
                lastname: null,
                email: null,
                orders: undefined,
                card: undefined
            }
        default:
            return state
    }
}