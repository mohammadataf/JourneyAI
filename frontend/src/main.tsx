import { StrictMode } from "react";
<<<<<<< HEAD
import { createRoot } from "react-dom/client";
import { APIProvider } from "@vis.gl/react-google-maps";

import "./index.css";
import App from "./App.tsx";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <App />
    </APIProvider>
  </StrictMode>
);
=======

import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";


import "./index.css";

import App from "./App";



createRoot(
    document.getElementById("root")!
).render(

    <StrictMode>


        <BrowserRouter>

            <App />

        </BrowserRouter>


    </StrictMode>

);
>>>>>>> 19dd3caf8aaf39ddb60ca7d66f0c719ccfff5e9f
