import { useRef, useEffect } from "react";
import anime from "animejs";

const Preloader: React.FC = () => {
  const animationRef = useRef<anime.AnimeTimelineInstance | null>(null);
  const preloaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onLoad = () => {
      setTimeout(() => {
        sessionStorage.setItem("doNotShowPreloader", "true");
        document.body.style.overflow = "initial";
        if (preloaderRef.current) {
          preloaderRef.current.classList.add("hidden");
        }
      }, 3000);
    };

    window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("doNotShowPreloader") == null) {
      document.body.style.overflow = "hidden";
      if (preloaderRef.current) {
        preloaderRef.current.classList.remove("hidden");
      }
    }
    animationRef.current = anime
      .timeline()
      .add({
        targets: ".image img",
        easing: "easeOutQuad",
        duration: 1000,
        loop: false,
        rotate: [0, 360],
        scale: [0, 1],
      })
      .add({
        targets: ".image h1",
        duration: 1000,
        loop: false,
        opacity: [0, 1],
      });

    if (animationRef.current) {
      animationRef.current.restart();
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
    <div
      ref={preloaderRef}
      className="hidden image bg-gradient-to-br from-[#FFFFE5] to-[#FFD6B3] absolute z-50 top-0 bottom-0 left-0 right-0 pt-[150px] font-reemkufi space-y-5 text-2xl bg-white"
    >
      <img
        src="https://readrisp.sirv.com/Images/IMG_20230722_144502-removebg-preview.png"
        style={{ width: "150px", height: "auto" }}
        alt="rotating logo"
      />
      <h1 className="text-center" style={{ fontSize: "1.5rem", marginLeft: "-14px", marginTop: "20px"}}>
        Expense Tracker
      </h1>
    </div>
    </div>
  );
};

export default Preloader;
