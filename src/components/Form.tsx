//COMPONENTE FORM
import { useState, useEffect, ChangeEvent, FormEvent, Dispatch } from 'react'
import { ActivityState, ActivityActions } from '../reducers/activity-reducer'
import { categories } from "../data/data"
import type { Activity } from "../types/types"
//uuid (Universally Unique Identifier): Libreria de generación de Id's únicos [npm i uuid]
import { v4 as uuidv4 } from 'uuid' 

//Type
type FormProps = {
    state: ActivityState,
    //--TS Dispatch
    dispatch: Dispatch<ActivityActions>
}

function Form( { state, dispatch } : FormProps ) {
    //Variables
    const initialState: Activity = {
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0
    }

    //State
    const [ activity, setActivity ] = useState<Activity>(initialState);

    useEffect(() => {
        if(state.activeId) {
            const selectActivity = state.activities.filter(act => act.id === state.activeId)[0];
            setActivity(selectActivity);
        }
    }, [state.activeId]);

    //Eventos
    //--TS Events
    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const campo = e.target.id;
        const valor = e.target.value;

        const isNumberField = ["category", "calories"].includes(e.target.id);

        setActivity({
            ...activity, 
            [campo]: isNumberField ? +valor : valor
        });
    }

    //--
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch( {type: "save-activity", payload: {newActivity: activity}} );
        
        setActivity({
            ...initialState,
            id: uuidv4()
        });
    }

    //Funciones
    const isValidActivity = () => {
        const { name, calories } = activity;

        return name.trim() !== '' && calories > 0;
    }

    //---VIEW---//
    return (
        <form className="p-10 space-y-5 bg-white shadow rounded-lg"
        onSubmit={ handleSubmit }>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category">Categoria:</label>
                <select 
                id="category" 
                className="w-full p-2 border boder-slate-300 rounded-lg bg-white"
                value={activity.category}
                onChange={ handleChange }>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name">Actividad:</label>
                <input 
                id="name"
                type="text"
                placeholder={activity.category === 1 ? 'Ensalada, Tacos...' : 'Pesas, Natación...'}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                value={activity.name}
                onChange={ handleChange }
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories">Calorias:</label>
                <input 
                id="calories"
                type="number"
                min = "0"
                placeholder="Calorias Ej. 300, 500"
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                value={activity.calories}
                onChange={ handleChange }
                />
            </div>

            <input 
            type="submit" 
            value={`Guardar ${activity.category === 1 ? 'Comida' : 'Ejercicio'}`}
            className="w-full p-2 font-bold uppercase text-white cursor-pointer bg-gray-800 
            hover:bg-gray-900 disabled:opacity-10 disabled:cursor-default"
            disabled={ !isValidActivity() }
            />
        </form>
    )
}

export default Form;