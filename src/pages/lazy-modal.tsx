import { type NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GithubIcon } from "../icons";

const RModal = dynamic(() => import("../components/Modal"), {
  ssr: false,
});

const LazyModal: NextPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Head>
        <title>Lazy loaded animated modal</title>
        <meta
          name="description"
          content="Lazy loaded react modal with enter and exit transitions"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-white ">
        <button
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => setIsModalVisible(true)}
        >
          Open Modal
        </button>
        <a
          href="https://github.com/gasparrobi/react-form-performance-comparison/blob/main/src/components/Modal.tsx"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-1 hover:underline"
        >
          <GithubIcon className="h-4 w-4" />
        </a>

        {isModalVisible && (
          <RModal
            title="Hi! I'm lazy loaded!"
            isOpen={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          >
            <div className="flex flex-col gap-2">
              <p>with enter and exit transitions 😎</p>
              <p>and focus restored on close 😎</p>
            </div>
          </RModal>
        )}
      </main>
    </>
  );
};

export default LazyModal;
