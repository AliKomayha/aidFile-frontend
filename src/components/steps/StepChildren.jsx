import { useState } from "react";


function StepChildren({ nextStep, prevStep, setBeneficiaryData, beneficiaryData }){

    const [children, setChildren] = useState(beneficiaryData?.children || []);

    const addChild = () => {
        
        setChildren([...children, {
            name: "",
            place_of_birth:"",
            date_of_birth:"",
            religious_commitment:"",
            sex:"",
            resident_in_house:"",
            academic_level: "",
            continues_studying: "",
            yearly_installment: "",
            type_of_work: "",
            monthly_income: "",
            monthly_contribution: "",
            health_status: "",
            guarantor: "",
            blood_type: ""
            }]);

    };

    
    const handleChange = (e, index, field = null) => {
        const { name, value, type } = e.target;
        const updatedChildren = [...children];
    
        if (type === "radio") {
            updatedChildren[index] = { ...updatedChildren[index], [field]: value };
        } else {
            updatedChildren[index][name] = value;
        }
    
        setChildren(updatedChildren);
    };

    const handleNext = () => {
        setBeneficiaryData(prevData => ({
            ...prevData,
            children: children
        }));
        nextStep();
    };

    

    return(
        <div>
            <h2>الأبناء</h2>
              {/* Add the children form here */}
            
            {children.map((child, index) => (
                <div key={index}>
                    <h3>ابن {index + 1}</h3>
                    <table lang="ar" dir="rtl">
                        <tbody>
                            <tr>
                                <th>الاسم:</th>
                                <th><input type="text" name="name" value={child.name} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>مكان الولادة:</th>
                                <th><input type="text" name="place_of_birth" value={child.place_of_birth} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>تاريخ الولادة:</th>
                                <th><input type="date" name="date_of_birth" value={child.date_of_birth} onChange={(e) => handleChange(e, index)} required /></th>
                            </tr>
                            <tr>
                                <th>الجنس:</th>
                                <th><input type="text" name="sex" value={child.sex} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>مقيم في المنزل:</th>
                                <th>
                                    <label>
                                        <input type="radio" name={`resident_in_house_${index}`}  value="نعم" checked={child.resident_in_house === "نعم"} onChange={(e) => handleChange(e, index, "resident_in_house")} required /> نعم
                                    </label>
                                    <label>
                                        <input type="radio" name={`resident_in_house_${index}`}  value="كلا" checked={child.resident_in_house === "كلا"} onChange={(e) => handleChange(e, index, "resident_in_house")} required /> كلا
                                    </label>
                                </th>
                                <th>الالتزام الديني:</th>
                                <th>
                                    <label>
                                        <input type="radio" name={`religious_commitment_${index}`} value="نعم" checked={child.religious_commitment === "نعم"} onChange={(e) => handleChange(e, index, "religious_commitment")} required /> نعم
                                    </label>
                                    <label>
                                        <input type="radio" name={`religious_commitment_${index}`} value="كلا" checked={child.religious_commitment === "كلا"} onChange={(e) => handleChange(e, index, "religious_commitment")} required /> كلا
                                    </label>
                                </th>
                            </tr>
                            <tr>
                                <th>المستوى الأكاديمي:</th>
                                <th><input type="text" name="academic_level" value={child.academic_level} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>يواصل الدراسة:</th>
                                <th>
                                    <label>
                                        <input type="radio" name={`continues_studying_${index}`} value="نعم" checked={child.continues_studying === "نعم"} onChange={(e) => handleChange(e, index, "continues_studying")} required /> نعم
                                    </label>
                                    <label>
                                        <input type="radio" name={`continues_studying_${index}`} value="كلا" checked={child.continues_studying === "كلا"} onChange={(e) => handleChange(e, index, "continues_studying")} required /> كلا
                                    </label>
                                </th>
                                <th>القسط السنوي:</th>
                                <th><input type="text" name="yearly_installment" value={child.yearly_installment} onChange={(e) => handleChange(e, index)} required /></th>
                            </tr>
                            <tr>
                                <th>نوع العمل:</th>
                                <th><input type="text" name="type_of_work" value={child.type_of_work} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>الدخل الشهري:</th>
                                <th><input type="text" name="monthly_income" value={child.monthly_income} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>المساهمة الشهرية:</th>
                                <th><input type="text" name="monthly_contribution" value={child.monthly_contribution} onChange={(e) => handleChange(e, index)} required /></th>
                            </tr>
                            <tr>
                                <th>الحالة الصحية:</th>
                                <th><input type="text" name="health_status" value={child.health_status} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>الجهة الضامنة:</th>
                                <th><input type="text" name="guarantor" value={child.guarantor} onChange={(e) => handleChange(e, index)} required /></th>
                                <th>فصيلة الدم:</th>
                                <th><input type="text" name="blood_type" value={child.blood_type} onChange={(e) => handleChange(e, index)} required /></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
            <button onClick={addChild}>إضافة طفل</button>
            <button onClick={prevStep}>السابق</button>
            <button onClick={handleNext}>التالي</button>    
        </div>

    );


}
export default StepChildren;