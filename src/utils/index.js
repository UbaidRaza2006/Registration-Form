export const RegistartionformControls = [
    {
      id: "fullName",
      type: "text",
      placeholder: "Full name",
      label: "Full Name",
      componentType: "input",
      inputmode:"",
      classname:" h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4  mr-0 ml-0 text-base block bg-white"
    },
    {
      id: "fatherName",
      type: "text",
      placeholder: "Father Name",
      label: "Father Name",
      componentType: "input",
      inputmode:"",
      classname:"h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-white"
    },
    {
      id: "email",
      type: "text",
      placeholder: "Email",
      label: "Email",
      componentType: "input",
      inputmode:"",
      classname:"h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-white"
    },
    
    {
      id: "city",
      type: "text",
      placeholder: "City",
      label: "City",
      componentType: "input",
      inputmode:"",
      classname:"h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-white"
    },

    {
        id: "cnic",
        type: "text",
        placeholder: "00000-0000000-0",
  label: "Cnic/B-form",
      
      componentType: "input",
  inputmode:"numeric",
  classname:"h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-white"
},
{
    id: "phone",
    type: "text",
    placeholder: "0000-0000000",
    label: "Phone",
      componentType: "input",
    inputmode:"numeric",
    classname:"h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-white"
},
{
  id: "dateOfBirth",
  type: "date",
  placeholder: "Date of Birth",
  label: "Date of Birth",
      componentType: "input",
  inputmode:"",
      classname:"h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-white"
},
    {
      id: "gender",
      type: "",
      placeholder: "",
      label: "Gender",
      componentType: "select",
      inputmode:"",
      options: [
        {
          id: "male",
          label: "Male",
        },
        {
          id: "female",
          label: "Female",
        },
    ],
    classname:"border focus:outline-none focus:border-black w-full placeholder-gray-400 text-base block bg-white pt-4 pr-4 pb-4 pl-4 mt-0 mr-0 ml-0 border-gary-300 rounded-md h-4"
},
    {
      id: "qualification",
      type: "text",
      placeholder: "Qualification",
      label: "Qualification",
      componentType: "input",
      inputmode:"",
      classname:"h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-white"
    },
    {
        id: "address",
        type: "text",
        placeholder: "Address",
        label: "Address",
      componentType: "input",
        inputmode:"",
        classname:"h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-white"
      },
    ];

export const courseOptions=[
      {
        id: "Web and App Development",
        label: "Web and App Development",
      },
      {
        id: "Web and App Development1",
        label: "Web and App Development1",
      }
    ]

   export const batchOptions=["1"]


   export const firebaseConfig = {
      apiKey: "AIzaSyBWJoirQlQQ77gSFxyLsG2-U3f-rx3qNmY",
      authDomain: "sir-rizwan-registration.firebaseapp.com",
      projectId: "sir-rizwan-registration",
      storageBucket: "sir-rizwan-registration.appspot.com",
      messagingSenderId: "804789853170",
      appId: "1:804789853170:web:05ecfcb699bc61cc18a96b",
      measurementId: "G-BV7G3WF57Y"
    };
  export const firebaseStorageURL= 'gs://sir-rizwan-registration.appspot.com'


    
    
    