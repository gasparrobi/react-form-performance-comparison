import { type NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import Form from "../components/Form";
import FormFast from "../components/FormFast";
import { useState } from "react";
import { GithubIcon } from "../icons";

const Home: NextPage = () => {
  const [isCheckmarkVisibleOnSuccess, setIsCheckmarkVisibleOnSuccess] =
    useState(true);

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
            defaultChecked
            onChange={onCheckboxChange}
          />
          <label htmlFor="tick" className="font-semibold">
            always validate and show checkmark on success
          </label>
        </div>
        <div className="container grid grid-cols-1 place-items-center gap-12 px-4 py-16 sm:grid-cols-2 ">
          <div className="flex flex-col items-center gap-4">
            <Form
              key={isCheckmarkVisibleOnSuccess ? "form1" : "form2"}
              isCheckmarkVisibleOnSuccess={isCheckmarkVisibleOnSuccess}
            />

            <a
              href="https://github.com/gasparrobi/react-form-performance-comparison/blob/main/src/components/Form.tsx"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 hover:underline"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <FormFast
              key={isCheckmarkVisibleOnSuccess ? "formFast1" : "formFast2"}
              isCheckmarkVisibleOnSuccess={isCheckmarkVisibleOnSuccess}
            />

            <a
              href="https://github.com/gasparrobi/react-form-performance-comparison/blob/main/src/components/FormFast.tsx"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 hover:underline"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
