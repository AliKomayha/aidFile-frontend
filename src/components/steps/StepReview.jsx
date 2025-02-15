import { baseUrl } from "../../config";


function StepReview({ prevStep, beneficiaryData }) {

    const token = localStorage.getItem('auth_token');

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/beneficiaries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(beneficiaryData)
            });
    
            if (response.ok) {
                alert("تم تسجيل المستفيد بنجاح!");
            } else {
                alert("حدث خطأ أثناء التسجيل!");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };
    

    return (
        <div>
            <h3>مراجعة البيانات</h3>
            <pre>{JSON.stringify(beneficiaryData, null, 2)}</pre>
            

            <button onClick={prevStep}>السابق</button>
            <button onClick={handleSubmit}>إرسال البيانات</button>
        </div>
    );




}
export default StepReview;
