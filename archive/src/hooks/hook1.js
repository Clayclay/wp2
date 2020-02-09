// will contain all three ways to update state with React hooks, useState, useReducer and useContext.
// Having all three ways to update the state in one component will make it easier for you 
//to pick apart the differences between each.

import React, { useContext, useState, useEffect, useReducer } from 'react';
 

import * as ACTIONS from '../Store/actions/actions'

//importing all our actions and reducers.

import * as Reducer1 from '../Store/reducers/plain_reducer';
import Context from '../utils/context';

// boilerplate to have all the ways to read and update state in one component

const HooksContainer1 = () => {
  const context = useContext(Context)

  const [value, setValue] = useState(0)

  const [useEffectValue, setUseEffectValue] = useState(null)
 //use the syntax Reducer1.Reducer1 to access Reducer1 and the intialState can be accessed using Reducer1.initailState.
  const [state, dispatch] = useReducer(Reducer1.Reducer1, Reducer1.initialState)
 //we save the the result of the useReducer() hook using array destructuring.

  useEffect(() => {
      setTimeout(() => setUseEffectValue("useEffect worked"), 3000 );
  }, [value])

  const incrementValue = () => {
    setValue(value + 1 )
  }
  //incrementValue and decrementValue is how we update the local state with the useState() hook.

  const decrementValue = () => {
    setValue(value - 1 )
  }

  const handleuseEffectValue = () => {
    setUseEffectValue("some string")
  }
//handleuseEffectValue is how we update the useEffectValue property of local state.
  const handleDispatchTrue = () => {
    //    dispatch2(type: "SUCCESS")
    //    dispatch2(ACTIONS.SUCCESS)
    dispatch(ACTIONS.success())
  }
//handleDispatchTrue and handleDispatchFalse is how we dispatch our actions to change our stateprop1 in Reducer1
  const handleDispatchFalse = () => {
    //     dispatch2(type: "FAILURE")
    //    dispatch2(ACTIONS.FAILURE)
    dispatch(ACTIONS.failure())
  }
//dispatch function, which tells our reducer how to update the state. 
  return (
    <div>
      <div>
         
      <button onClick={() => handleuseEffectValue()}> Handle Value  </button>
      <button onClick={() => handleDispatchTrue()}>Dispatch True </button>
      <button onClick={() => handleDispatchFalse()}>Dispatch False </button>
      <button onClick={() => context.dispatchContextTrue()}>Dispatch Context True </button>
      <button onClick={() => context.dispatchContextFalse()}>Dispatch Context False </button>
      <button onClick={() => incrementValue()}> Add Local Value </button>
      <button onClick={() => decrementValue()}> Dec Local Value </button>
      <br />
      <br />
      {context.useContextSubmitState
        ? <h3> {context.useContextSubmitState} </h3>
        : <h3> No User Text </h3>
      }
      <br />
      {state.stateprop1
        ? <p> stateprop1 is true </p>
        : <p> stateprop1 is false </p>
      }
      <br />
      {context.stateProp2
        ? <p> stateprop2 is true </p>
        : <p> stateprop2 is false </p>
      }
      <br />
      {useEffectValue
        ? <p> { useEffectValue }</p>
        : <p> No value </p>
      }
      <br />
      <p>Local Value: {value}</p>
      <br />
      <br />
      </div>
    </div>
  )
}

export default HooksContainer1;