import React, { useState } from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa"

const Input = ({ Value, onChange, Label, placeHolder, inputType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label>{Label}</label>
      <div className="input-box">
        <input
          type={
            inputType == "password" ? (showPassword ? "text" : "password") : inputType
          }
          placeholder={placeHolder}
          className="w-full bg-transparent outline-none"
          value={Value}
          onChange={(e)=>onChange(e)}
        />

        {
            inputType==="password" && (
                <>
                    {showPassword?(<FaRegEye
                        size={22}
                        className="text-primary cursor-pointer"
                        onClick={()=>toggleShowPassword()}
                    />):
                        (
                            <FaRegEyeSlash
                                size={22}
                                className="text-slate-400 cursor-pointer"
                                onClick={()=>{toggleShowPassword()}}
                            />
                        )
                    }
                </>
            )
        }
      </div>
    </div>
  );
};

export default Input;
