import { useState } from "react";


function StepWork({ nextStep, prevStep, setBeneficiaryData }){

    const [work, setWork] = useState({

        // Add the work fields here

    });

   

    const handleChange = (e) =>{
        setWork({ ...work, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        setBeneficiaryData(prevData => ({ ...prevData, ...work }));
        nextStep();
    };

    return(
        <div>
            <h2>العمل</h2>
              {/* Add the Work form here */}
            
            <button onClick={prevStep}>السابق</button>
            <button onClick={handleNext}>التالي</button>    
        </div>

    );


}
export default StepWork;