import React from "react";
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Die from "./components/Die";

export default function App() {

  // Initialize a state called diceState. The initial value will be the returned array of allNewDice()
  const [dieState, setDieState] = React.useState(allNewDice());
  console.log("dieState > ", dieState);

  //
  const [tenziesState, setTenziesState] = React.useState(false);

  React.useEffect(() => {
    // returns true if all the isHeld property is true
    const isAllHeld = dieState.every(dieObject => dieObject.isHeld)

      // returns true if all value is same as the value at index 0. 
      // (die, _, array): The callback function takes three arguments: the current element(die), its index(which is ignored using the _ placeholder), and the array itself(array).
    const isAllSameValue = dieState.every((dieObject, _, dieStateArray) => {
      return dieObject.value === dieStateArray[0].value;
    })

    // updates tenziesState to true if "isAllHeld && isAllSameValue" are true
    if (isAllHeld && isAllSameValue) {
      setTenziesState(prevTenziesState => !prevTenziesState);
      console.log("you won");
    } else {
      setTenziesState(prevTenziesState => prevTenziesState);

    }
  }, [dieState])

  // Helper function. Generates a dieObject
  function generateDieObject() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  // Generates an array(dieArray) of 10 dieObject
  function allNewDice() {

    const dieArray = [];

    for (let i = 0; i < 10; i++) {
      dieArray.push(generateDieObject())
    }

    return dieArray;
  }

  //Re-set the un-held dieObject in dieState to new ones 
  function handleRollDice() {

    if (!tenziesState) {
      setDieState(prevDieState => prevDieState.map((prevDieObject) => {
        return prevDieObject.isHeld ?
          prevDieObject : generateDieObject()
      }))
    } else {
      setTenziesState(!tenziesState)
      setDieState(allNewDice())
    }
  }

  // Updates isHeld property when Dice component is clicked
  function holdDice(id) {
    setDieState(prevDieState => prevDieState.map((prevDieObject) => {
      return prevDieObject.id === id ?
        { ...prevDieObject, isHeld: !prevDieObject.isHeld } :
        prevDieObject
    }))
  }
  console.log("new dieState > ", dieState);
  // ---Option #2---
  // function holdDice(id) {
  //   setDieState(prevDieState => {
  //     return prevDieState.map((prevDieObject) => {
  //     if (prevDieObject.id === id) {
  //       return { ...prevDieObject, isHeld: !prevDieObject.isHeld };
  //     }
  //     else {
  //       return prevDieObject;
  //     }
  //   })})
  // }


  // returns an array of <Die value={randomNumber} /> components
  const dieComponents = dieState.map((dieObject) => {
    return <Die
      key={dieObject.id}
      id={dieObject.id}
      value={dieObject.value}
      isHeld={dieObject.isHeld}
      holdDice={holdDice} // OR: holdDice={() => holdDice(dieObject.id)}
    />
  })

  // updates rollDiceButtonText text based on the truty value of tenziesState 
  const rollDiceButtonText = tenziesState ? "New Game" : "Roll Dice";

  // updates confettiElement to render to render <Confetti /> if tenziesState is true
  const confettiElement = tenziesState && <Confetti /> 

  return (
    <main className="main">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {dieComponents}
      </div>
      <button className="roll-dice" onClick={handleRollDice}>{rollDiceButtonText}</button>
      {confettiElement}
    </main>
  )
}