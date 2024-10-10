import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";


export function ClickCounter() {
 const [liked, setLiked] = useState<boolean>(false);

 const theme = useContext(ThemeContext);

 let icon : string = '\u2661';

 useEffect(() => {
  if(liked){
    icon = '\u2665';
  }
  else{
    icon = '\u2661';
  }
  console.log(liked);
}, [liked]);

return (
   <div
     style={{
       color: theme.foreground,
       padding: "20px",
     }}
   >
     <button
       onClick={() => setLiked(!liked)}
       style={{color: theme.background }}
     >
      {icon}
     </button>
   </div>
 );

}

// Wrapper component to provide context
function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);
 
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };
 
  return (
    <ThemeContext.Provider value={currentTheme}>
      <button onClick={toggleTheme}> Toggle Theme </button>
      <ClickCounter />
    </ThemeContext.Provider>
  );
 }
 
 export default ToggleTheme;
 
