import { useState } from "react";


function StepHousing({ nextStep, prevStep, setBeneficiaryData }){

    const [housing, setHousing] = useState({



    });

   

    const handleChange = (e) =>{
        setHousing({ ...housing, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        setBeneficiaryData(prevData => ({ ...prevData, ...housing }));
        nextStep();
    };

    return(
        <div>
            <h2>السكن</h2>
              {/* Add the Housing form here */}
            
            <button onClick={prevStep}>السابق</button>
            <button onClick={handleNext}>التالي</button>    
        </div>

    );


}
export default StepHousing;