//COMPONENT CALORIES-TRACKER
import { useMemo } from "react";
import type { Activity } from "../types/types";
import CaloriesDisplay from "./CaloriesDisplay";

//Type
type CaloriesTrackerProps = {
    activities: Activity[]
}

function CaloriesTracker( { activities } : CaloriesTrackerProps ) {
    //State
    const caloriesConsumed = useMemo(() => {
        return activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0);
    }, [activities]);

    const caloriesBurned = useMemo(() => {
        return activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0);
    }, [activities]);

    const netCalories = useMemo(() => {
        return caloriesConsumed - caloriesBurned;
    }, [activities]);

    //---VIEW---//
    return (
        <>
            <h2 className="text-4xl text-center font-black text-white">
                Resumen de Calorias
            </h2>

            <div className="mt-10 flex flex-col items-center gap-5 md:flex-row md:justify-between">
                <CaloriesDisplay calories={caloriesConsumed} text="Consumidas" />

                <CaloriesDisplay calories={netCalories} text="Diferencia" />

                <CaloriesDisplay calories={caloriesBurned} text="Quemadas" />
            </div>
            
        </>
    )
}

export default CaloriesTracker;