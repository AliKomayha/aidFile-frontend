import { useState } from "react";


function StepProperties({ nextStep, prevStep, setBeneficiaryData }){

    const [properties, setProperties] = useState([]);

    const addProperty = () => {
        // Add a new property to the Properties array
    };

    const handleChange = (e) =>{
        const updatedProperties = [...properties];
        updatedProperties[index][e.target.name] = e.target.value;
        setProperties(updatedProperties);
    };

    const handleNext = () => {
        setBeneficiaryData(prevData => ({ ...prevData, ...properties }));
        nextStep();
    };

    return(
        <div>
            <h2>العقارات</h2>
              {/* Add the Properties form here */}
            
            <button onClick={prevStep}>السابق</button>
            <button onClick={handleNext}>التالي</button>    
        </div>

    );


}
export default StepProperties;