//COMPONENTE APP
import { useEffect, useMemo, useReducer } from "react"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList";
import CaloriesTracker from "./components/CaloriesTracker";

function App() {
  //State
  const [ state, dispatch ] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities])

  const canRestarApp = useMemo(() => state.activities.length > 0, [state.activities]);

  //---VIEW---//
  return (
    <>
      <header className="py-3 bg-lime-700">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-2 md:flex-row md:justify-between md:gap-0">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>

          <button disabled={!canRestarApp}
          className="p-2 font-bold uppercase text-sm text-white rounded-lg cursor-pointer bg-gray-800 
          hover:bg-gray-900 disabled:opacity-20 disabled:cursor-default"
          onClick={ () => dispatch({type: 'restar-app'}) }
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="py-20 px-5 bg-lime-500 ">
        <div className="max-w-4xl mx-auto">
          <Form state={state} dispatch={dispatch} />
        </div>
      </section>

      <section className="py-10 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <CaloriesTracker activities={state.activities} />
        </div>
      </section>

      <section className="max-w-4xl p-10 mx-auto">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  )
}

export default App
