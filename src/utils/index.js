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
    // {
    //   id: "category",
    //   type: "",
    //   placeholder: "",
    //   label: "Category",
    //   componentType: "select",
    //   options: [
    //     {
    //       id: "men",
    //       label: "Men",
    //     },
    //     {
    //       id: "women",
    //       label: "Women",
    //     },
    //     {
    //       id: "kids",
    //       label: "Kids",
    //     },
    //   ],
    // },
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


    
    
    
    

//   {RegistartionformControls.map((item) =>item.componentType === "input" && item.id === "fatherName" || item.id === "fullName" || item.id === "email" || item.id === "city" || item.id === "cnic" || item.id === "phone" || item.id === "dateOfBirth"?item.id === "cnic"?(<InputComponent
//                                 type={item.type}
//                                 id='cnicInput'
//                                 placeholder={item.placeholder}
//                                 label={item.label}
//                                 inputMode={item.inputmode}
//                                 maxlength='15'
//                                 className={item.classname}
//                                 oninput={formatCnicNumber()}
//                                 value={formData[item.id]}
//                                 onChange={(event) => {
//                                     setFormData({
//                                         ...formData,
//                                         [item.id]: event.target.value
//                                     });
//                                 }}
//                             />):item.id === "phone"?(
//                                 <InputComponent
//                                 type={item.type}
//                                 id='phoneInput'
//                                 placeholder={item.placeholder}
//                                 label={item.label}
//                                 inputMode={item.inputmode}
//                                 maxlength='12'
//                                 className={item.classname}
//                                 oninput={formatPhoneNumber()}
//                                 value={formData[item.id]}
//                                 onChange={(event) => {
//                                     setFormData({
//                                         ...formData,
//                                         [item.id]: event.target.value
//                                     });
//                                 }}
//                             />
//                             ):
//                          (
//                             <InputComponent
//                                 type={item.type}
//                                 placeholder={item.placeholder}
//                                 label={item.label}
//                                 inputMode={item.inputmode}
//                                 className={item.classname}
//                                 oninput={item.oninput}
//                                 value={formData[item.id]}
//                                 onChange={(event) => {
//                                     setFormData({
//                                         ...formData,
//                                         [item.id]: event.target.value
//                                     });
//                                 }}
//                             />
//                         ) 
                        
//                         : item.componentType === "select" ? (
//                             <SelectComponent
//                                 label={item.label}
//                                 options={item.options}
//                                 className={item.classname}
//                                 value={formData[item.id]}
//                                 onChange={(event) => {
//                                     setFormData({
//                                         ...formData,
//                                         [item.id]: event.target.value,
//                                     });
//                                 }}
//                             />
//                         ) : null

//                     )}
//                     </div>


//                     <div className="w-full mt-8 mr-0 mb-0 ml-0 space-y-8">               {RegistartionformControls.map((item)=>item.componentType === "input" && item.id === "qualification" || item.id === "address"  ?(

// <InputComponent

//     type={item.type}
//     placeholder={item.placeholder}
//     label={item.label}
//     inputMode={item.inputmode}
//     className={item.classname}
//     value={formData[item.id]}
//     onChange={(event) => {
//         setFormData({
//             ...formData,
//             [item.id]: event.target.value
//         });
//     }}
// />

// )
// :null
// )}