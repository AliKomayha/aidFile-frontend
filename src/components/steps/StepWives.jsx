import { useState } from "react";


function StepWives({ nextStep, prevStep, setBeneficiaryData }){

    const [wives, setWives] = useState([]);

    const addWife = () => {
        // Add a new wife to the wives array
    };

    const handleChange = (e) =>{
        const updatedWives = [...wives];
        updatedWives[index][e.target.name] = e.target.value;
        setWives(updatedWives);
    };

    const handleNext = () => {
        setBeneficiaryData(prevData => ({ ...prevData, ...wives }));
        nextStep();
    };

    return(
        <div>
            <h2>الزوجات</h2>
              {/* Add the wives form here */}
            
            <button onClick={prevStep}>السابق</button>
            <button onClick={handleNext}>التالي</button>    
        </div>

    );


}
export default StepWives;