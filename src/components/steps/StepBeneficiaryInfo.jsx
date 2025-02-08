import { useState } from "react";


function StepBeneficiaryInfo({ nextStep, setBeneficiaryData }){

    const [beneficiary, setBeneficiary] = useState({
        // Add the beneficiary properties here

    });

    const handleChange = (e) =>{
        setBeneficiary({ ...beneficiary, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        setBeneficiaryData(prevData => ({ ...prevData, ...beneficiary }));
        nextStep();
    };

    return(
        <div>
            {/*  Add the beneficiary form here */}
            
            <button onClick={handleNext}>التالي</button>    
        </div>

    );


}
export default StepBeneficiaryInfo;