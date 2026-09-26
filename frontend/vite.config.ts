<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
=======
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";


export default defineConfig({

  plugins:[

    react(),

    tailwindcss()

  ]

});
>>>>>>> 19dd3caf8aaf39ddb60ca7d66f0c719ccfff5e9f
