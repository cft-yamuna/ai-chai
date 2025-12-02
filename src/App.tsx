"use client";

import { useState } from "react";

type Screen = "landing" | "vibe" | "intermediate" | "result";

interface VibeOption {
  id: string;
  label: string;
  colorClass: string;
  image: string;
  textColor: string;
}

const vibeOptions: VibeOption[] = [
  {
    id: "1",
    label: "I'm the star of today",
    colorClass: "bg-[#1E88E5] hover:bg-[#1976d2]",
    image: "/1.png",
    textColor: "#0672CC",
  },
  {
    id: "2",
    label: "My brain needs a soft reboot",
    colorClass: "bg-[#00897B] hover:bg-[#00796b]",
    image: "/2.png",
    textColor: "#0B7C84",
  },
  {
    id: "3",
    label: "An extra boost of energy could help",
    colorClass: "bg-[#7B1FA2] hover:bg-[#6a1b9a]",
    image: "/3.png",
    textColor: "#66278F",
  },
  {
    id: "4",
    label: "I want the cosy, cuddly stuff",
    colorClass: "bg-[#455A64] hover:bg-[#37474f]",
    image: "/4.png",
    textColor: "#3F586E",
  },
  {
    id: "5",
    label: "Nothing fancy, just Mumbai OG",
    colorClass: "bg-[#00695C] hover:bg-[#00574b]",
    image: "/5.png",
    textColor: "#044D53",
  },
];

const teaNamesByVibe: Record<string, string[]> = {
  "1": [
    "Blue Spark Oolong",
    "Celestial Citrus Burst",
    "Skyline Jasmine Mist",
    "Starstruck Earl Grey",
    "Azure Bloom Sencha",
  ],
  "2": [
    "Calm Circuit Chamomile",
    "Soft Reboot Rooibos",
    "Minty Reboot Mate",
    "Gentle Reset Green",
    "Lavender Lullaby",
  ],
  "3": [
    "Turbocharge Chai",
    "Energizer Assam",
    "Rocket Fuel Matcha",
    "Voltage Vanilla Black",
    "Sunrise Spice Oolong",
  ],
  "4": [
    "Cozy Hearth Herbal",
    "Cuddle Cup Cocoa Chai",
    "Woolen Blanket White",
    "Velvet Hug Vanilla",
    "Pillowsoft Peppermint",
  ],
  "5": [
    "Mumbai OG Cutting Chai",
    "Bombay Breeze Masala",
    "Gateway Ginger Cup",
    "Marine Drive Malai",
    "Kali Peeli Kadak",
  ],
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [selectedVibe, setSelectedVibe] = useState<VibeOption | null>(null);
  const [teaName, setTeaName] = useState("");

  const getRandomTeaName = (vibeId: string, previous?: string) => {
    const options = teaNamesByVibe[vibeId] ?? [];
    if (!options.length) return "Signature ChAI Special";

    let choice = options[Math.floor(Math.random() * options.length)];
    if (previous && options.length > 1 && choice === previous) {
      // Reroll once to reduce immediate repeats.
      choice = options[Math.floor(Math.random() * options.length)];
    }
    return choice;
  };

  const handleGetStarted = () => {
    setSelectedVibe(null);
    setCurrentScreen("vibe");
  };

  const handleVibeSelect = (option: VibeOption) => {
    setSelectedVibe(option);
    setCurrentScreen("intermediate");
  };

  const handleContinueToResult = () => {
    if (selectedVibe) {
      setTeaName(getRandomTeaName(selectedVibe.id, teaName));
    }
    setCurrentScreen("result");
  };

  const handleTryAgain = () => {
    setSelectedVibe(null);
    setTeaName("");
    setCurrentScreen("vibe");
  };

  const handleHome = () => {
    setSelectedVibe(null);
    setTeaName("");
    setCurrentScreen("landing");
  };

  const renderLanding = () => (
    <div
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage: "url(/bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 w-full">
        <div
          className="mx-auto max-w-[1220px] px-6 md:px-12 "
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "450px",
          }}
        >
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-4 text-white font-bold shadow-xl bg-[#0672CC] rounded-full "
            style={{
              backgroundColor: "#0672CC",
              padding: "14px 60px",
              fontSize: "clamp(46px, 2.4vw, 30px)",
              
            }}
          >
            Let's Begin
          </button>
        </div>
      </div>
    </div>
  );

  const renderVibeQuestion = () => (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center p-8"
      style={{
        backgroundImage: "url(/bg2.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0"></div>

      <div className="relative z-10 w-full  flex flex-col items-center">
        {/* Buttons Grid */}
        <div className="w-full max-w-[1800px] mt-16">
          {/* First row - 3 buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-36 mb-16">
            {vibeOptions.slice(0, 3).map((option) => (
              <button
                key={option.id}
                onClick={() => handleVibeSelect(option)}
                className={`rounded-xl px-8 py-4 text-white text-3xl font-semibold shadow-lg transition-transform duration-200 ${option.colorClass} hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-black/20`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Second row - 2 buttons centered */}
          <div className="w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-20">
              {vibeOptions.slice(3, 5).map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleVibeSelect(option)}
                  className={`rounded-xl px-8 py-4 w-[300px] text-white text-3xl font-semibold shadow-lg transition-transform duration-200 ${option.colorClass} hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-black/20`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntermediate = () => {
    if (!selectedVibe) return null;

    return (
      <div
        className="min-h-screen relative flex items-center justify-center p-4"
        style={{
          backgroundImage: `url(${selectedVibe.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0"></div>

        <div className="relative z-10 w-full flex items-center justify-center">
          <button
            onClick={handleContinueToResult}
            className="text-5xl font-bold bg-white rounded-full shadow-2xl transition-all duration-200"
            style={{
              height: "109px",
              width: "406px",
              marginTop: "200px",
              color: selectedVibe.textColor
            }}
          >
            Get My ChAI
          </button>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!selectedVibe) return null;

    return (
      <div
        className="min-h-screen relative flex flex-col items-center justify-center p-8"
        style={{
          backgroundImage: "url(/finish.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 "></div>

        <div className="relative z-10 w-full max-w-5xl text-center">
          
          
          <p className="text-black text-5xl mb-12 max-w-5xl mx-auto mt-38">
            Enjoy your <span className="font-bold">{teaName || "Signature ChAI Special"}</span> - may your day be favorable as your choice
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-16 mt-[100px]">
            <button
              onClick={handleTryAgain}
              className="text-5xl font-bold text-white bg-[#1976D2] rounded-full shadow-xl hover:bg-[#1565C0] transition-all duration-200 hover:scale-[1.05]"
              style={{ width: "400px", height: "100px" }}
            >
              Try Again
            </button>
            <button
              onClick={handleHome}
              className="text-5xl font-bold text-white bg-[#0D47A1] rounded-full shadow-xl hover:bg-[#01579B] transition-all duration-200 hover:scale-[1.05]"
              style={{ width: "400px", height: "100px" }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };

  switch (currentScreen) {
    case "landing":
      return renderLanding();
    case "vibe":
      return renderVibeQuestion();
    case "intermediate":
      return renderIntermediate();
    case "result":
      return renderResult();
    default:
      return renderLanding();
  }
}

export default App;
