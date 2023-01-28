import { type NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import Form from "../components/Form";
import FormFast from "../components/FormFast";
import { useRef, useState } from "react";

const Home: NextPage = () => {
  const [isCheckmarkVisibleOnSuccess, setIsCheckmarkVisibleOnSuccess] =
    useState(false);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckmarkVisibleOnSuccess(e.target.checked);
  };

  return (
    <>
      <Head>
        <title>Form Validation Performance Comparison</title>
        <meta
          name="description"
          content="Compare react-form-hook vs custom implementation"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white ">
        <div className="mt-10 flex items-center gap-2 p-2 leading-tight sm:mt-4">
          <input
            type="checkbox"
            name="tick"
            id="tick"
            onChange={onCheckboxChange}
          />
          <label htmlFor="tick" className="font-semibold">
            always validate and show checkmark on success
          </label>
        </div>
        <div className="container grid grid-cols-1 place-items-center gap-12 px-4 py-16 sm:grid-cols-2 ">
          <Form
            key={isCheckmarkVisibleOnSuccess ? "form1" : "form2"}
            isCheckmarkVisibleOnSuccess={isCheckmarkVisibleOnSuccess}
          />

          <FormFast
            key={isCheckmarkVisibleOnSuccess ? "formFast1" : "formFast2"}
            isCheckmarkVisibleOnSuccess={isCheckmarkVisibleOnSuccess}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
