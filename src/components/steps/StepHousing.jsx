import { useState } from "react";
import './styles.css';


function StepHousing({ nextStep, prevStep, setBeneficiaryData, beneficiaryData }){

    const [housing, setHousing] = useState(
        beneficiaryData?.housing || {

        city:"",
        street:"",
        building:"",
        nature_of_housing:"",

    });

   

    const handleChange = (e) =>{
        setHousing({ ...housing, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        setBeneficiaryData(prevData => ({
            ...prevData,
            housing: housing
        }));
        nextStep();
    };

    return(
        <div>
            <h2>السكن</h2>
              {/* Add the Housing form here */}
            <table lang="ar" dir="rtl">
                <tbody>
                <tr>
                    <th>مدينة / بلدة:</th>
                    <th><input type="text" name="city" value={housing.city} onChange={handleChange} required /></th>
                    <th>شارع / حي:</th>
                    <th>
                    <select name="street" value={housing.street} onChange={handleChange} required>
                        <option value="">اختر الحي  </option> {/* Default Placeholder */}
                        <option value="ابو غبرا">ابو غبرا</option>
                        <option value="الجوبية">الجوبية</option>
                        <option value="النبعة">النبعة</option>
                        <option value="الحمارة">الحمارة</option>
                        <option value="السيار">السيار</option>
                        <option value="الساحة">الساحة</option>
                        <option value="البياض">البياض</option>
                        <option value="البركة">البركة</option>
                        <option value="المسيل">المسيل</option>
                        <option value="القبع">القبع</option>
                        <option value="مشيمش">مشيمش</option>
                        <option value="الدورة">الدورة</option>
                        <option value="المتراح">المتراح</option>
                        <option value="البيدر">البيدر</option>
                    </select>
                    </th>                    
                    <th>بناية / طابق / جهة:</th>
                    <th><input type="text" name="building" value={housing.building} onChange={handleChange} required /></th>
                    <th>طبيعة الإشغال:</th>
                    <th>
                    <label>
                            <input type="radio" name="nature_of_housing" value="ملك" onChange={handleChange} required /> ملك
                        </label>
                        <label>
                            <input type="radio" name="nature_of_housing" value="إيجار" onChange={handleChange} required /> إيجار
                        </label>
                        <label>
                            <input type="radio" name="nature_of_housing" value="إعارة" onChange={handleChange} required /> إعارة
                        </label>
                    </th>
                </tr>
                </tbody>
            </table>
            <button onClick={prevStep}>السابق</button>
            <button onClick={handleNext}>التالي</button>    
        </div>

    );


}
export default StepHousing;