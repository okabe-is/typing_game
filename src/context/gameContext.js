import React from "react";

const gameContext = React.createContext({
   current_game_score : 0,
   highest_score: 0
});

export  default  gameContext;