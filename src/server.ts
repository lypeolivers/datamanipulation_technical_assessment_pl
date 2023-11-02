import app from "./app";
import "dotenv/config";
import connectDatabase from "./data-source";

(async () => {
  try {
    await connectDatabase();
    app.listen(process.env.PORT, () => {
      console.log("Servidor executando");
    });
  } catch (error) {
    console.log("error");
  }
})();
