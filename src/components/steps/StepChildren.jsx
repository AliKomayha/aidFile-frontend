import { useState } from "react";


function StepChildren({ nextStep, prevStep, setBeneficiaryData }){

    const [children, setChildren] = useState([]);

    const addChild = () => {
        // Add a new child to the children array
    };

    const handleChange = (e) =>{
        const updatedChildren = [...children];
        updatedChildren[index][e.target.name] = e.target.value;
        setChildren(updatedChildren);
    };

    const handleNext = () => {
        setBeneficiaryData(prevData => ({ ...prevData, ...children }));
        nextStep();
    };

    return(
        <div>
            <h2>الأبناء</h2>
              {/* Add the children form here */}
            
            <button onClick={prevStep}>السابق</button>
            <button onClick={handleNext}>التالي</button>    
        </div>

    );


}
export default StepChildren;