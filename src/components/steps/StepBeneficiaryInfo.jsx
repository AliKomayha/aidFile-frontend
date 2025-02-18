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
            family_status: '',
            comments: '',
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
        <th>
        <select name="social_status" value={beneficiary.social_status} onChange={handleChange} required>
            <option value="">اختر الوضع الاجتماعي </option> {/* Default Placeholder */}
            <option value="حي">حي</option>
            <option value="متوفي">متوفي</option>
            <option value="شهيد">شهيد</option>
            <option value="مفقود">مفقود</option>
        </select>
        </th> 
        <th>المذهب:</th>
        <th><input type="text" name="doctrine" value={beneficiary.doctrine} onChange={handleChange} required /></th>
        <th>المستوى العلمي:</th>
        <th>
        <select name="academic_level" value={beneficiary.academic_level} onChange={handleChange} required>
            <option value="">اختر المستوى العلمي  </option> {/* Default Placeholder */}
            <option value="أمي">أمي</option>
            <option value="روضة">روضة</option>
            <option value="إبتدائي">إبتدائي</option>
            <option value="متوسط">متوسط</option>
            <option value="ثانوي">ثانوي</option>
            <option value="جامعي">جامعي</option>
            <option value="دراسات عليا">دراسات عليا</option>
            <option value="حوزة">حوزة</option>
        </select>
        </th>
        </tr>

    <tr>
        <th>اسم الجد:</th>
        <th><input type="text" name="grandfather_name" value={beneficiary.grandfather_name} onChange={handleChange} required /></th>
        <th>الوضع العائلي:</th>
        <th>
        <select name="family_situation" value={beneficiary.family_situation} onChange={handleChange} required>
            <option value="">اختر الوضع العائلي </option> {/* Default Placeholder */}
            <option value="متأهل">متأهل</option>
            <option value="مطلق">مطلق</option>
            <option value="أرمل">أرمل</option>
            <option value="هاجر">هاجر</option>
        </select>
        </th>        
        <th>الجهة الضامنة:</th>
        <th>
        <select name="guarantor" value={beneficiary.guarantor} onChange={handleChange} required>
            <option value="">اختر الجهة الضامنة   </option> {/* Default Placeholder */}
            <option value="لا يوجد">لا يوجد</option>
            <option value="ضمان إجتماعي">ضمان إجتماعي</option>
            <option value="تعاونية موظفي الدولة">تعاونية موظفي الدولة</option>
            <option value="جيش">جيش</option>
            <option value="درك">درك</option>
            <option value="ريجي">ريجي</option>
            <option value="تأمين خاص">تأمين خاص</option>
            <option value="نقابة">نقابة</option>
            <option value="مؤسسة">مؤسسة</option>
        </select>
        </th>        
        <th>فئة الدم:</th>
        <th>
        <select name="blood_type" value={beneficiary.blood_type} onChange={handleChange} required>
            <option value="">اختر فئة الدم  </option> {/* Default Placeholder */}
            <option value="A +">A +</option>
            <option value="A -">A -</option>
            <option value="B +">B +</option>
            <option value="B -">B -</option>
            <option value="O +">O +</option>
            <option value="O -">O -</option>
            <option value="AB +">AB +</option>
            <option value="AB -">AB -</option>
        </select>
        </th>    
        </tr>

    <tr>
        <th>الشهرة:</th>
        <th><input type="text" name="lastname" value={beneficiary.lastname} onChange={handleChange} required /></th>
        <th>الوضع الصحي:</th>
        <th>
        <select name="health_status" value={beneficiary.health_status} onChange={handleChange} required>
            <option value="">اختر الوضع الصحي </option> {/* Default Placeholder */}
            <option value="سليم">سليم</option>
            <option value="أمراض مزمنة">أمراض مزمنة</option>
            <option value="معوّق">معوّق</option>
        </select>
        </th>
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
    <tr>
        <th>وضع الأسرة:</th>
        <th>
        <select name="family_status" value={beneficiary.family_status} onChange={handleChange} required>
            <option value="">اختر وضع الأسرة</option> {/* Default Placeholder */}
            <option value="عادي">عادي</option>
            <option value="ميسور">ميسور</option>
            <option value="فقير">فقير</option>
            <option value="مستضعف">مستضعف</option>
            <option value="أيتام">أيتام</option>
            <option value="أيتام الشهداء">أيتام الشهداء</option>
        </select>
        </th>
        <th>ملاحظات:</th>
        <th><input type="text" name="comments" value={beneficiary.comments} onChange={handleChange} required /></th>
    </tr>
    </tbody>
</table>



        <br />
            <button onClick={handleNext}>التالي</button>    
        </div>

    );


}
export default StepBeneficiaryInfo;