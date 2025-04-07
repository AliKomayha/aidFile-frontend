import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { baseUrl } from "../config";
import './steps/styles.css';


function UpdateBeneficiary(){

    const token = localStorage.getItem('auth_token');
    const navigate = useNavigate();
    const { id } = useParams();


    const [beneficiary, setBeneficiary] = useState(null);
    const [work, setWork] = useState({ job_type: "", contract_type: "", monthly_income: "" });
    const [housing, setHousing] = useState([]);
    const [properties, setProperties] = useState([]);
    const [wives, setWives] = useState([]);
    const [children, setChildren] = useState([]);
    const [message, setMessage] = useState('');


       // ✅ Fetch Beneficiary Data on Component Mount
    useEffect(() => {
        const fetchBeneficiary = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/beneficiaries/${id}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setBeneficiary(data);
                    setWork(data.work || {});
                    setHousing(data.housing || {});
                    setProperties(Array.isArray(data.properties) ? data.properties : []);
                    setWives(Array.isArray(data.wives) ? data.wives : []);
                    setChildren(Array.isArray(data.children) ? data.children : []);
                } else {
                    setMessage("❌ فشل تحميل بيانات المستفيد.");
                }
            } catch (error) {
                setMessage("⚠️ فشل الاتصال بالخادم.");
            }
        };

        fetchBeneficiary();
    }, [id, token]);

    if (!beneficiary) {
        return <p>🔄 جاري تحميل البيانات...</p>;
    }

    // ✅ Handle Input Changes
    const handleChange = (e, section = "beneficiary") => {
        const { name, value } = e.target;
        if (section === "beneficiary") {
            setBeneficiary({ ...beneficiary, [name]: value });
        } else if (section === "work") {
            setWork({ ...work, [name]: value });
        } else if (section === "housing") {
            setHousing({ ...housing, [name]: value });
        }

    };


    // ✅ Handle Dynamic Fields (Properties, Wives, Children)
    // const handleArrayChange = (e, index, arrayName) => {
    //     const updatedArray = [...(arrayName === "properties" ? properties : arrayName === "wives" ? wives : children)];
    //     updatedArray[index][e.target.name] = e.target.value;
    //     if (arrayName === "properties") setProperties(updatedArray);
    //     if (arrayName === "wives") setWives(updatedArray);
    //     if (arrayName === "children") setChildren(updatedArray);
    // };

    const handleArrayChange = (e, index, arrayName, field = null) => {
        const { name, value, type } = e.target;
        const updatedArray = [...(arrayName === "properties" ? properties : arrayName === "wives" ? wives : children)];
    
        if (type === "radio") {
            updatedArray[index] = { ...updatedArray[index], [field]: value };
        } else {
            updatedArray[index][name] = value;
        }
    
        if (arrayName === "properties") setProperties(updatedArray);
        if (arrayName === "wives") setWives(updatedArray);
        if (arrayName === "children") setChildren(updatedArray);
    };
    const addProperty = () => setProperties([...properties, { property_type: "", property_value: "" }]);
    const addWife = () => setWives([...wives, { full_name: "", date_of_birth: "" }]);
    const addChild = () => setChildren([...children, { name: "", date_of_birth: "" }]);


     // ✅ Handle Update Submission (`PUT` Request)
    // const handleUpdate = async () => {

    //     console.log("🛠️ Sending Data:", JSON.stringify(beneficiary, work, housing, properties, wives, children , null, 2));

    //     try {
    //         const response = await fetch(`${baseUrl}/api/beneficiaries/${id}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             },
    //             body: JSON.stringify({ beneficiary, work, housing, properties, wives, children }),
    //         });

    //         if (response.ok) {
    //             setMessage("✅ تم تحديث البيانات بنجاح!");
    //             setTimeout(() => navigate(`/beneficiaries/${id}`), 2000);
    //         } else {
    //             const errorResult = await response.json();
    //             setMessage(`❌ فشل التحديث: ${errorResult.message}`);
    //         }
    //     } catch (error) {
    //         setMessage("⚠️ فشل الاتصال بالخادم.");
    //     }
    // };

    const handleUpdate = async () => {
        const formattedData = {
            beneficiary: {
                name: beneficiary.name,
                father_name: beneficiary.father_name,
                grandfather_name: beneficiary.grandfather_name,
                lastname: beneficiary.lastname,
                date_of_birth: beneficiary.date_of_birth,
                mothers_name: beneficiary.mothers_name,
                social_status: beneficiary.social_status,
                family_situation: beneficiary.family_situation,
                health_status: beneficiary.health_status,
                number_place_of_registration: beneficiary.number_place_of_registration,
                nationality: beneficiary.nationality,
                doctrine: beneficiary.doctrine,
                guarantor: beneficiary.guarantor,
                political_affiliation: beneficiary.political_affiliation,
                lineage: beneficiary.lineage,
                academic_level: beneficiary.academic_level,
                blood_type: beneficiary.blood_type,
                religious_commitment: beneficiary.religious_commitment,
                phone_number: beneficiary.phone_number,
                second_phone: beneficiary.second_phone,
                family_status: beneficiary.family_status,
                comments: beneficiary.comments
            },
            work: work ? {
                job_type: work.job_type,
                contract_type: work.contract_type,
                monthly_income: work.monthly_income
            } : null,
            housing: housing ? {
                city: housing.city,
                street: housing.street,
                building: housing.building,
                nature_of_housing: housing.nature_of_housing
            } : null,
            properties: properties.map(p => ({
                property_type: p.property_type,
                property_value: p.property_value
            })),
            wives: wives.map(w => ({
                full_name: w.full_name,
                place_of_birth: w.place_of_birth,
                date_of_birth: w.date_of_birth,
                religious_commitment: w.religious_commitment,
                doctrine: w.doctrine,
                lineage: w.lineage,
                academic_level: w.academic_level,
                type_of_work: w.type_of_work,
                monthly_income: w.monthly_income,
                health_status: w.health_status,
                guarantor: w.guarantor,
                blood_type: w.blood_type,
                property_type: w.property_type,
                property_value: w.property_value
            })),
            children: children.map(c => ({
                name: c.name,
                place_of_birth: c.place_of_birth,
                date_of_birth: c.date_of_birth,
                religious_commitment: c.religious_commitment,
                sex: c.sex,
                resident_in_house: c.resident_in_house,
                academic_level: c.academic_level,
                continues_studying: c.continues_studying,
                yearly_installment: c.yearly_installment,
                type_of_work: c.type_of_work,
                monthly_income: c.monthly_income,
                monthly_contribution: c.monthly_contribution,
                health_status: c.health_status,
                guarantor: c.guarantor,
                blood_type: c.blood_type
            }))
        };
    
        //console.log("🛠️ Sending Data:", JSON.stringify(formattedData, null, 2));
    
        try {
            const response = await fetch(`${baseUrl}/api/beneficiaries/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formattedData),
            });
    
            if (response.ok) {
                setMessage("✅ تم تحديث البيانات بنجاح!");
                setTimeout(() => navigate(`/beneficiaries/${id}`), 2000);
            } else {
                const errorResult = await response.json();
                setMessage(`❌ فشل التحديث: ${errorResult.message}`);
            }
        } catch (error) {
            setMessage("⚠️ فشل الاتصال بالخادم.");
        }
    };
    

    if (!beneficiary) {
        return <p>🔄 جاري تحميل البيانات...</p>; // Prevent rendering empty form
    }


    return(
    
    <div>

        {/* 
        ///////////////////////////
           BENEFICIARY INFO
        ///////////////////////////
        */}
         <h2>تحديث بيانات المستفيد</h2>

        {message && <p style={{ color: message.includes("✅") ? "green" : "red" }}>{message}</p>}

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
                <option value="أعزب">أعزب</option>
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
                        <input type="radio" name="religious_commitment" value="نعم" checked={beneficiary.religious_commitment === "نعم"} onChange={handleChange} required /> نعم
                    </label>
                    <label>
                        <input type="radio" name="religious_commitment" value="كلا" checked={beneficiary.religious_commitment === "كلا"} onChange={handleChange} required /> كلا
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

    {/* 
        ///////////////////////////
            WORK
        ///////////////////////////
        */}

    <table lang="ar" dir="rtl">
        <tbody>
        <tr>
            <th>نوع العمل:</th>
            <th><input type="text" name="job_type" value={work.job_type} onChange={(e) => handleChange(e, "work")} required /></th>
            <th>نوع العقد:</th>
            <th>
            <label>
                    <input type="radio" name="contract_type" value="مثبّت" checked={work.contract_type === "مثبّت"} onChange={(e) => handleChange(e, "work")} required /> مثبّت
                </label>
                <label>
                    <input type="radio" name="contract_type" value="متعاقد"checked={work.contract_type === "متعاقد"} onChange={(e) => handleChange(e, "work")} required /> متعاقد
                </label>
                <label>
                    <input type="radio" name="contract_type" value="مياوم" checked={work.contract_type === "مياوم"} onChange={(e) => handleChange(e, "work")} required /> مياوم
                </label>
            </th>
            <th>الدخل الشهري:</th>
            <th><input type="text" name="monthly_income" value={work.monthly_income} onChange={(e) => handleChange(e, "work")} required /></th>
        </tr>
        </tbody>
    </table>
    {/* 
        ///////////////////////////
            HOUSING
        ///////////////////////////
        */}

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
                    <input type="radio" name="nature_of_housing" value="ملك" checked={housing.nature_of_housing === "ملك"} onChange={handleChange} required /> ملك
                </label>
                <label>
                    <input type="radio" name="nature_of_housing" value="إيجار" checked={housing.nature_of_housing === "إيجار"}  onChange={handleChange} required /> إيجار
                </label>
                <label>
                    <input type="radio" name="nature_of_housing" value="إعارة" checked={housing.nature_of_housing === "إعارة"}  onChange={handleChange} required /> إعارة
                </label>
            </th>
        </tr>
        </tbody>
    </table>

    {/* 
        ///////////////////////////
            PROPERTIES
        ///////////////////////////
        */}

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

        {/* 
        ///////////////////////////
            WIVES
        ///////////////////////////
        */}
         {wives.map((wife, index) => (
            <div key={index}>
                <h3> {index + 1}</h3>
                <table lang="ar" dir="rtl">
                    <tbody>
                        <tr>
                            <th>الاسم:</th>
                            <th><input type="text" name="name" value={wife.full_name} onChange={(e) => handleChange(e, index)} required /></th>
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

        {/* 
        ///////////////////////////
            Children
        ///////////////////////////
        */}

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
                            <th><input type="text" name="date_of_birth" value={child.date_of_birth} onChange={(e) => handleChange(e, index)} required /></th>
                        </tr>
                        <tr>
                            <th>الجنس:</th>
                            <th><input type="text" name="sex" value={child.sex} onChange={(e) => handleChange(e, index)} required /></th>
                            <th>مقيم في المنزل:</th>
                            <th>
                                <label>
                                    <input type="radio" name={`resident_in_house_${index}`}  value="نعم" checked={child.resident_in_house === "نعم"} onChange={(e) => handleArrayChange(e, index, "children", "resident_in_house")} required /> نعم

                                </label>
                                <label>
                                    <input type="radio" name={`resident_in_house_${index}`}  value="كلا" checked={child.resident_in_house === "كلا"} onChange={(e) => handleArrayChange(e, index, "children", "resident_in_house")} required /> كلا
                                </label>
                            </th>
                            <th>الالتزام الديني:</th>
                            <th>
                                <label>
                                    <input type="radio" name={`religious_commitment_${index}`} value="نعم" checked={child.religious_commitment === "نعم"} onChange={(e) => handleArrayChange(e, index, "children", "religious_commitment")} required /> نعم
                                </label>
                                <label>
                                    <input type="radio" name={`religious_commitment_${index}`} value="كلا" checked={child.religious_commitment === "كلا"} onChange={(e) => handleArrayChange(e, index, "children", "religious_commitment")} required /> كلا
                                </label>
                            </th>
                        </tr>
                        <tr>
                            <th>المستوى الأكاديمي:</th>
                            <th><input type="text" name="academic_level" value={child.academic_level} onChange={(e) => handleChange(e, index)} required /></th>
                            <th>يواصل الدراسة:</th>
                            <th>
                                <label>
                                    <input type="radio" name={`continues_studying_${index}`} value="نعم" checked={child.continues_studying === "نعم"} onChange={(e) => handleArrayChange(e, index, "children", "continues_studying")} required /> نعم
                                </label>
                                <label>
                                    <input type="radio" name={`continues_studying_${index}`}  value="كلا" checked={child.continues_studying === "كلا"} onChange={(e) => handleArrayChange(e, index, "children", "continues_studying")} required /> كلا
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
        {/* ✅ Update Button */}
        <button onClick={handleUpdate}>💾 تحديث البيانات</button>
        
    </div>
    
    
        // closing the return bracket
    );


}
export default UpdateBeneficiary;