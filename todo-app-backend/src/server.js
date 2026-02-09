import app from "./app.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;

dotenv.config({ quiet: true });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
