const api = require("../config/axios");
const knapsack = require("../services/knapsack");

exports.runScheduler = async (req, res) => {
  try {
    console.log("Calling APIs...");

    const depotsRes = await api.get("/depots");
    const vehiclesRes = await api.get("/vehicles");

    const depots = depotsRes.data.depots;
    const vehicles = vehiclesRes.data.vehicles;

    console.log("Depots:", depots);
    console.log("Vehicles:", vehicles);

    let result = [];

    for (let depot of depots) {
      const maxHours = depot.MechanicHours;

      // **FIX: Filter vehicles by depot ID**
      const depotVehicles = vehicles.filter(v => v.DepotID === depot.ID);



      // Run knapsack with only this depot's vehicles
      const maxImpact = knapsack(depotVehicles, maxHours);

      result.push({
        depotId: depot.ID,
        maxImpact: maxImpact
      });
    }

    res.json({
      success: true,
      schedule: result
    });

  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};