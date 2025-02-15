import { useState } from "react";
import './styles.css';



const StepBeneficiaryInfo =({ nextStep, setBeneficiaryData, beneficiaryData }) => {
    const [beneficiary, setBeneficiary] = useState(
        beneficiaryData?.beneficiary || {
            name: '',
            father_name: '',
            grandfather_name:'',
            lastname: '',
            date_of_birth: '',
            mothers_name: '',
            social_status: '',
            family_situation: '',
            health_status: '',
            number_place_of_registration: '',
            nationality: '',
            doctrine: '',
            guarantor: '',
            political_affiliation: '',
            lineage: '',
            academic_level: '',
            blood_type: '',
            religious_commitment: '',
            phone_number: '',
            second_phone: '',
            }

    );

    const handleChange = (e) =>{
        setBeneficiary({ ...beneficiary, [e.target.name]: e.target.value });
    };
    

    const handleNext = () => {
        setBeneficiaryData(prevData => ({
            ...prevData,
            //beneficiaryInfo: beneficiary
            beneficiary: beneficiary
        }));
        nextStep();
    };

    return(
        <div>
            {/*  Add the beneficiary form here */}
            <table lang="ar" dir="rtl">
                <tbody>
    <tr>
        <th>الاسم:</th>
        <th><input type="text" name="name" value={beneficiary.name} onChange={handleChange} required /></th>
        <th>إسم الأم وشهرتها:</th>
        <th><input type="text" name="mothers_name" value={beneficiary.mothers_name} onChange={handleChange} required /></th>
        <th>الجنسية:</th>
        <th><input type="text" name="nationality" value={beneficiary.nationality} onChange={handleChange} required /></th>
        <th>النسب:</th>
        <th><input type="text" name="lineage" value={beneficiary.lineage} onChange={handleChange} required /></th>
    </tr>
    
    <tr>
        <th>اسم الأب:</th>
        <th><input type="text" name="father_name" value={beneficiary.father_name} onChange={handleChange} required /></th>
        <th>الوضع الاجتماعي:</th>
        <th><input type="text" name="social_status" value={beneficiary.social_status} onChange={handleChange} required /></th>
        <th>المذهب:</th>
        <th><input type="text" name="doctrine" value={beneficiary.doctrine} onChange={handleChange} required /></th>
        <th>المستوى العلمي:</th>
        <th><input type="text" name="academic_level" value={beneficiary.academic_level} onChange={handleChange} required /></th>
    </tr>

    <tr>
        <th>اسم الجد:</th>
        <th><input type="text" name="grandfather_name" value={beneficiary.grandfather_name} onChange={handleChange} required /></th>
        <th>الوضع العائلي:</th>
        <th><input type="text" name="family_situation" value={beneficiary.family_situation} onChange={handleChange} required /></th>
        <th>الجهة الضامنة:</th>
        <th><input type="text" name="guarantor" value={beneficiary.guarantor} onChange={handleChange} required /></th>
        <th>فئة الدم:</th>
        <th><input type="text" name="blood_type" value={beneficiary.blood_type} onChange={handleChange} required /></th>
    </tr>

    <tr>
        <th>الشهرة:</th>
        <th><input type="text" name="lastname" value={beneficiary.lastname} onChange={handleChange} required /></th>
        <th>الوضع الصحي:</th>
        <th><input type="text" name="health_status" value={beneficiary.health_status} onChange={handleChange} required /></th>
        <th>الانتماء السياسي:</th>
        <th><input type="text" name="political_affiliation" value={beneficiary.political_affiliation} onChange={handleChange} required /></th>
        <th>الالتزام الديني:</th>
        <th><label>
                <input type="radio" name="religious_commitment" value="نعم" onChange={handleChange} required /> نعم
            </label>
            <label>
                 <input type="radio" name="religious_commitment" value="كلا" onChange={handleChange} required /> كلا
            </label>
        </th>
    </tr>

    <tr>
        <th>تاريخ الولادة:</th>
        <th><input type="date" name="date_of_birth" value={beneficiary.date_of_birth} onChange={handleChange} required /></th>
        <th>محل ورقم القيد:</th>
        <th><input type="text" name="number_place_of_registration" value={beneficiary.number_place_of_registration} onChange={handleChange} required /></th>
        <th>هاتف خلوي:</th>
        <th><input type="text" name="phone_number" value={beneficiary.phone_number} onChange={handleChange} required /></th>
        <th>هاتف ثابت:</th>
        <th><input type="text" name="second_phone" value={beneficiary.second_phone} onChange={handleChange} required /></th>
    </tr>
    </tbody>
</table>



        <br />
            <button onClick={handleNext}>التالي</button>    
        </div>

    );


}
export default StepBeneficiaryInfo;