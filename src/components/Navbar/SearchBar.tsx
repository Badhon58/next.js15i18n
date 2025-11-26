"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchHandler from "../SearchComponent/SearchHandler";
import "./style.css";
import { useTranslation } from "react-i18next";
const SearchBar = ({
  setDropDown,
  inputRef,
  dropDown,
}: {
  setDropDown: any;
  inputRef: any;
  dropDown: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const Pathname = usePathname();
  const { t } = useTranslation();
  const router = useRouter();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      router.replace(`?key=${encodeURIComponent(value)}`);
    } else {
      router.replace(Pathname);
    }
  };
  const handleClick = () => {
    setDropDown(true);
  };

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: any) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setDropDown(false);
        // if (searchTerm.length == 0) {
        // setSearchTerm("");
        // if (Pathname != "/") {
        //   router.replace(Pathname);
        // }
        // }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex" ref={inputRef}>
      <div className="flex w-full ">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full h-full p-2 outline-none  rounded-lg border-2"
            placeholder={mounted ? t("searchtext") : ""}
            value={searchTerm}
            onChange={handleSearch}
            onClick={handleClick}
          />
        </div>
        {dropDown && (
          <div className="searchbar searchbar2 searchbar3 ">
            <SearchHandler setDropDown={setDropDown} setSearchTerm={setSearchTerm} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
