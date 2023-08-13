const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const app = express();

app.use(express.json());
app.use(cors());


app.use(userRoute)

const port = 8080;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

