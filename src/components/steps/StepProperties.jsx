import { useState } from "react";


function StepProperties({ nextStep, prevStep, setBeneficiaryData, beneficiaryData }){

    const [properties, setProperties] = useState(beneficiaryData?.properties || []);

    const addProperty = () => {
        // Add a new property to the Properties array
        setProperties([...properties, { property_type: "", property_value: "" }]);
    };

    const handleChange = (e, index) => {
        const updatedProperties = [...properties];
        updatedProperties[index][e.target.name] = e.target.value;
        setProperties(updatedProperties);
    };

    const handleNext = () => {
        setBeneficiaryData(prevData => ({
            ...prevData,
            properties: properties
        }));
        nextStep();
    };

    return(
        <div>
            <h2>ممتلكات رب الأسرة</h2>
              {/* Add the Properties form here */}
            <table lang="ar" dir="rtl">
                <tbody>
                
                {properties.map((property, index) => (
                    <tr key={index}>
                        <td>النوع :</td>
                        <td><input type="text" name="property_type" value={property.property_type} onChange={(e) => handleChange(e, index)} required /></td>
                        <td>القيمة التقديرية :</td>
                        <td><input type="text" name="property_value" value={property.property_value} onChange={(e) => handleChange(e, index)} required /></td>
                    </tr>
                ))}
                <tr>
                    <td colSpan="4">
                        <button type="button" onClick={addProperty}>إضافة ممتلكات </button>
                    </td>
                </tr>
                </tbody>
            </table>
            
            <button onClick={prevStep}>السابق</button>
            <button onClick={handleNext}>التالي</button>    
        </div>

    );


}
export default StepProperties;