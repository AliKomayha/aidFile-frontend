import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';

function Beneficiaries() {
    
    const navigate = useNavigate();
    const token = localStorage.getItem('auth_token');

    const [beneficiaries, setBeneficiaries]= useState([]);
    const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([]);
  
    

    const [filters, setFilters] = useState({
        search: "",
        housingStreet: "",
        familyStatus: "",
        socialStatus: "",
        jobType: "",

    });
 
      // Fetch all beneficiaries from backend
    useEffect(() => {fetch(`${baseUrl}/api/beneficiaries`, {
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

    
    const viewBeneficiary = (id) => {
        navigate(`/beneficiary/${id}`);
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

      

      {/* Beneficiaries List */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th><button onClick={() => navigate('/stats')}>Stats</button></th>
            <th>رقم الهاتف</th>
            <th>الوضع الاجتماعي</th>
            <th>وضع العائلة</th>
            
            <th>الشارع</th>
            <th>وضع الأسرة</th>
            <th>اسم الأم</th>
            <th>الاسم الكامل</th>
          </tr>
        </thead>
        <tbody>
          {filteredBeneficiaries.map((b) => (
            <tr key={b.id}>
              <td>
              <button onClick={() => viewBeneficiary(b.id)}>
                    عرض
                </button>
              </td>
              <td>{b.phone_number || "-"}</td>
              <td>{b.social_status || "-"}</td>
              <td>{b.family_situation || "-"}</td>
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

export default Beneficiaries;
