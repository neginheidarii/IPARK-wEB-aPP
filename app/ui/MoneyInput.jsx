import React, { useState, useEffect } from 'react';
import {NumericFormat} from "react-number-format";

function MoneyInput({ error, value, setValue, className }) {

    return (
        <div className={`flex flex-col ${className}`}>
            <div className={`bg-[#f4f4f5] rounded-xl px-4 py-2`}>
                <h1 className={`text-xs text-gray-600 `}>Amount</h1>
                <div className={'flex space-x-1'}>
                    <span>$</span>
                    <NumericFormat placeholder={'10.00'} value={value} onValueChange={(values) => {
                        setValue(values.formattedValue)
                    }} className={`rounded-lg text-black`} decimalScale={2}
                                   fixedDecimalScale
                                   style={{outline: 'none', background: 'none'}}/>
                </div>
            </div>
            <span className={`text-xs px-1 ${error ? 'text-[#F5427A]' : ''}`}>{error}</span>
        </div>

    );
}

export default MoneyInput;
