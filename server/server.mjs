import app from './app.mjs'; // Note the .js extension
import config from './config/config.mjs'; // Note the .js extension

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
