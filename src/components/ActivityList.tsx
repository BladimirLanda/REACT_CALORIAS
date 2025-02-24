//COMPONENT ACTIVITY-LIST
import { useMemo, Dispatch } from "react"
import { ActivityActions } from '../reducers/activity-reducer'
import { categories } from "../data/data"
import type { Activity } from "../types/types"
//heroicons: Libreria Tailwind-Iconos [npm i @heroicons/react]
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'

//Type
type ActivityListPropt = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

function ActivityList( { activities, dispatch } : ActivityListPropt ) {
    //State
    const categoryName = useMemo(() => {
        return (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '');
    }, [activities]);

    const isEmptyActivities = useMemo(() => activities.length === 0 , [activities]);

    //---VIEW---//
    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">
                Comida y Actividades
            </h2>

            {isEmptyActivities ? (
                <p className="mt-4 text-center">No hay Actividades...</p>
            ) :
            activities.map(activity => (
                <div key={activity.id} className="px-5 py-10 mt-5 bg-white shadow flex justify-between">
                    <div className="space-y-2 relative">
                        <p className={`px-10 py-2 text-white uppercase font-bold absolute -top-8 -left-8 
                            ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                            { categoryName(activity.category) }
                        </p>
                        <p className="pt-5 text-2xl font-bold">
                            {activity.name}
                        </p>
                        <p className="font-black text-4xl text-lime-500">
                            {activity.calories} {''}
                            <span>Calorias</span>
                        </p>
                    </div>

                    <div className="flex gap-5 items-center">
                        <button onClick={ () => dispatch( {type: "set-activeId", payload: {id: activity.id}} ) }>
                            <PencilSquareIcon className="w-8 h-8 text-gray-800" />
                        </button>

                        <button onClick={ () => dispatch( {type: "delete-activity", payload: {id: activity.id}} ) }>
                            <XCircleIcon className="w-8 h-8 text-red-600" />
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ActivityList;