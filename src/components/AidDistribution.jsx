import { useState, useEffect } from "react";
import { baseUrl } from "../config";


function AidDistribution(){

    const token = localStorage.getItem('auth_token');

    const [beneficiaries, setBeneficiaries]= useState([]);
    const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([]);
    const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
    const [aids, setAids] = useState([]);
    const [selectedAid, setSelectedAid] = useState("");
    const [unitValue, setUnitValue] = useState("");
    const [amount, setAmount] = useState("");

    const [filters, setFilters] = useState({
        search: "",
        housingStreet: "",
        familyStatus: "",
        socialStatus: "",
        jobType: "",

    });
 
      // Fetch all beneficiaries from backend
    useEffect(() => {
        fetch(`${baseUrl}/api/beneficiaries`, {
        headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => response.json())
        
        .then(data => {
            
            const enrichedData = data.map((b) => ({
                ...b,
                job_type: b.work ? b.work.job_type : "غير متوفر",
                street: b.housing ? b.housing.street : "غير متوفر",
            }));

            setBeneficiaries(enrichedData);
            setFilteredBeneficiaries(enrichedData);
        })
        .catch(error => console.error("Error fetching beneficiaries:", error));

        // Fetch Aid Types
        fetch(`${baseUrl}/api/aids`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((data) => setAids(data))
          .catch((error) => console.error("Error fetching aids:", error));

        }, []);
    

    // Handle filtering
    useEffect(() => {
        let filtered = beneficiaries.filter(
        (b) =>
            b.name.includes(filters.search) ||
            b.father_name.includes(filters.search) ||
            b.lastname.includes(filters.search) ||
            b.phone_number.includes(filters.search)
        );
        
        if (filters.housingStreet) filtered = filtered.filter((b) => b.street === filters.housingStreet);
        if (filters.familyStatus) filtered = filtered.filter((b) => b.family_status === filters.familyStatus);
        if (filters.socialStatus) filtered = filtered.filter((b) => b.social_status === filters.socialStatus);
        if (filters.jobType) filtered = filtered.filter((b) => b.job_type === filters.jobType);

        setFilteredBeneficiaries(filtered);
    }, [filters, beneficiaries]);

    // Handle checkbox selection
    const toggleSelectBeneficiary = (id) => {
        setSelectedBeneficiaries((prev) =>
            prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
        );
    };

  // Handle aid distribution submission
  const handleDistributeAid = async () => {
    
    if (!selectedAid || !unitValue || !amount || selectedBeneficiaries.length === 0) {
      alert("يرجى إدخال جميع التفاصيل واختيار المستفيدين.");
      return;
    }

    const formattedDate = new Date().toISOString().split('T')[0];

    const payload = selectedBeneficiaries.map((beneficiaryId) => ({
      Aid_ID: selectedAid,
      Beneficiary_ID: beneficiaryId,
      date_given: formattedDate,
      unit_value: unitValue,
      amount: amount,
    }));

    
    console.log("🛠️ Sending Data:", JSON.stringify(payload, null, 2));

    //
    const response = await fetch(`${baseUrl}/api/aid-distributions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },

      body: JSON.stringify(payload),
      
    });
    

    if (response.ok) {
      alert("✅ تم توزيع المساعدات بنجاح!");
    } else {
      alert("❌ فشل توزيع المساعدات.");
    }
  };



  return (
    <div>
      <h2>توزيع المساعدات</h2>

      {/* Filters */}
      <input
        type="text"
        placeholder="🔍 بحث بالاسم أو الهاتف"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      <select onChange={(e) => setFilters({ ...filters, housingStreet: e.target.value })}>
        <option value="">🏠 تصفية حسب الشارع</option>
        {[...new Set(beneficiaries.map((b) => b.housing?.street))].map(street =>
          street ? <option key={street} value={street}>{street}</option> : null
        )}
      </select>

      <select onChange={(e) => setFilters({ ...filters, familyStatus: e.target.value })}>
        <option value="">👨‍👩‍👧‍👦 تصفية حسب وضع الأسرة</option>
        {['عادي', 'ميسور', 'فقير', 'مستضعف', 'أيتام', 'أيتام الشهداء'].map(status =>
          <option key={status} value={status}>{status}</option>
        )}
      </select>


      {/* Aid Details */}
      <select onChange={(e) => setSelectedAid(e.target.value)}>
          <option value="">🎁 نوع المساعدة</option>
          {aids.map((aid) => (
              <option key={aid.id} value={aid.id}>
                  {aid.type}
              </option>
          ))}
      </select>

      <input
        type="number"
        placeholder="💰 القيمة"
        value={unitValue}
        onChange={(e) => setUnitValue(e.target.value)}
      />
      <input
        type="number"
        placeholder="🔢 الكمية"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Beneficiaries List */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>✔️</th>
            <th>الاسم الكامل</th>
            <th>اسم الأم</th>
            <th>وضع الأسرة</th>
            <th>الشارع</th>
            <th>نوع العمل</th>
            <th>وضع العائلة</th>
            <th>الوضع الاجتماعي</th>
            <th>رقم الهاتف</th>
          </tr>
        </thead>
        <tbody>
          {filteredBeneficiaries.map((b) => (
            <tr key={b.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedBeneficiaries.includes(b.id)}
                  onChange={() => toggleSelectBeneficiary(b.id)}
                />
              </td>
              <td>{b.name} {b.father_name} {b.lastname}</td>
              <td>{b.mothers_name}</td>
              <td>{b.family_status}</td>
              <td>{b.street}</td>
              <td>{b.job_type}</td>
              <td>{b.family_situation}</td>
              <td>{b.social_status}</td>
              <td>{b.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleDistributeAid}>🚀 توزيع</button>
    </div>
  );


}

export default AidDistribution;