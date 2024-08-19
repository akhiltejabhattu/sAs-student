const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC8oZPrsCi3N43Dol9Gw06ABBk6l0uHEgA",
  authDomain: "smart-attendance-3b7cb.firebaseapp.com",
  projectId: "smart-attendance-3b7cb",
  storageBucket: "smart-attendance-3b7cb.appspot.com",
  messagingSenderId: "929770978031",
  appId: "1:929770978031:web:0bcdd11ea4d3c9fd88791a",
  measurementId: "G-5H2X64MDWS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to populate data
const populateData = async () => {
  try {
    // Define an array of student data
    const studentData = [
      { rollno: "23071A6667", password: "23071A6667@std" },
      { rollno: "23071A6668", password: "23071A6668@std" },
      { rollno: "23071A6669", password: "23071A6669@std" },
      { rollno: "23071A6670", password: "23071A6670@std" },
      { rollno: "23071A6671", password: "23071A6671@std" },
      { rollno: "23071A6672", password: "23071A6672@std" },
      { rollno: "23071A6673", password: "23071A6673@std" },
      { rollno: "23071A6674", password: "23071A6674@std" },
      { rollno: "23071A6675", password: "23071A6675@std" },
      { rollno: "23071A6676", password: "23071A6676@std" },
      { rollno: "23071A6677", password: "23071A6677@std" },
      { rollno: "23071A6678", password: "23071A6678@std" },
      { rollno: "23071A6680", password: "23071A6680@std" },
      { rollno: "23071A6681", password: "23071A6681@std" },
      { rollno: "23071A6682", password: "23071A6682@std" },
      { rollno: "23071A6683", password: "23071A6683@std" },
      { rollno: "23071A6684", password: "23071A6684@std" },
      { rollno: "23071A6685", password: "23071A6685@std" },
      { rollno: "23071A6686", password: "23071A6686@std" },
      { rollno: "23071A6687", password: "23071A6687@std" },
      { rollno: "23071A6688", password: "23071A6688@std" },
      { rollno: "23071A6689", password: "23071A6689@std" },
      { rollno: "23071A6690", password: "23071A6690@std" },
      { rollno: "23071A6691", password: "23071A6691@std" },
      { rollno: "23071A6692", password: "23071A6692@std" },
      { rollno: "23071A6693", password: "23071A6693@std" },
      { rollno: "23071A6694", password: "23071A6694@std" },
      { rollno: "23071A6695", password: "23071A6695@std" },
      { rollno: "23071A6696", password: "23071A6696@std" },
      { rollno: "23071A6697", password: "23071A6697@std" },
      { rollno: "23071A6698", password: "23071A6698@std" },
      { rollno: "23071A6699", password: "23071A6699@std" },
      { rollno: "23071A66A0", password: "23071A66A0@std" },
      { rollno: "23071A66A1", password: "23071A66A1@std" },
      { rollno: "23071A66A2", password: "23071A66A2@std" },
      { rollno: "23071A66A3", password: "23071A66A3@std" },
      { rollno: "23071A66A4", password: "23071A66A4@std" },
      { rollno: "23071A66A5", password: "23071A66A5@std" },
      { rollno: "23071A66A6", password: "23071A66A6@std" },
      { rollno: "23071A66A7", password: "23071A66A7@std" },
      { rollno: "23071A66A8", password: "23071A66A8@std" },
      { rollno: "23071A66A9", password: "23071A66A9@std" },
      { rollno: "23071A66B0", password: "23071A66B0@std" },
      { rollno: "23071A66B1", password: "23071A66B1@std" },
      { rollno: "23071A66B2", password: "23071A66B2@std" },
      { rollno: "23071A66B3", password: "23071A66B3@std" },
      { rollno: "23071A66B4", password: "23071A66B4@std" },
      { rollno: "23071A66B5", password: "23071A66B5@std" },
      { rollno: "23071A66B6", password: "23071A66B6@std" },
      { rollno: "23071A66B7", password: "23071A66B7@std" },
      { rollno: "23071A66B8", password: "23071A66B8@std" },
      { rollno: "23071A66B9", password: "23071A66B9@std" },
      { rollno: "23071A66C0", password: "23071A66C0@std" },
      { rollno: "23071A66C1", password: "23071A66C1@std" },
      { rollno: "23071A66C2", password: "23071A66C2@std" },
      { rollno: "23071A66C3", password: "23071A66C3@std" },
      { rollno: "23071A66C4", password: "23071A66C4@std" },
      { rollno: "23071A66C5", password: "23071A66C5@std" },
      { rollno: "23071A66C6", password: "23071A66C6@std" },
      { rollno: "23071A66C7", password: "23071A66C7@std" },
      { rollno: "23071A66C8", password: "23071A66C8@std" },
      { rollno: "23071A66C9", password: "23071A66C9@std" },
      { rollno: "23071A66D0", password: "23071A66D0@std" },
      { rollno: "23071A66D1", password: "23071A66D1@std" },
      { rollno: "21071A6669", password: "21071A6669@std" },
    ];


    // Add each student record to Firestore
    for (const [index, student] of studentData.entries()) {
      const studentRef = doc(db, "student", student.rollno);
      await setDoc(studentRef, { rollno: student.rollno, password: student.password });
      console.log(`Data for student${student.rollno} added successfully!`);
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

populateData();
