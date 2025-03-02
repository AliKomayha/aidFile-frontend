import { useState } from "react";
import { baseUrl } from "../../config";

const styles = {  
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
    },
    reviewBox: {
        display: "grid",
        gridTemplateColumns: "repeat(4 , 1fr)", // Two columns layout
        gap: "15px",
        width: "80%",
        padding: "15px",
        border: "2px solid blue",
        borderRadius: "8px",
    },
    section: {
        border: "2px solid blue",
        padding: "10px",
        borderRadius: "5px",
        minHeight: "180px",
        textAlign: "right",
        paddingRight: "10px",
    },
    header: {
        width: "80%",
        backgroundColor: "#A9B5DF",
        padding: "20px",
        color: "#2D336B",
        textAlign: "center",
        borderRadius: "5px",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        width: "80%",
        marginTop: "15px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    submitButton: {
        backgroundColor: "green",
        color: "white",
        border: "none",
    },
    backButton: {
        backgroundColor: "red",
        color: "white",
        border: "none",
    }
};

function StepReview({ prevStep, beneficiaryData }) {
    const token = localStorage.getItem("auth_token");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        setMessage("");

        //console.log("🛠️ Sending Data:", JSON.stringify(beneficiaryData, null, 2));

        try {
            const response = await fetch(`${baseUrl}/api/beneficiaries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(beneficiaryData),
            });

            if (response.ok) {
                setMessage("✅ تم تسجيل المستفيد بنجاح!");
            } else {
                const errorResult = await response.json();
                console.error("🛠️ API Error:", errorResult);
                setMessage("❌ حدث خطأ أثناء التسجيل!");
            }
        } catch (error) {
            console.error("🛠️ Network/Server Error:", error);
            setMessage("⚠️ فشل الاتصال بالخادم.");
        }

        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>مراجعة البيانات قبل الإرسال</div>

            {message && <p style={{ color: message.includes("✅") ? "green" : "red" }}>{message}</p>}

            <div style={styles.reviewBox}>

                {/* Beneficiary Info */}
                <div style={styles.section}>
                    <h3>👤 معلومات المستفيد</h3>
                    {Object.entries(beneficiaryData.beneficiary || {}).map(([key, value]) => (
                        <p key={key}><strong>{key.replace(/_/g, " ")}:</strong> {value || " "}</p>
                    ))}
                </div>

                {/* Work Info */}
                <div style={styles.section}>
                    <h3>💼 معلومات العمل</h3>
                    {Object.entries(beneficiaryData.work || {}).map(([key, value]) => (
                        <p key={key}><strong>{key.replace(/_/g, " ")}:</strong> {value || " "}</p>
                    ))}
                </div>

                {/* Housing Info */}
                <div style={styles.section}>
                    <h3>🏠 معلومات السكن</h3>
                    {Object.entries(beneficiaryData.housing || {}).map(([key, value]) => (
                        <p key={key}><strong>{key.replace(/_/g, " ")}:</strong> {value || " "}</p>
                    ))}
                </div>

                {/* Properties */}
                {beneficiaryData.properties?.length > 0 && (
                    <div style={styles.section}>
                        <h3>🏡 الممتلكات</h3>
                        {beneficiaryData.properties.map((property, index) => (
                            <p key={index}><strong>نوع الممتلك:</strong> {property.property_type}</p>
                        ))}
                    </div>
                )}

                {/* Wives Info */}
                {beneficiaryData.wives?.length > 0 && (
                    <div style={styles.section}>
                        <h3>💍 معلومات الزوجات</h3>
                        {beneficiaryData.wives.map((wife, index) => (
                            <div key={index}>
                                {Object.entries(wife).map(([key, value]) => (
                                    <p key={`${key}-${index}`}><strong>{key.replace(/_/g, " ")}:</strong> {value || " "}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                {/* Children Info */}
                {beneficiaryData.children?.length > 0 && (
                    <div style={styles.section}>
                        <h3>👶 معلومات الأطفال</h3>
                        {beneficiaryData.children.map((child, index) => (
                            <div key={index}>
                                {Object.entries(child).map(([key, value]) => (
                                    <p key={`${key}-${index}`}><strong>{key.replace(/_/g, " ")}:</strong> {value || " "}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

            </div>

            <div style={styles.buttonContainer}>
                <button style={{ ...styles.button, ...styles.backButton }} onClick={prevStep}>🔙 السابق</button>
                <button style={{ ...styles.button, ...styles.submitButton }} onClick={handleSubmit} disabled={loading}>
                    {loading ? "جارٍ الإرسال..." : "📤 إرسال البيانات"}
                </button>
            </div>
        </div>
    );
}

export default StepReview;
