const app = require("./src/app");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const URL = process.env.url

app.listen(PORT, () => {
  console.log(`Server is Running ${PORT}`);
});
