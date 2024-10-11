import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";
import App from './App';

interface ClickCounterProps{
  title : string;
  likedNotes: string[];
  handleLike: React.Dispatch<React.SetStateAction<string[]>>;
}
export function ClickCounter({title, likedNotes, handleLike} : ClickCounterProps) {
 const [liked, setLiked] = useState<boolean>(false);
 const [icon, setIcon] = useState<string>("\u2661");
 

 const theme = useContext(ThemeContext);
 
 useEffect(() => {
  if(liked){
    setIcon('\u2764\uFE0F');
    handleLike([...likedNotes, title]);

  }
  else{
    setIcon('\u2661');
    handleLike(likedNotes.filter(string => string !== title));
  }
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

  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.background;
  }, [currentTheme]);
 
  return (
    <ThemeContext.Provider value={currentTheme}>
      <App/>
      <button onClick={toggleTheme}> Toggle Theme </button>
    </ThemeContext.Provider>
  );
 }
 
 export default ToggleTheme;
 
