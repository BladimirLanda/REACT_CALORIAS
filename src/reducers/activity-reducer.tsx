//REDUCER ACTIVITY
import type { Activity } from "../types/types"

/*
useReducer
Es un Hook que se usa para manejar el state de manera más estructurada. 
Es útil cuando el state es complejo o requiere cambios condicionados o a la vez.
Permite gestionar un 'reducer' que se basa en un estado actual y una acción.
Estructura:
const [state, dispatch] = useReduce(reducer, initialState);
-state: Representa el estado actual 
-dispatch: Función que recibe el '{action}' y dispara el 'reducer(estado actual, acción)'
-reducer: Función que define como cambiar el estado (return) según la acción recibida
-'actions': Acciones que manejan la lógica de modificación del 'state' dentro del 'reducer'
    -'type': Tipo de acción
    -'payload': Registro de modificación del 'state'

Mientras que useState es util en el manejo de estados simples, useReducer es adecuado para
situaciones donde el nuevo estado dependa del estado anterior, cuando existen multiples
sub-valores o lógica condicional considerada.
*/

//Funciones
const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse(activities) : [];
}

//Types
//--Actions
export type ActivityActions = {
    type: 'save-activity',
    payload: {
        newActivity: Activity
    }
} | {
    type: 'set-activeId',
    payload: {
        id: Activity['id']
    }
} | {
    type: 'delete-activity',
    payload: {
        id: Activity['id']
    }
} | {
    type: 'restar-app'
}

//--State
export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

//Estado Inicial
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

//Reducer
export const activityReducer = (state: ActivityState = initialState, action: ActivityActions) => {
    if(action.type === 'save-activity') {
        let updatedActivities: Activity[] = [];

        if(state.activeId) {
            updatedActivities = state.activities.map( activity => activity.id === state.activeId 
                ? action.payload.newActivity : activity);
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity];
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if(action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity') {
        const updatedActivities = state.activities.filter(activity => activity.id !== action.payload.id);

        return {
            ...state,
            activities: updatedActivities
        }
    }

    if(action.type === 'restar-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state;
}