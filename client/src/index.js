import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Nous parlons de nœud DOM « racine » car tout ce qu’il contient sera géré par React DOM.

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


//Affiche un élément React au sein du nœud DOM spécifié 
//par container et renvoie une référence sur le composant
// (ou renvoie null pour les fonctions composants).



serviceWorker.unregister();

