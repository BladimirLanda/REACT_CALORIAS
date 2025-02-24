//COMPONENT CALORIES-DISPLAY

//Type
type CaloriesDisplayProps = {
    calories: number,
    text: string
}

function CaloriesDisplay( { calories, text } : CaloriesDisplayProps ) {

    //---VIEW---/
    return (
        <>
            <p className="text-center text-white font-bold grid grid-cols-1 gap-3">
                <span className={`font-black text-6xl
                ${text === 'Diferencia' ? (calories > 0 ? 'text-red-500' : 'text-green-500') : ''}`}>
                    { calories }
                </span>
                {text}
            </p>
        </>
    )
}

export default CaloriesDisplay