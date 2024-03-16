import { Input } from 'antd';

export default function InputComponent({ label, onChange, value,oninput, type, placeholder, inputMode ,classname,id},ref) {

    return (
        <div className="relative h-14">
            <p className="pt-0 pr-2 pb-0 pl-2 absolute mt-[-22px] mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">{label}</p>
            <Input
            id={id}
            ref={ref}
                placeholder={placeholder}
                type={type || "text"}
                value={value}
                onChange={onChange}
                inputMode={inputMode}
                className="h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-white"
                oninput={oninput}
                
            />
        </div>
    

    )
}