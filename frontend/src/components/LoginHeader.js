import React from "react";
export default function LoginHeader() {
    return (
        <div className="w-100 bg-primary d-flex justify-content-between flex-wrap">
            <div className="pt-1 pb-1 col text-white d-flex justify-content-start align-items-center">
                Лабораторная работа №4 по веб-программированию <br/>
                Вариант 2691
            </div>
            <div className="pt-1 pb-1 col d-flex align-items-center justify-content-end align-content-center text-right text-white col">
                Кораблин Антон <br/>
                P3230
            </div>
        </div>
    );
}