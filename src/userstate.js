import { useState } from 'react';

const Userstate = () => {
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [category, setCategory] = useState('');

    const states = [
      { name: 'Andra Pradesh', districts: ['Alluri Sitharama Raju', 'Anakapalli', 'Ananthapuramu', 'Annamayya', 'Bapatla', 'Chittoor', 'Dr. B.R. Ambedkar Konaseema', 'East Godavari', 'Eluru', 'Guntur', 'Kakinada', 'Krishna', 'Kurnool', 'Nandyal', 'Ntr', 'Palnadu', 'Parvathipuram Manyam', 'Prakasam', 'Sri Potti Sriramulu Nellore', 'Sri Sathya Sai', 'Srikakulam', 'Tirupati', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'Y.S.R.'] },
      { name: 'Arunachal Pradesh', districts: ['Tawang', 'West Kameng', 'Bichom', 'East Kameng', 'Pakke-Kessang', 'Kurung Kumey', 'Papum Pare', 'Itanagar', 'Kra Daadi', 'Lower Subansiri', 'Kamle', 'Keyi Panyor', 'Upper Subansiri','Shi-Yomi', 'West Siang', 'Siang', 'Lower Siang', 'Lepa-Rada', 'Upper Siang', 'East Siang', 'Dibang Valley', 'Lower Dibang Valley', 'Lohit', 'Anjaw', 'Namsai', 'Changlang','Tirap', 'Longding'] },
      { name: 'Assam', districts: ['Baksa', 'Bajali', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup Metropolitan', 'Kamrup', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tamulpur', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'] },
      { name: 'Bihar', districts: ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Khagaria', 'Kishanganj', 'Kaimur', 'Katihar', 'Lakhisarai', 'Madhubani', 'Munger', 'Madhepura', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Sheohar', 'Sheikhpura', 'Saran', 'Sitamarhi', 'Supaul', 'Siwan', 'Vaishali', 'West Champaran'] },
      { name: 'Chhattisgarh', districts: ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurella-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Khairagarh-Chhuikhadan-Gandai', 'Korba', 'Koriya', 'Mahasamund', 'Manendragarh-Chirmiri-Bharatpur', 'Mohla-Manpur- Ambagarh Chowki', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sarangarh-Bilaigarh', 'Sakti', 'Sukma', 'Surajpur', 'Surguja'] },
      { name: 'Goa', districts: ['North Goa', 'South Goa'] },
      { name: 'Gujarat', districts: ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhumi Dwarka', 'Gandhinagar','Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'] },
      { name: 'Haryana', districts: ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'] },
      { name: 'Himachal Pradesh', districts: ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'] },
      { name: 'Jharkhand', districts: ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti','Kodarma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Saraikela-Kharsawan', 'Simdega', 'West Singhbhum'] },
      { name: 'Karnataka', districts: ['Bagalkote', 'Bengaluru Urban', 'Bengaluru Rural', 'Belagavi', 'Ballari', 'Bidar', 'Vijayapura', 'Chamarajanagar', 'Chikkaballapura', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Kalaburagi', 'Hassan', 'Haveri', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayanagara', 'Yadgiri'] },
      { name: 'Kerala', districts: ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'] },
      { name: 'Madhya Pradesh', districts: ['Bhopal', 'Raisen', 'Rajgarh', 'Sehore', 'Vidisha', 'Morena', 'Sheopur', 'Bhind', 'Gwalior', 'Ashoknagar', 'Shivpuri', 'Datia', 'Guna', 'Alirajpur', 'Barwani', 'Burhanpur', 'Indore', 'Dhar', 'Jhabua', 'Khandwa', 'Khargone', 'Balaghat', 'Chhindwara', 'Jabalpur', 'Katni', 'Mandla', 'Narsinghpur', 'Seoni', 'Dindori', 'Pandhurna', 'Betul', 'Harda', 'Narmadapuram', 'Rewa', 'Satna', 'Sidhi', 'Singrauli', 'Mauganj', 'Maihar', 'Chhatarpur', 'Damoh', 'Panna', 'Sagar', 'Tikamgarh', 'Niwari', 'Anuppur', 'Shahdol', 'Umaria', 'Agar Malwa', 'Dewas', 'Mandsaur', 'Neemuch', 'Ratlam', 'Shajapur', 'Ujjain'] },
      { name: 'Maharashtra', districts: ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dharashiv', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'] },
      { name: 'Manipur', districts: ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal'] },
      { name: 'Meghalaya', districts: ['North Garo Hills', 'East Garo Hills', 'South Garo Hills', 'West Garo Hills', 'South West Garo Hills', 'West Jaintia Hills', 'East Jaintia Hills', 'East Khasi Hills', 'West Khasi Hills', 'South West Khasi Hills', 'Eastern West Khasi Hills', 'Ri-Bhoi'] },
      { name: 'Mizoram', districts: ['Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Saitual', 'Serchhip'] },
      { name: 'Nagaland', districts: ['Chümoukedima District', 'Dimapur District', 'Kiphire District', 'Kohima District', 'Longleng District', 'Mokokchung District', 'Mon District', 'Niuland District', 'Noklak District', 'Peren District', 'Phek District', 'Shamator District', 'Tseminyü District', 'Tuensang District', 'Wokha District', 'Zünheboto District'] },
      { name: 'Odisha', districts: ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Debagarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghapur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'] },
      { name: 'Punjab', districts: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Firozpur', 'Fazilka', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Malerkotla', 'Mansa', 'Moga', 'Sri Muktsar Sahib', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 'Sangrur', 'Shaheed Bhagat Singh Nagar', 'Tarn Taran'] },
      { name: 'Rajasthan', districts: ['Anupgarh', 'Ajmer', 'Alwar', 'Balotra', 'Banswara', 'Baran', 'Barmer', 'Beawar', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur', 'Dudu', 'Deeg', 'Didwana-Kuchaman', 'Gangapur', 'Jaipur Rural', 'Jodhpur Rural', 'Kekri', 'Khairthal Tijara', 'Kotputli Behror', 'Neem ka Thana', 'Phalodi', 'Sanchore', 'Salumbar', 'Shahpura', 'Jaipur', 'Jodhpur'] },
      { name: 'Sikkim', districts: ['Gangtok', 'Mangan', 'Pakyong', 'Soreng', 'Namchi', 'Gyalshing'] },
      { name: 'Tamil Nadu', districts: ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', '	Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'] },
      { name: 'Telangana', districts: ['Adilabad', 'Kumuram Bheem Asifabad', 'Mancherial', 'Nirmal', 'Nizamabad', 'Jagtial', 'Peddapalli', 'Kamareddy', 'Rajanna Sircilla', 'Karimnagar', 'Jayashankar Bhupalpally', 'Sangareddy', 'Medak', 'Siddipet', 'Jangaon', 'Hanamkonda', 'Warangal', 'Mulugu', 'Bhadradri kothagudem', 'Khammam', 'Mahabubabad', 'Suryapet', 'Nalgonda', 'Yadadri Bhuvanagiri', 'Medchal Malkajgiri', 'Hyderabad', 'Ranga Reddy', 'Vikarabad', 'Narayanpet', 'Mahabubnagar', 'Nagarkurnool', 'Wanaparthy', 'Jogulamba Gadwal'] },
      { name: 'Tripura', districts: ['Dhalai', 'Gomati', 'Khowai', 'Sipahijala', 'Unakoti', 'North Tripura', 'South Tripura', 'West Tripura'] },
      { name: 'Uttar Pradesh', districts: ['Agra', 'Aligarh', 'Ambedkar Nagar', 'Ayodhya', 'Amethi', 'Amroha', 'Auraiya', 'Azamgarh', 'Badaun', 'Bagpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bijnor', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kushinagar', 'Lakhimpur Kheri', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Prayagraj', 'Rae Bareli', 'Rampur', 'Saharanpur', 'Sant Kabir Nagar', 'Sant Ravidas Nagar', 'Sambhal', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'] },
      { name: 'Uttarakhand', districts: ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'] },
      { name: 'West Bengal', districts: ['Alipurduar', 'Bankura', 'Paschim Bardhaman', 'Purba Bardhaman', 'Birbhum', 'Cooch Behar', 'Darjeeling', 'Dakshin Dinajpur', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kolkata', 'Kalimpong', 'Malda', 'Paschim Medinipur', 'Purba Medinipur', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'South 24 Parganas', 'Purulia', 'Uttar Dinajpur'] },
    ];

    const categories = ['Business', 'General', 'Jobs', 'Realestate', 'Sales', 'Service', 'Tolet'];



        const handleStateChange = (event) => {
          setState(event.target.value);
          setDistrict(''); // Reset district when state changes
        };
      
        const handleDistrictChange = (event) => {
          setDistrict(event.target.value);
        };
        
        const handleCategoryChange = (event) => {
            setCategory(event.target.value);
          };

        return {
          states,
          state,
          setState,
          district,
          setDistrict,
          category,
          setCategory,
          categories,
          handleStateChange,
          handleDistrictChange,
          handleCategoryChange,
        };
      };
      
  export default Userstate;
