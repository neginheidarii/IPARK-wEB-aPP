"use client"
import React, {useEffect, useState} from "react";
import {cn, Input, Switch} from "@nextui-org/react";
import {PatternFormat} from "react-number-format";

const CardEntry = ({ cardData, setCardData, errors, setErrors }) => {
    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [saveCard, setSaveCard] = React.useState(false);

    useEffect(() => {
        setCardData({ ...cardData, saveCard });
    }, [saveCard]);

    useEffect(() => {
        setErrors({...errors, nameOnCard: null})
        setCardData({...cardData, nameOnCard});
    }, [nameOnCard]);

    useEffect(() => {
        setErrors({...errors, cardNumber: null})
        setCardData({...cardData, cardNumber});
    }, [cardNumber]);

    useEffect(() => {
        setErrors({...errors, month: null})
        setCardData({...cardData, month});
    }, [month]);

    useEffect(() => {
        setErrors({...errors, year: null})
        setCardData({...cardData, year});
    }, [year]);

    useEffect(() => {
        setErrors({...errors, cvv: null})
        setCardData({...cardData, cvv});
    }, [cvv]);

    return (
        <form className={'py-4 space-y-2'}>
            <Input value={cardData.nameOnCard} onValueChange={setNameOnCard} label={'Name On Card'} placeholder={'John Doe'} className={`${errors.nameOnCard ? 'rounded-xl border border-red-400 shadow-sm shadow-red-400' : ''}`} />
            <div className={`bg-[#f4f4f5] rounded-xl px-4 py-2 ${errors.cardNumber ? 'rounded-xl border border-red-400 shadow-sm shadow-red-400' : ''}`}>
                <h1 className={'text-xs text-gray-600'}>Card Number</h1>
                <PatternFormat onValueChange={(values) => {
                    setCardNumber(values.value)
                }} style={{outline: 'none', width: '100%'}} value={cardData.cardNumber} placeholder={'1234 1234 1234 1234'} className={'bg-[#f4f4f5]'} valueIsNumericString format="#### #### #### ####"/>
            </div>
            <div className={'flex space-between space-x-2'}>
                <section>
                    <div className={`bg-[#f4f4f5] rounded-xl px-4 py-2 w-auto ${errors.month ? 'rounded-xl border border-red-400 shadow-sm shadow-red-400' : ''}`}>
                        <h1 className={'text-xs text-gray-600'}>Month</h1>
                        <PatternFormat onValueChange={(values) => {
                            setMonth(values.value)
                        }} style={{outline: 'none', width: '100%'}} value={cardData.month} className={'bg-[#f4f4f5]'} placeholder={'01'}
                                       valueIsNumericString
                                       format="##"/>
                    </div>
                </section>
                <section>
                    <div className={`bg-[#f4f4f5] rounded-xl px-4 py-2 w-auto ${errors.year ? 'rounded-xl border border-red-400 shadow-sm shadow-red-400' : ''}`}>
                        <h1 className={'text-xs text-gray-600'}>Year</h1>
                        <PatternFormat onValueChange={(values) => {
                            setYear(values.value)
                        }} style={{outline: 'none', width: '100%'}} value={cardData?.year} className={'bg-[#f4f4f5]'} placeholder={'26'}
                                       valueIsNumericString
                                       format="##"/>
                    </div>
                </section>
                <section>
                    <div className={`bg-[#f4f4f5] rounded-xl px-4 py-2 w-auto ${errors.cvv ? 'rounded-xl border border-red-400 shadow-sm shadow-red-400' : ''}`}>
                        <h1 className={'text-xs text-gray-600'}>CVV</h1>
                        <PatternFormat
                           onValueChange={(values) => {
                               setCvv(values.value)
                           }}
                           style={{outline: 'none', width: '100%'}}
                           value={cardData.cvv}
                           placeholder={'123'}
                           className={'bg-[#f4f4f5]'}
                           valueIsNumericString
                           format="###"
                        />
                    </div>
                </section>
            </div>
            <Switch
                isSelected={cardData?.saveCard} onValueChange={setSaveCard}
                classNames={{
                    base: cn(
                        "inline-flex flex-row-reverse bg-content1 hover:bg-content2 items-center py-4 px-2 min-w-[100%]",
                        "justify-between cursor-pointer rounded-lg border-2 border-transparent",
                        // "data-[selected=true]:border-primary",
                    ),
                    wrapper: "p-0 h-4 overflow-visible",
                    thumb: cn("w-6 h-6 border-2 shadow-lg",
                        "group-data-[hover=true]:border-primary",
                        //selected
                        "group-data-[selected=true]:ml-6",
                        // pressed
                        "group-data-[pressed=true]:w-7",
                        "group-data-[selected]:group-data-[pressed]:ml-4",
                    ),
                }}
                className={'w-full'}
            >
                <div className="flex flex-col gap-1">
                    <p className="text-medium">Save card for further billing</p>
                    <p className="text-tiny text-default-400">
                        Enable to save your card details for faster checkouts.
                    </p>
                </div>
            </Switch>
        </form>
    )
}

export default CardEntry;
