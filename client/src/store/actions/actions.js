//Will hold the actual actions that are going to be used in the reducer to update the state.
//d’avoir une propriété type sérialisable (un string) ainsi que n’importe quelles autres propriétés permettant au réducteur de générer un nouvel état.
import * as ACTION_TYPES from './action_types'


export const success = () => {
  return {
    type: ACTION_TYPES.SUCCESS
  }
}

//Les actions : envoyer des ordres
//La fonction addBeer() ci-dessus pourra être dispatchée par n’importe 
//quel composant (connecté au store) de notre appli React Native souhaitant créer une nouvelle bière. 
//Son paramètre data contiendra les données de la nouvelle bière à ajouter.
export const failure = () => {
  return {
    type: ACTION_TYPES.FAILURE
  }
}



export const login_success = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS
  }
}

export const login_failure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE
  }
}


export const add_profile = (profile) => {
  return {
    type: ACTION_TYPES.ADD_PROFILE,
    payload: profile
  }
}

export const remove_profile = () => {
  return {
    type: ACTION_TYPES.REMOVE_PROFILE
  }
}

export const user_input_change = (text) => {
  return {
    type: ACTION_TYPES.USER_INPUT_CHANGE,
    payload: text
  }
}

export const user_input_submit = (text) => {
  return {
    type: ACTION_TYPES.USER_INPUT_SUBMIT,
    payload: text
  }
}

//Vous venez de déclarer deux actions (XXX  et YYY)
// qui prennent chacune un type (obligatoire) et un payload
//La fonction addBeer() ci-dessus pourra être dispatchée 
//par n’importe quel composant (connecté au store)
// de notre appli React Native souhaitant créer une nouvelle bière. 
//Son paramètre data contiendra les données de la nouvelle bière à ajouter.