import dotenv from "dotenv";
<<<<<<< HEAD
dotenv.config();
import app from "./app";

 

const PORT = process.env.PORT || 5000;
 
 

app.listen(PORT, () => {
  console.log(`
    
====================================
🚀 JourneyAI Backend Started
🌍 Environment : Development
📡 Server      : http://localhost:${PORT}
=======
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
====================================
 JourneyAI Backend Started
 Environment : Development
 Server      : http://localhost:${PORT}
>>>>>>> 19dd3caf8aaf39ddb60ca7d66f0c719ccfff5e9f
====================================
`);
});