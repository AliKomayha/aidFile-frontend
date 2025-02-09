import { baseUrl } from "../../config";


function StepReview({ prevStep, beneficiaryData }) {

    const token = localStorage.getItem('auth_token');

    const handleSubmit = async (e) => {

        // alot to do here
        // creating missing controllers
        // creating responsible function
        // creating responsible route
    }

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
