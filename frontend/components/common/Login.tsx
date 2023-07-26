import React , {useState, useEffect}from "react";
import { ConnectButton } from "web3uikit";

function Login() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    // Add event listener to track window resize
    window.addEventListener("resize", handleResize);

    // Initial check for small screen
    handleResize();

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div>
      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",     
          alignItems: "center",
          gap: "20px",
          flexDirection: isSmallScreen ? "column" : "row", 
        }}
      >
        <img
          src="/images/welcome.svg"
          alt="no data"
          width={"300vh"}
          height={"300vh"}
        />
        <div 
        style={{display:'flex',
         flexDirection:'column', 
         alignItems:'center'}}>
          <h2 style={{ fontWeight: 'bold' }}>Welcome to Jarvis</h2>
          <ConnectButton moralisAuth={false}/>
        </div>
      </div>
    </div>
  );
}

export default Login;
