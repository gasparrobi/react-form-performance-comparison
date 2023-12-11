import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import FormFast from "../components/FormFast";

import Form from "../components/Form";
import FormFormik from "../components/FormFormik";

type FormType = "fast" | "react-hook-form" | "formik";

const Comparison: NextPage = () => {
  const [chosenForm, setChosenForm] = useState<FormType>("fast");

  const isFormFast = chosenForm === "fast";
  const isReactHookForm = chosenForm === "react-hook-form";
  const isFormik = chosenForm === "formik";

  return (
    <>
      <Head>
        <title>Comparison</title>
        <meta
          name="description"
          content="Lazy loaded react modal with enter and exit transitions"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center gap-14 bg-white ">
        <div className="flex w-full justify-center bg-slate-800 p-4 text-center">
          <h1 className="max-w-4xl p-8 text-6xl font-black leading-tight text-slate-200">
            {`You don't need a Form Validation library`}
          </h1>
        </div>
        <div className=" mb-20 grid grid-cols-[min-content,1fr]  rounded-lg border-4 border-slate-800">
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-transparent p-8">
            <div
              role="radio"
              aria-checked={isFormFast}
              className="min-w-[200px] cursor-pointer rounded-md border border-indigo-200 p-4 hover:bg-indigo-100 aria-checked:border-indigo-700 aria-checked:bg-indigo-100"
              onClick={() => setChosenForm("fast")}
            >
              form fast
            </div>
            <div
              role="radio"
              aria-checked={isReactHookForm}
              className="min-w-[200px] cursor-pointer rounded-md border border-indigo-200 p-4 hover:bg-indigo-100 aria-checked:border-indigo-700 aria-checked:bg-indigo-100"
              onClick={() => setChosenForm("react-hook-form")}
            >
              <h3>react-hook-form</h3>
            </div>
            <div
              role="radio"
              aria-checked={isFormik}
              className="min-w-[200px] cursor-pointer rounded-md border border-indigo-200 p-4 hover:bg-indigo-100 aria-checked:border-indigo-700 aria-checked:bg-indigo-100"
              onClick={() => setChosenForm("formik")}
            >
              <h3>Formik</h3>
            </div>
          </div>
          <div className="flex h-full items-center bg-slate-800 p-8">
            {isFormFast && <FormFast />}
            {isReactHookForm && <Form />}
            {isFormik && <FormFormik />}
          </div>
        </div>
      </main>
    </>
  );
};

export default Comparison;
