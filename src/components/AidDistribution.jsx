import { useState, useEffect } from "react";
import { baseUrl } from "../config";
import * as XLSX from "xlsx";


function AidDistribution(){

    const token = localStorage.getItem('auth_token');

    const [beneficiaries, setBeneficiaries]= useState([]);
    const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([]);
    const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
    const [aids, setAids] = useState([]);
    const [selectedAid, setSelectedAid] = useState("");
    const [unitValue, setUnitValue] = useState("");
    const [amount, setAmount] = useState("1");

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
        .then(beneficiaryData => {
          fetch(`${baseUrl}/api/aid-proc`, {
              headers: { "Authorization": `Bearer ${token}` }
          })
          .then(response => response.json())
          .then(statistics => {
          
            const enrichedData = beneficiaryData.map(b => {
              const stats = statistics.find(s => s.id === b.id) || {};
              return{
                ...b,
                job_type: b.work ? b.work.job_type : "غير متوفر",
                street: b.housing ? b.housing.street : "غير متوفر",
                //total_aids: stats.total_aids || 0, // ✅ Store total aids received
                total_aids: stats.total_aids !== undefined ? stats.total_aids : 0,
                last_aid_date: stats.last_aid_date || "لم يستلم" // ✅ Store last aid received date
              };
            });

            
            setBeneficiaries(enrichedData);
            setFilteredBeneficiaries(enrichedData);
          });
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

    //handle exporting 
    const exportToExcel = () => {
      const tableData = filteredBeneficiaries.map((b) => ({
        " إجمالي المساعدات": b.total_aids ?? "-",
        " تاريخ آخر مساعدة": b.last_aid_date ?? "-",
        " رقم الهاتف": b.phone_number || "-",
        " نوع العمل": b.job_type || "-",
        " الحي": b.street || "-",
        "وضع الأسرة": b.family_status || "-",
        " اسم الأم": b.mothers_name || "-",
        " الاسم الكامل": `${b.name} ${b.father_name} ${b.lastname}`,
      }));

      //const worksheet = XLSX.utils.json_to_sheet(filteredBeneficiaries);
      const worksheet = XLSX.utils.json_to_sheet(tableData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Beneficiaries");

      // Download the Excel file
      XLSX.writeFile(workbook, "Beneficiaries.xlsx");
    };

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
      
      <br />
      <br />
      <br />  
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

      <br />
        <h4> تقديم مساعدة</h4>

      <table>
        <tbody>
            <tr>
            <th colSpan = "5">
              {/* Aid Details */}
              <select onChange={(e) => setSelectedAid(e.target.value)}>
                  <option value="">🎁 نوع المساعدة</option>
                    {aids.map((aid) => (
                        <option key={aid.id} value={aid.id}>
                            {aid.type}
                        </option>
                    ))}
              </select>
            </th>
          </tr>
          <tr>
          <th><button onClick={handleDistributeAid}>🚀 توزيع</button> <button onClick={exportToExcel}>📥 تصدير إلى Excel</button></th>
            <th><input type="number" value={unitValue} onChange={(e) => setUnitValue(e.target.value)} /> </th>

            <th>: القيمة</th>
          
          
              <th>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </th>
              <th>: الكمية</th>

              
          </tr>  
          
        </tbody>
      </table>

      {/* Beneficiaries List */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>✔️</th>
            <th>📦 إجمالي المساعدات</th>
            <th>📅 تاريخ آخر مساعدة</th> 
            <th>رقم الهاتف</th>
            <th>الوضع الاجتماعي</th>
            <th>الوضع العائلي</th>
            <th>نوع العمل</th>
            <th>الحي</th>
            <th>وضع الأسرة</th>
            <th>اسم الأم</th>
            <th>الاسم الكامل</th>
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
              <td>{b.total_aids ?? "-"}</td> {/* ✅ Display total aids received */}
              <td>{b.last_aid_date ?? "-"}</td> {/* ✅ Display last aid received date */}
              <td>{b.phone_number || "-"}</td>
              <td>{b.social_status || "-"}</td>
              <td>{b.family_situation || "-"}</td>
              <td>{b.job_type || "-"}</td>
              <td>{b.street || "-"}</td>
              <td>{b.family_status || "-"}</td>
              <td>{b.mothers_name || "-"}</td>
              <td>{b.name} {b.father_name} {b.lastname}</td>
                        
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );


}

export default AidDistribution;