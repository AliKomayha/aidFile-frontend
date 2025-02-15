import { useState } from "react";


function StepWives({ nextStep, prevStep, setBeneficiaryData, beneficiaryData }){

    const [wives, setWives] = useState(beneficiaryData?.wives || []);

    const addWife = () => {
        // Add a new wife to the wives array
        setWives([...wives, { 
            full_name:"",
            place_of_birth:"",
            date_of_birth:"",
             religious_commitment: "",
            doctrine: "",
            lineage: "",
            academic_level: "",
            type_of_work: "",
            monthly_income: "",
            health_status: "",
            guarantor: "",
            blood_type: "",
            property_type: "",
            property_value: "",     

         }]);
    };

    const handleChange = (e,index) =>{
        const updatedWives = [...wives];
        updatedWives[index][e.target.name] = e.target.value;
        setWives(updatedWives);
    };

    const handleNext = () => {
        setBeneficiaryData(prevData => ({
            ...prevData,
            wives: wives
        }));
        nextStep();
    };

    return(
        <div>
            <h2>الزوجات</h2>
              {/* Add the wives form here */}
              {wives.map((wife, index) => (
                <div key={index}>
                    <h3> {index + 1}</h3>
                    <table lang="ar" dir="rtl">
                        <tbody>
                            <tr>
                                <th>الاسم:</th>
                                <th><input type="text" name="name" value={wife.name} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>مكان الولادة:</th>
                                <th><input type="text" name="place_of_birth" value={wife.place_of_birth} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>تاريخ الولادة:</th>
                                <th><input type="text" name="date_of_birth" value={wife.date_of_birth} onChange={(e) => handleChange(e, index)} required /></th>
                            </tr>
                            <tr>
                                <th>الالتزام الديني:</th>
                                <th><input type="text" name="religious_commitment" value={wife.religious_commitment} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>المذهب:</th>
                                <th><input type="text" name="doctrine" value={wife.doctrine} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>النسب:</th>
                                <th><input type="text" name="lineage" value={wife.lineage} onChange={(e) => handleChange(e, index)} required /></th>
                            </tr>
                            <tr>
                                <th>المستوى الأكاديمي:</th>
                                <th><input type="text" name="academic_level" value={wife.academic_level} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>نوع العمل:</th>
                                <th><input type="text" name="type_of_work" value={wife.type_of_work} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>الدخل الشهري:</th>
                                <th><input type="text" name="monthly_income" value={wife.monthly_income} onChange={(e) => handleChange(e, index)} required /></th>
                            </tr>
                            <tr>
                                <th>الحالة الصحية:</th>
                                <th><input type="text" name="health_status" value={wife.health_status} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>الكفيل:</th>
                                <th><input type="text" name="guarantor" value={wife.guarantor} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>فصيلة الدم:</th>
                                <th><input type="text" name="blood_type" value={wife.blood_type} onChange={(e) => handleChange(e, index)} required /></th>
                            </tr>
                            <tr>
                                <th>نوع الممتلكات:</th>
                                <th><input type="text" name="property_type" value={wife.property_type} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>قيمة الممتلكات:</th>
                                <th><input type="text" name="property_value" value={wife.property_value} onChange={(e) => handleChange(e, index)} required /></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
            <button onClick={addWife}>إضافة زوجة</button>
            
                
                
            <button onClick={prevStep}>السابق</button>
            <button onClick={handleNext}>التالي</button>    
        </div>

    );


}
export default StepWives;