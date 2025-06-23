export const districts = ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Kurunegala'];
export const soilTypes = ['Loamy', 'Sandy', 'Clay', 'Silty', 'Peaty'];

export const testRecommendation = {
  cropVariety: {
    crop: { id: 1, name: "Maize" },
    variety: "Hybrid 101",
    zoneFit: [
      {
        id: 1,
        zoneCode: "Z1",
        avgRainfallMm: 1200,
        avgTempC: 28,
        soilSeries: "Black Clay",
        districts: [{ id: 1, name: "Nuwara Eliya" }, { id: 2, name: "Kandy" }]
      }
    ],
    soilCompatibility: "Loamy soil",
    maturityDays: 90,
    waterNeedsMm: 800,
    yieldKgPerHa: 5500,
    pestDiseaseIndex: 0.3,
    rotationOptions: "Can be rotated with legumes",
    seedRateKgPerHa: 20,
    npkSchedule: {
      id: 1,
      name: "Standard Maize Mix",
      nitrogen: 100,
      phosphorus: 60,
      potassium: 40
    }
  },
  estimatedSeedPrice: 2500,
  estimatedFertilizerPrice: 3800,
  previousYearPriceAverages: [
    {
      cropVariety: {
        id: 1,
        crop: { id: 1, name: "Maize" },
        variety: "Hybrid 101",
        zoneFit: [],
        soilCompatibility: "",
        maturityDays: 0,
        waterNeedsMm: 0,
        yieldKgPerHa: 0,
        pestDiseaseIndex: 0,
        rotationOptions: "",
        seedRateKgPerHa: 0,
        npkSchedule: {
          id: 1,
          name: "",
          nitrogen: 0,
          phosphorus: 0,
          potassium: 0
        }
      },
      cropVarietyName: "Hybrid 101",
      start: "2024-01-01",
      end: "2024-12-31",
      district: "Kandy",
      farmGatePriceLkrPerKg: 52,
      wholesalePriceLkrPerKg: 60,
      retailPriceLkrPerKg: 70
    }
  ]
};

