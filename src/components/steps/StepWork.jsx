import { useState } from "react";


function StepWork({ nextStep, prevStep, setBeneficiaryData, beneficiaryData}){

    const [work, setWork] = useState(
        beneficiaryData?.work || {
      
        // Add the work fields here
        job_type:"",
        contract_type:"",
        monthly_income:"",
        
    });

   

    const handleChange = (e) =>{
        setWork({ ...work, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        setBeneficiaryData(prevData => ({
            ...prevData,
            work: work
        }));
        nextStep();
    };

    return(
        <div>
            <h2>العمل</h2>
              {/* Add the Work form here */}

            <table lang="ar" dir="rtl">
                <tbody>
                <tr>
                    <th>نوع العمل:</th>
                    <th><input type="text" name="job_type" value={work.job_type} onChange={handleChange} required /></th>
                    <th>نوع العقد:</th>
                    <th>
                    <label>
                            <input type="radio" name="contract_type" value="مثبّت" checked={work.contract_type === "مثبّت"} onChange={handleChange} required /> مثبّت
                        </label>
                        <label>
                            <input type="radio" name="contract_type" value="متعاقد" checked={work.contract_type === "متعاقد"} onChange={handleChange} required /> متعاقد
                        </label>
                        <label>
                            <input type="radio" name="contract_type" value="مياوم" checked={work.contract_type === "مياوم"} onChange={handleChange} required /> مياوم
                        </label>
                    </th>
                    <th>الدخل الشهري:</th>
                    <th><input type="text" name="monthly_income" value={work.monthly_income} onChange={handleChange} required /></th>
                </tr>
                </tbody>
            </table>
            
            <button onClick={prevStep}>السابق</button>
            <button onClick={handleNext}>التالي</button>    
        </div>

    );


}
export default StepWork;