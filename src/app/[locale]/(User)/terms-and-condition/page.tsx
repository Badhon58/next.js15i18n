"use client";

import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-[70vh]">
      <div className="flex flex-col pt-4 space-y-4 xl:container xl:mx-auto lg:px-10">
        {/* Title + Intro */}
        <div>
          <p className="text-lg font-semibold ">{t("tac.title")}</p>
          <p className="text-base italic ">{t("tac.lastUpdated")}</p>
          <p>{t("tac.intro")}</p>
        </div>
        <hr />

        {/* Section 1 */}
        <div>
          <p className="text-lg font-semibold ">{t("tac.section1Title")}</p>
          <p>{t("tac.section1Desc")}</p>
        </div>
        <hr />

        {/* Section 2 */}
        <div>
          <p className="text-lg font-semibold ">{t("tac.section2Title")}</p>
          <p>{t("tac.section2Intro")}</p>
          <ul className="ml-6 list-disc list-inside">
            <li className="mt-3">
              <span className="font-semibold">
                {t("tac.telemedicineTitle")}{" "}
              </span>
              {t("tac.telemedicineDesc")}
            </li>
            <li>
              <span className="font-semibold">{t("tac.cashbackTitle")} </span>
              {t("tac.cashbackDesc")}
            </li>
            <li>
              <span className="font-semibold">
                {t("tac.documentationTitle")}{" "}
              </span>
              {t("tac.documentationDesc")}
            </li>
          </ul>
          <p className="mt-2">{t("tac.section2Note")}</p>
        </div>
        <hr />

        {/* Section 3 */}
        <div>
          <p className="text-lg font-semibold ">{t("tac.section3Title")}</p>
          <p>{t("tac.section3Intro")}</p>
          <ul className="ml-6 list-disc list-inside">
            <li>
              <span className="font-semibold">
                {t("tac.responsibility1Title")}{" "}
              </span>
              {t("tac.responsibility1Desc")}
            </li>
            <li>
              <span className="font-semibold">
                {t("tac.responsibility2Title")}{" "}
              </span>
              {t("tac.responsibility2Desc")}
            </li>
            <li>
              <span className="font-semibold">
                {t("tac.responsibility3Title")}{" "}
              </span>
              {t("tac.responsibility3Desc")}
            </li>
          </ul>
          <p className="mt-2">{t("tac.section3Note")}</p>
        </div>
        <hr />

        {/* Section 4 */}
        <div>
          <p className="text-lg font-semibold ">{t("tac.section4Title")}</p>
          <ul className="ml-6 list-disc list-inside">
            <li>
              <span className="font-semibold">{t("tac.payment1Title")} </span>
              {t("tac.payment1Desc")}
            </li>
            <li>
              <span className="font-semibold">{t("tac.payment2Title")} </span>
              {t("tac.payment2Desc")}
            </li>
            <li>
              <span className="font-semibold">{t("tac.payment3Title")} </span>
              {t("tac.payment3Desc")}
            </li>
          </ul>
        </div>
        <hr />

        {/* Section 5 */}
        <div>
          <p className="text-lg font-semibold ">{t("tac.section5Title")}</p>
          <p>{t("tac.section5Intro")}</p>
          <ol className="list-none list-inside ">
            <li>
              <span className="font-semibold">{t("tac.privacy1Title")}</span>{" "}
              {t("tac.privacy1Desc")}
            </li>
            <li>
              <span className="font-semibold">{t("tac.privacy2Title")}</span>
              <ul className="ml-6 list-disc list-inside">
                <li>{t("tac.privacy2a")}</li>
                <li>{t("tac.privacy2b")}</li>
                <li>{t("tac.privacy2c")}</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">{t("tac.privacy3Title")}</span>{" "}
              {t("tac.privacy3Desc")}
            </li>
          </ol>
        </div>
        <hr />

        {/* Section 6 */}
        <div>
          <p className="text-lg font-semibold ">{t("tac.section6Title")}</p>
          <p>{t("tac.section6Intro")}</p>
          <ul className="ml-6 list-disc list-inside">
            <li>{t("tac.section6a")}</li>
            <li>{t("tac.section6b")}</li>
            <li>{t("tac.section6c")}</li>
          </ul>
          <p>{t("tac.section6Note")}</p>
        </div>
        <hr />

        {/* Section 7 */}
        <div>
          <p className="text-lg font-semibold ">{t("tac.section7Title")}</p>
          <p>{t("tac.section7Intro")}</p>
          <ul className="ml-6 list-disc list-inside">
            <li>{t("tac.section7a")}</li>
            <li>{t("tac.section7b")}</li>
            <li>{t("tac.section7c")}</li>
          </ul>
        </div>
        <hr />
        <div>
          <p className="text-lg font-semibold ">{t("tac.section8Title")}</p>
          <p>{t("tac.section8a")}</p>
          <p>{t("tac.section8b")}</p>
        </div>
        <hr />

        {/* section 9 */}
        <div>
          <p className="text-lg font-semibold">{t("tac.section9Title")}</p>
          {/* <p>{t("tac.section10Intro")}</p> */}
          <ul className="mt-2 ml-6 list-disc list-inside">
            <li>{t("tac.section9a")} </li>
            <li>{t("tac.section9b")} </li>
            <li>{t("tac.section9c")} </li>
            <li>{t("tac.section9d")} </li>
          </ul>
        </div>

        {/* Section 10 */}
        <div>
          <p className="text-lg font-semibold ">{t("tac.section10Title")}</p>
          <p>{t("tac.section10Desc")}</p>
        </div>
        <hr />

        {/* Section 11 */}
        <div>
          <p className="text-lg font-semibold">{t("tac.section11Title")}</p>
          <p>{t("tac.section11Intro")}</p>
          <ul className="mt-2 ml-6 list-disc list-inside">
            <li>
              <span className="font-semibold">
                {t("tac.contactEmailTitle")}{" "}
              </span>
              info@theclinicall.com
            </li>
            <li>
              <span className="font-semibold">
                {t("tac.contactHotlineTitle")}{" "}
              </span>
              {t("phone")}
            </li>
          </ul>
        </div>
        <hr />

        {/* Closing */}
        <p className="font-semibold">{t("tac.closing")}</p>
      </div>
    </section>
  );
};

export default Page;
