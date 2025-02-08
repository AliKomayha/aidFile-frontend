import { useState } from "react";
import StepBeneficiaryInfo from "./steps/stepBeneficiaryInfo";
import StepWork from "./steps/StepWork";
import StepHousing from "./steps/StepHousing";
import StepProperties from "./steps/StepProperties";
import StepWives from "./steps/stepWives";
import StepChildren from "./steps/stepChildren";
import StepReview from "./steps/StepReview";


function NewBeneficiary() {
    const [step, setStep] = useState(1);
    const [beneficiaryData, setBeneficiaryData] = useState({}); // store all data

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return(
        <div>
            <h2>إضافة مستفيد جديد</h2>

            {step === 1 && <StepBeneficiaryInfo nextStep={nextStep} setBeneficiaryData={setBeneficiaryData} />}
            {step === 2 && <StepWork nextStep={nextStep} prevStep={prevStep} setBeneficiaryData={setBeneficiaryData} />}
            {step === 3 && <StepHousing nextStep={nextStep} prevStep={prevStep} setBeneficiaryData={setBeneficiaryData} />}
            {step === 4 && <StepProperties nextStep={nextStep} prevStep={prevStep} setBeneficiaryData={setBeneficiaryData} />}
            {step === 5 && <StepWives nextStep={nextStep} prevStep={prevStep} setBeneficiaryData={setBeneficiaryData} />}
            {step === 6 && <StepChildren nextStep={nextStep} prevStep={prevStep} setBeneficiaryData={setBeneficiaryData} />}
            {step === 7 && <StepReview prevStep={prevStep} beneficiaryData={beneficiaryData} />}

        </div>
);

}

export default NewBeneficiary;