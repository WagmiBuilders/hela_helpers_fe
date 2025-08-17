// WeatherPage.tsx
import TrainSection from "../components/weatherComponents/TrainSection.tsx";
import PredictSection from "../components/weatherComponents/PredictSection.tsx";
import UploadForm from "../components/weatherComponents/UploadForm.tsx";

export default function WeatherPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto space-y-6">
                <div className="grid gap-4 items-start grid-cols-1 lg:grid-cols-5">
                    {/* Top row */}
                    <div className="lg:col-span-4">
                        <UploadForm />
                    </div>
                    <div className="lg:col-span-1">
                        <TrainSection />
                    </div>

                    {/* Bottom row: Predict (full width) */}
                    <div className="lg:col-span-5">
                        <PredictSection />
                    </div>
                </div>
            </div>
        </div>
    );
}


// import TrainSection from "../components/weatherComponents/TrainSection.tsx";
// import PredictSection from "../components/weatherComponents/PredictSection.tsx";
// import UploadForm from "../components/weatherComponents/UploadForm.tsx";
//
//
// export default function WeatherPage() {
//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <div className=" mx-auto space-y-6">
//                 {/* Top row: Upload + Train */}
//                 <div className="grid grid-cols-5 grid-rows-5 gap-4">
//                     <div className="col-span-4 row-span-3"><UploadForm/></div>
//                     <div className="row-span-3 col-start-5"><TrainSection/></div>
//                     <div className="col-span-5 row-span-2 row-start-4"><PredictSection/></div>
//                 </div>
//
//
//                 {/* Bottom row: Predict */}
//             </div>
//         </div>
//     );
// }