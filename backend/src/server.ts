import app from "./app";
import sequelize from "./config/db.config";

const port = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err: unknown) => {
    console.error("Unable to connect to the database:", err);
  });
