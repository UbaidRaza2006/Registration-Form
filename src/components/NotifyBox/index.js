import { useState } from 'react';

const NotifyBox = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (event) => {
    const formattedPhoneNumber = event.target.value.replace(/\D/g, ''); // Only digits allowed
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (phoneNumber) {
      alert(`You will be informed on: ${phoneNumber}`);
      setPhoneNumber('');
    }
  };

  const formatPhoneNumber = (input) => {
    const formattedNumber = input.replace(/\D/g, '').replace(/(\d{4})(\d{7})/, '$1-$2');
    return formattedNumber;
};

  const handleChange2 = (event) => {
    const inputValue = event.target.value

    if (inputValue.length <= 12) {
        const formattedPhone = formatPhoneNumber(inputValue);


        setPhoneNumber(formattedPhone)
    }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-inherit">
      <div className="mt-[-150px] bg-gray-100 rounded-[30px] shadow-2xl p-12 max-w-lg w-[90%] transform transition-all duration-500 hover:scale-105 hover:shadow-xl relative overflow-hidden">
        
        {/* Decorative Elements */}
  <div className="absolute -top-16 -right-16 w-[200px] h-[200px] bg-gradient-to-br from-[#81d3e0] to-[#39b0c7] rounded-full blur-xl opacity-40"></div>
  <div className="absolute -bottom-16 -left-16 w-[300px] h-[300px] bg-gradient-to-tr from-[#81d3e0] to-[#2e8c9c] rounded-full blur-xl opacity-35"></div>


        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center text-[#004d66] mb-6 tracking-wider">
          Stay Informed!
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 mb-8 font-medium leading-relaxed">
          Want to be the first to know when admissions open? Enter your phone number below and we'll keep you updated!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <input
            type="tel"
            id="phoneInput"
            maxLength="12"
            inputMode="numeric"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={handleChange2}
            className="w-full p-4 border-2 border-[#48a6b2] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#83e6f0] bg-gray-100 text-gray-700 font-bold text-2xl placeholder-gray-500 shadow-inner transition-all duration-300 transform hover:scale-105"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#56c8d8] to-[#48a6b2] text-white font-semibold py-4 rounded-full shadow-xl hover:shadow-2xl hover:from-[#48a6b2] hover:to-[#3c8a92] transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-110"
          >
            Notify Me!
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotifyBox;
