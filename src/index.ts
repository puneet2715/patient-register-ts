import { AppDataSource, hospitalRepo, patientRepo } from "./data-source";
import * as express from "express";
import routes from "./routes/routes";
import * as swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

(async () => {
  try {
    // Initialize the data source
    await AppDataSource.initialize();

    // Express
    const app = express();

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use("/api/", routes);

    app.listen(3000, () => {
      console.log("Example app listening on port 3000!");
    });
  } catch (error) {
    console.log(error);
  }
})();
